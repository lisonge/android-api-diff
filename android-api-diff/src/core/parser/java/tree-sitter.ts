import { Parser, Language, type Node } from 'web-tree-sitter';
import type {
  ApiFile,
  ClassMemberParam,
  Nullability,
} from '../../model/types.ts';
import {
  createApiFile,
  createImportResolver,
  useStructEditor,
} from '../model-builder.ts';

export interface JavaParserAssets {
  runtime: string;
  language?: string | URL;
}

let initialization: Promise<Parser> | undefined;
export const initializeJavaParser = (
  assets?: JavaParserAssets,
): Promise<Parser> =>
  (initialization ??= (async () => {
    await Parser.init(
      assets ? { locateFile: () => assets.runtime } : undefined,
    );
    const language = await Language.load(
      assets?.language ??
        new URL(
          '../../../generated/tree-sitter-java.wasm',
          import.meta.url,
        ),
    );
    return new Parser().setLanguage(language);
  })().catch((error) => {
    initialization = undefined;
    throw error;
  }));

const annotationTypes = new Set(['annotation', 'marker_annotation']);
const commentTypes = new Set(['line_comment', 'block_comment']);
const primitives = new Set([
  'boolean',
  'byte',
  'char',
  'double',
  'float',
  'int',
  'long',
  'short',
  'void',
]);
const nullable = new Set(['nullable', 'recentlynullable']);
const nonnull = new Set(['nonnull', 'notnull', 'recentlynonnull']);
const declarationTypes = [
  'class_declaration',
  'interface_declaration',
  'enum_declaration',
  'method_declaration',
  'constructor_declaration',
  'field_declaration',
  'constant_declaration',
];
const field = (node: Node, name: string) => node.childForFieldName(name);
const compact = (node: Node): string => {
  if (commentTypes.has(node.type)) return '';
  if (
    !node.childCount ||
    node.type === 'string_literal' ||
    node.type === 'character_literal'
  )
    return node.text;
  return node.children.map(compact).join('');
};
const annotations = (node: Node | null): Node[] =>
  node?.namedChildren.filter((child) => annotationTypes.has(child.type)) ?? [];
const modifiers = (node: Node) =>
  node.namedChildren.find((child) => child.type === 'modifiers') ?? null;
const hasModifier = (node: Node, name: string) =>
  modifiers(node)?.children.some((child) => child.type === name) ?? false;
const annotationName = (node: Node) =>
  field(node, 'name')?.text.split('.').at(-1)?.toLowerCase() ?? '';
const signatureAnnotations = (nodes: Node[]) =>
  nodes
    .filter(
      (node) =>
        nullable.has(annotationName(node)) || nonnull.has(annotationName(node)),
    )
    .map(compact);
const typeAnnotations = (node: Node): Node[] => [
  ...annotations(node),
  ...(node.type === 'array_type'
    ? typeAnnotations(field(node, 'element')!)
    : []),
  ...annotations(field(node, 'dimensions')),
];
const dimensions = (node: Node | null): string =>
  '[]'.repeat(node?.children.filter((child) => child.type === '[').length ?? 0);
const typeInfo = (node: Node, extra: Node[] = [], suffix = '') => {
  const own = typeAnnotations(node);
  let type = compact(node);
  for (const annotation of own) {
    const text = compact(annotation);
    if (type.startsWith(text)) type = type.slice(text.length);
  }
  type += suffix;
  const names = [...extra, ...own].map(annotationName);
  const nullability: Nullability | undefined = names.some((name) =>
    nullable.has(name),
  )
    ? 'nullable'
    : names.some((name) => nonnull.has(name)) || primitives.has(type)
      ? 'non-null'
      : undefined;
  return { type, nullability, annotations: [...extra, ...own] };
};

// Match the existing extractor's declaration context, including local classes.
const declarationContext = (node: Node): Node => {
  let current = node;
  while (
    current.parent &&
    ![
      'program',
      'class_body',
      'interface_body',
      'enum_body_declarations',
      'annotation_type_body',
    ].includes(current.parent.type)
  )
    current = current.parent;
  return current;
};
const isHidden = (node: Node) => {
  let previous = declarationContext(node).previousNamedSibling;
  while (previous && commentTypes.has(previous.type)) {
    if (/(^|[^A-Za-z0-9_$])@hide(?![A-Za-z0-9_$])/.test(previous.text))
      return true;
    previous = previous.previousNamedSibling;
  }
  return false;
};

