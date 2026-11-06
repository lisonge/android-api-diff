import {
  parseAidl,
  type Annotation,
  type Declaration,
  type TypeReference,
  sourceText,
  type Expression,
} from 'aidl-parser';
import type { ApiFile } from '../../model/types.ts';
import {
  createApiFile,
  createImportResolver,
  useStructEditor,
} from '../model-builder.ts';

const nullable = (annotations: Annotation[]) =>
  annotations.some(
    (a) => a.name.split('.').at(-1)?.toLowerCase() === 'nullable',
  );
const typeName = (type: TypeReference): string =>
  type.name +
  (type.arguments.length ? `<${type.arguments.map(typeName).join(',')}>` : '') +
  '[]'.repeat(
    type.array?.kind === 'fixed'
      ? type.array.dimensions.length
      : type.array
        ? 1
        : 0,
  );

// Keep the expression's original spelling; replace only numeric literal nodes.
function javaInitializer(source: string, expression: Expression): string {
  const edits: { start: number; end: number; text: string }[] = [];
  const visit = (node: Expression): void => {
    switch (node.kind) {
      case 'literal':
        if (/^(?:0[xX][\da-fA-F_]+|[\d_]+)u8$/.test(node.token)) {
          const value = BigInt(node.token.slice(0, -2).replaceAll('_', ''));
          edits.push({
            start: node.range.start.offset,
            end: node.range.end.offset,
            text: '(' + BigInt.asIntN(8, value) + ')',
          });
        }
        break;
      case 'parenthesized':
        visit(node.expression);
        break;
      case 'unary':
        visit(node.operand);
        break;
      case 'binary':
        visit(node.left);
        visit(node.right);
        break;
      case 'array':
        node.elements.forEach(visit);
        break;
      case 'reference':
        break;
    }
  };
  visit(expression);
  const base = expression.range.start.offset;
  let result = sourceText(source, expression);
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    result =
      result.slice(0, edit.start - base) +
      edit.text +
      result.slice(edit.end - base);
  }
  return result;
}

export const parseAIDLFile = (text: string): ApiFile => {
  const result = parseAidl(text);
  const error = result.diagnostics.find((d) => d.severity === 'error');
  if (error || !result.document) {
    const location = error?.range?.start;
    throw new SyntaxError(
      `AIDL ${location?.line ?? 1}:${location?.column ?? 1}: ${error?.message ?? 'No document returned'}`,
    );
  }
  const document = result.document;
  const importNames = document.imports.map((node) => node.name);
  const resolveImports = createImportResolver(importNames);
  const editor = useStructEditor();
  const annotations = (type: TypeReference, extra: Annotation[] = []) => [
    ...extra,
    ...type.annotations,
  ];
  const imports = (type: TypeReference, extra: Annotation[] = []) =>
    resolveImports([
      typeName(type),
      ...annotations(type, extra)
        .filter((a) => nullable([a]))
        .map((a) => a.name),
    ]);
  const visit = (declaration: Declaration) => {
    editor.enterStruct(
      declaration.name.split('.').at(-1)!,
      declaration.nameRange.start.line,
      declaration.kind === 'interface' || declaration.kind === 'enum'
        ? 'interface'
        : 'class',
      false,
      true,
    );
    if (declaration.kind === 'enum') {
      const backing = declaration.annotations.find((a) => a.name === 'Backing')
        ?.parameters.type;
      let backingValue = backing;
      while (backingValue?.kind === 'parenthesized')
        backingValue = backingValue.expression;
      const type =
        backingValue?.kind === 'literal'
          ? (JSON.parse(backingValue.token) as string)
          : 'byte';
      let previous: string | undefined;
      for (const member of declaration.enumerators) {
        editor.addMember({
          kind: 'constant',
          name: member.name,
          type,
          loc: member.nameRange.start.line,
          imports: [],
          initializer: member.value
            ? javaInitializer(text, member.value)
            : previous
              ? `${previous} + 1`
              : '0',
        });
        previous = member.name;
      }
    }
    for (const member of declaration.members) {
      if (member.kind === 'method') {
        const parameters = member.parameters.map((p) => ({
          name: p.name,
          type: typeName(p.type),
          ...(nullable(annotations(p.type, p.annotations))
            ? { nullability: 'nullable' as const }
            : {}),
        }));
        const returnType = typeName(member.returnType);
        editor.addMember({
          kind: 'method',
          name: member.name,
          loc: member.nameRange.start.line,
          type: `(${parameters.map((p) => p.type).join(', ')}) -> ${returnType}`,
          returnType,
          ...(nullable(annotations(member.returnType, member.annotations))
            ? { returnNullability: 'nullable' as const }
            : {}),
          parameters,
          parameterCount: parameters.length,
          imports: [
            ...new Set([
              ...imports(member.returnType, member.annotations),
              ...member.parameters.flatMap((p) =>
                imports(p.type, p.annotations),
              ),
            ]),
          ].sort((a, b) => a - b),
        });
      } else if (member.kind === 'constant' || member.kind === 'field') {
        editor.addMember({
          kind: member.kind,
          name: member.name,
          type: typeName(member.type),
          loc: member.nameRange.start.line,
          imports:
            member.kind === 'constant'
              ? imports(member.type, member.annotations)
              : resolveImports([typeName(member.type)]),
          ...(nullable(annotations(member.type, member.annotations))
            ? { fieldNullability: 'nullable' as const }
            : {}),
          ...(member.kind === 'constant'
            ? { initializer: javaInitializer(text, member.value) }
            : {}),
        });
      } else visit(member);
    }
    editor.exitStruct();
  };
  document.declarations.forEach(visit);
  editor.clearUseless();
  return createApiFile(
    document.packageDeclaration?.name ?? '',
    importNames,
    editor.structs,
  );
};
