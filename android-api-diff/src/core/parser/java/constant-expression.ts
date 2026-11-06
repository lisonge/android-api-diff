import type { Node, Parser } from 'web-tree-sitter';
import { initializeJavaParser } from './tree-sitter.ts';

const literals = new Set([
  'true',
  'false',
  'decimal_integer_literal',
  'hex_integer_literal',
  'octal_integer_literal',
  'binary_integer_literal',
  'decimal_floating_point_literal',
  'hex_floating_point_literal',
  'character_literal',
  'string_literal',
]);
const comments = new Set(['line_comment', 'block_comment']);
const unaryOperators = new Set(['+', '-', '~', '!']);
const binaryOperators = new Set([
  '*',
  '/',
  '%',
  '+',
  '-',
  '<<',
  '>>',
  '>>>',
  '<',
  '<=',
  '>',
  '>=',
  '==',
  '!=',
  '&',
  '^',
  '|',
  '&&',
  '||',
]);
const castTypes = new Set([
  'byte',
  'short',
  'char',
  'int',
  'long',
  'float',
  'double',
  'boolean',
  'String',
  'java.lang.String',
]);
const children = (node: Node) =>
  node.namedChildren.filter((child) => !comments.has(child.type));
const supported = (node: Node): boolean => {
  if (literals.has(node.type)) return true;
  if (node.type === 'parenthesized_expression')
    return children(node).length === 1 && supported(children(node)[0]!);
  if (node.type === 'unary_expression')
    return (
      unaryOperators.has(node.childForFieldName('operator')!.text) &&
      supported(node.childForFieldName('operand')!)
    );
  if (node.type === 'binary_expression')
    return (
      binaryOperators.has(node.childForFieldName('operator')!.text) &&
      supported(node.childForFieldName('left')!) &&
      supported(node.childForFieldName('right')!)
    );
  if (node.type === 'ternary_expression')
    return ['condition', 'consequence', 'alternative'].every((name) =>
      supported(node.childForFieldName(name)!),
    );
  if (node.type === 'cast_expression') {
    const types = node.childrenForFieldName('type');
    return (
      types.length === 1 &&
      castTypes.has(
        tokens(types[0]!)
          .map((token) => token[1])
          .join(''),
      ) &&
      supported(node.childForFieldName('value')!)
    );
  }
  return false;
};

// Preserve literal contents and token boundaries. ANTLR tokenizes shifts as
// separate '<'/'>' tokens; retain that equivalence without evaluating values.
const tokens = (node: Node): [string, string][] => {
  if (comments.has(node.type)) return [];
  if (literals.has(node.type)) return [[node.type, node.text]];
  if (['<<', '>>', '>>>'].includes(node.type))
    return [...node.text].map((text) => [text, text]);
  if (!node.childCount) return [[node.type, node.text]];
  return node.children.flatMap(tokens);
};

// The previous grammar accepts trivia between the individual shift tokens.
// Use CST terminals to join only those operators, never text inside literals.
const joinShiftTokens = (root: Node, source: string): string => {
  const operators: Node[] = [];
  const visit = (node: Node) => {
    if (comments.has(node.type) || literals.has(node.type)) return;
    if (!node.childCount && /^(?:<{1,2}|>{1,3})$/.test(node.text))
      operators.push(node);
    else for (const child of node.children) visit(child);
  };
  visit(root);
  for (let index = operators.length - 1; index > 0; index--) {
    const previous = operators[index - 1]!,
      current = operators[index]!;
    const gap = source.slice(previous.endIndex, current.startIndex);
    if (
      previous.text[0] === current.text[0] &&
      gap &&
      /^(?:\s|\/\*[\s\S]*?\*\/|\/\/[^\r\n]*(?:\r?\n|$))*$/.test(gap)
    ) {
      source =
        source.slice(0, previous.endIndex) + source.slice(current.startIndex);
    }
  }
  return source;
};

const keyWithParser = (parser: Parser, source: string): string | undefined => {
  const prefix = 'class __Constant { Object __value = ';
  let wrapped = `${prefix}${source}\n; }`;
  let tree = parser.parse(wrapped);
  if (!tree) throw new Error('Java parser returned no tree');
  try {
    const normalized = joinShiftTokens(tree.rootNode, wrapped);
    if (normalized !== wrapped) {
      tree.delete();
      wrapped = normalized;
      tree = parser.parse(wrapped);
      if (!tree) throw new Error('Java parser returned no tree');
    }
    if (tree.rootNode.hasError) return undefined;
    const declarations = children(tree.rootNode);
    if (
      declarations.length !== 1 ||
      declarations[0]!.type !== 'class_declaration'
    )
      return undefined;
    const body = declarations[0]!.childForFieldName('body')!;
    const fields = children(body);
    if (fields.length !== 1 || fields[0]!.type !== 'field_declaration')
      return undefined;
    if (fields[0]!.lastChild?.startIndex !== wrapped.length - 3)
      return undefined;
    const variables = fields[0]!.childrenForFieldName('declarator');
    if (variables.length !== 1) return undefined;
    const expression = variables[0]!.childForFieldName('value');
    if (
      !expression ||
      expression.startIndex < prefix.length ||
      expression.endIndex > prefix.length + source.length ||
      !supported(expression)
    )
      return undefined;
    return JSON.stringify(tokens(expression));
  } finally {
    tree?.delete();
  }
};

export const getJavaConstantExpressionKeys = async (
  sources: string[],
): Promise<(string | undefined)[]> => {
  if (!sources.length) return [];
  const parser = await initializeJavaParser();
  return sources.map((source) => keyWithParser(parser, source));
};

export const getJavaConstantExpressionKey = async (
  source: string,
): Promise<string | undefined> =>
  (await getJavaConstantExpressionKeys([source]))[0];