export const parseJavaFileTreeSitter = async (
  text: string,
): Promise<ApiFile> => {
  const parser = await initializeJavaParser();
  const tree = parser.parse(text);
  if (!tree) throw new Error('Java parser returned no tree');
  try {
    const root = tree.rootNode;
    if (root.hasError) {
      const error = root.descendantsOfType('ERROR')[0] ?? root;
      throw new SyntaxError(
        `Java ${error.startPosition.row + 1}:${error.startPosition.column + 1}: invalid syntax`,
      );
    }
    const packageNode = root.namedChildren.find(
      (node) => node.type === 'package_declaration',
    );
    const packageName =
      packageNode?.namedChildren.find((node) =>
        ['identifier', 'scoped_identifier'].includes(node.type),
      )?.text ?? '';
    const sourceImports = root.namedChildren
      .filter((node) => node.type === 'import_declaration')
      .map((node) => {
        const name = node.namedChildren.find((child) =>
          ['identifier', 'scoped_identifier'].includes(child.type),
        )!;
        return `${node.children.some((child) => child.type === 'static') ? 'static ' : ''}${compact(name)}${node.namedChildren.some((child) => child.type === 'asterisk') ? '.*' : ''}`;
      });
    const resolveImports = createImportResolver(sourceImports);
    const { enterStruct, exitStruct, addMember, structs, clearUseless } =
      useStructEditor();
    const stack: Node[] = [];
    for (const node of root.descendantsOfType(declarationTypes)) {
      while (stack.length && node.startIndex >= stack.at(-1)!.endIndex) {
        stack.pop();
        exitStruct();
      }
      // Unsupported and anonymous type bodies must not leak into a named owner.
      let parent = node.parent;
      let excluded = false;
      while (parent) {
        if (
          [
            'object_creation_expression',
            'enum_constant',
            'annotation_type_declaration',
            'record_declaration',
          ].includes(parent.type)
        ) {
          excluded = true;
          break;
        }
        parent = parent.parent;
      }
      if (excluded) continue;
      const context = declarationContext(node);
      if (
        node.type === 'class_declaration' ||
        node.type === 'interface_declaration' ||
        node.type === 'enum_declaration'
      ) {
        const name = field(node, 'name')!;
        enterStruct(
          name.text,
          name.startPosition.row + 1,
          node.type === 'interface_declaration' ? 'interface' : 'class',
          node.type === 'class_declaration' && hasModifier(context, 'abstract'),
          isHidden(node),
        );
        stack.push(node);
        continue;
      }
      if (!stack.length) continue;
      const extra = [...annotations(modifiers(context)), ...annotations(node)];
      if (
        node.type === 'field_declaration' ||
        node.type === 'constant_declaration'
      ) {
        // Annotation elements are not exposed by the existing ApiFile model.
        if (node.parent?.type === 'annotation_type_body') continue;
        const declarations = node.childrenForFieldName('declarator');
        const isConstant = node.type === 'constant_declaration';
        for (const declarator of declarations) {
          const info = typeInfo(
            field(node, 'type')!,
            [...extra, ...annotations(field(declarator, 'dimensions'))],
            dimensions(field(declarator, 'dimensions')),
          );
          const name = field(declarator, 'name')!;
          const base = {
            name: name.text,
            loc: name.startPosition.row + 1,
            type: info.type,
            imports: resolveImports([
              info.type,
              ...signatureAnnotations(info.annotations),
            ]),
            ...(info.nullability ? { fieldNullability: info.nullability } : {}),
          };
          if (isConstant)
            addMember({
              ...base,
              kind: 'constant',
              initializer: field(declarator, 'value')!.text,
            });
          else
            addMember({
              ...base,
              kind: 'field',
              ...(hasModifier(context, 'static') ? { isStatic: true } : {}),
            });
        }
        continue;
      }
      const constructor = node.type === 'constructor_declaration';
      const id = field(node, 'name')!;
      const info = constructor
        ? undefined
        : typeInfo(
            field(node, 'type')!,
            [...extra, ...annotations(field(node, 'dimensions'))],
            dimensions(field(node, 'dimensions')),
          );
      const imports = new Set(
        resolveImports(
          info ? [info.type, ...signatureAnnotations(info.annotations)] : [],
        ),
      );
      const parameters: ClassMemberParam[] = (
        field(node, 'parameters')?.namedChildren ?? []
      )
        .filter((param) =>
          ['formal_parameter', 'spread_parameter'].includes(param.type),
        )
        .map((param) => {
          const typeNode =
            field(param, 'type') ??
            param.namedChildren.find(
              (child) =>
                ![
                  'modifiers',
                  'variable_declarator',
                  'this',
                  'identifier',
                ].includes(child.type) && !annotationTypes.has(child.type),
            )!;
          const paramInfo = typeInfo(
            typeNode,
            [
              ...annotations(modifiers(param)),
              ...annotations(param),
              ...annotations(field(param, 'dimensions')),
            ],
            dimensions(field(param, 'dimensions')) +
              (param.type === 'spread_parameter' ? '[]' : ''),
          );
          resolveImports([
            paramInfo.type,
            ...signatureAnnotations(paramInfo.annotations),
          ]).forEach((index) => imports.add(index));
          const name =
            field(param, 'name') ??
            (param.type === 'spread_parameter'
              ? field(
                  param.namedChildren.find(
                    (child) => child.type === 'variable_declarator',
                  )!,
                  'name',
                )
              : null);
          return {
            ...(param.type !== 'receiver_parameter' && name
              ? { name: name.text }
              : {}),
            type: paramInfo.type,
            ...(paramInfo.nullability
              ? { nullability: paramInfo.nullability }
              : {}),
          };
        });
      const returnType = info?.type ?? id.text;
      const base = {
        name: id.text,
        type: `(${parameters.map((param) => param.type).join(', ')}) -> ${returnType}`,
        loc: id.startPosition.row + 1,
        imports: [...imports].sort((a, b) => a - b),
        parameters,
        parameterCount: parameters.length,
      };
      if (constructor) addMember({ ...base, kind: 'constructor' });
      else
        addMember({
          ...base,
          kind: 'method',
          returnType,
          ...(info!.nullability
            ? { returnNullability: info!.nullability }
            : {}),
          ...(node.parent?.type !== 'interface_body' &&
          hasModifier(context, 'abstract')
            ? { isAbstract: true }
            : {}),
        });
    }
    clearUseless();
    return createApiFile(packageName, sourceImports, structs);
  } finally {
    tree.delete();
  }
};
