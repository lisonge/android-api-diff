grammar AIDL;

/*
 * Parser Rules
 */

compilationUnit:
	packageDeclaration? importDeclaration* typeDeclaration+ EOF;

packageDeclaration: 'package' qualifiedName ';';

importDeclaration: 'import' qualifiedName ';';

typeDeclaration:
	interfaceDeclaration
	| parcelableDeclaration
	| enumDeclaration
	| constDeclaration;

interfaceDeclaration:
	attributes? (oneway = 'oneway')? 'interface' name = IDENTIFIER (
		'extends' extendedInterfaces = typeList
	)? '{' interfaceBody '}';

interfaceBody: (
		constantDeclaration
		| methodDeclaration
		| nestedTypeDeclaration
	)*;

nestedTypeDeclaration:
	parcelableDeclaration
	| enumDeclaration
	| constDeclaration;

parcelableDeclaration:
	attributes? 'parcelable' name = qualifiedName (
		parcelableBody
		| (
			languageHeaders? (
				'extends' superType = qualifiedName
			)? ';'
		)
	);

parcelableBody:
	'{' (fieldDeclaration | nestedTypeDeclaration)* '}';

languageHeaders: languageHeader+;

languageHeader:
	headerType = (
		'cpp_header'
		| 'java_header'
		| 'ndk_header'
		| 'rust_header'
	) headerValue = STRING_LITERAL;

fieldDeclaration: attributes? type variableDeclarators ';';

variableDeclarators:
	variableDeclarator (',' variableDeclarator)*;

variableDeclarator: name = IDENTIFIER ( '=' expression)?;

enumDeclaration:
	attributes? 'enum' name = IDENTIFIER '{' enumConstant (
		',' enumConstant
	)* ','? '}' ';'?;

enumConstant: IDENTIFIER ( '=' expression)?;

constDeclaration:
	attributes? 'const' type name = IDENTIFIER '=' expression ';';

constantDeclaration: constDeclaration;

methodDeclaration:
	attributes? (oneway = 'oneway')? type name = IDENTIFIER '(' parameterList? ')' (
		'throws' exceptionList = typeList
	)? ';';

parameterList: parameter ( ',' parameter)*;

parameter: (direction | annotation)* type variableDeclarator;

direction: 'in' | 'out' | 'inout';

annotation: '@' qualifiedName ( '(' annotationValues ')')?;

annotationValues: annotationValue ( ',' annotationValue)*;

annotationValue: (qualifiedName '=')? (
		expression
		| annotationArray
	);

annotationArray: '{' expression ( ',' expression)* '}';

type:
	primitiveType ('[' ']')*
	| qualifiedName ('[' ']')*
	| genericType ('[' ']')*;

primitiveType:
	'byte'
	| 'short'
	| 'int'
	| 'long'
	| 'char'
	| 'float'
	| 'double'
	| 'boolean'
	| 'String';

genericType:
	qualifiedName '<' typeArgument (',' typeArgument)* '>';

typeArgument: type | '?' (('extends' | 'super') type)?;

typeList: qualifiedName ( ',' qualifiedName)*;

qualifiedName: IDENTIFIER ( '.' IDENTIFIER)*;

expression: logicalOrExpression;

logicalOrExpression:
	logicalAndExpression ('||' logicalAndExpression)*;

logicalAndExpression:
	bitwiseOrExpression ('&&' bitwiseOrExpression)*;

bitwiseOrExpression:
	bitwiseXorExpression ('|' bitwiseXorExpression)*;

bitwiseXorExpression:
	bitwiseAndExpression ('^' bitwiseAndExpression)*;

bitwiseAndExpression:
	equalityExpression ('&' equalityExpression)*;

equalityExpression:
	relationalExpression (('==' | '!=') relationalExpression)*;

relationalExpression:
	shiftExpression (('<' | '>' | '<=' | '>=') shiftExpression)*;

shiftExpression:
	additiveExpression (('<<' | '>>' | '>>>') additiveExpression)*;

additiveExpression:
	multiplicativeExpression (
		('+' | '-') multiplicativeExpression
	)*;

multiplicativeExpression:
	unaryExpression (('*' | '/' | '%') unaryExpression)*;

unaryExpression: ('!' | '~' | '+' | '-') unaryExpression
	| primaryExpression;

primaryExpression: literal | qualifiedName | '(' expression ')';

literal:
	INTEGER_LITERAL
	| FLOATING_POINT_LITERAL
	| FLOAT_SUFFIX_LITERAL
	| CHARACTER_LITERAL
	| STRING_LITERAL
	| BOOLEAN_LITERAL
	| NULL_LITERAL;

attributes: annotation+;

/*
 * Lexer Rules
 */

// Keywords
PACKAGE: 'package';
IMPORT: 'import';
INTERFACE: 'interface';
EXTENDS: 'extends';
PARCELABLE: 'parcelable';
ENUM: 'enum';
ONEWAY: 'oneway';
IN: 'in';
OUT: 'out';
INOUT: 'inout';
THROWS: 'throws';
CONST: 'const';

// Language header keywords
CPP_HEADER: 'cpp_header';
JAVA_HEADER: 'java_header';
NDK_HEADER: 'ndk_header';
RUST_HEADER: 'rust_header';

// Primitive types
BYTE: 'byte';
SHORT: 'short';
INT: 'int';
LONG: 'long';
CHAR: 'char';
FLOAT: 'float';
DOUBLE: 'double';
BOOLEAN: 'boolean';
STRING: 'String';

// Literals
BOOLEAN_LITERAL: 'true' | 'false';
NULL_LITERAL: 'null';

IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]*;

INTEGER_LITERAL: [0-9]+ | '0' [xX] [0-9a-fA-F]+;

FLOATING_POINT_LITERAL:
	[0-9]+ '.' [0-9]* ([eE] [+-]? [0-9]+)?
	| '.' [0-9]+ ([eE] [+-]? [0-9]+)?
	| [0-9]+ [eE] [+-]? [0-9]+;

FLOAT_SUFFIX_LITERAL: (FLOATING_POINT_LITERAL | [0-9]+) [fF];

CHARACTER_LITERAL: '\'' (~['\\\r\n] | EscapeSequence) '\'';

STRING_LITERAL: '"' (~["\\\r\n] | EscapeSequence)* '"';

// 修改注释规则，确保正确跳过
BLOCK_COMMENT: '/*' .*? '*/' -> channel(HIDDEN);

LINE_COMMENT: '//' ~[\r\n]* -> channel(HIDDEN);

DOC_COMMENT: '/**' .*? '*/' -> channel(HIDDEN);

WS: [ \t\r\n\u000C]+ -> channel(HIDDEN);

fragment EscapeSequence:
	'\\' [btnfr"'\\]
	| '\\' ([0-3]? [0-7])? [0-7]
	| '\\' 'u' [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F];

// Operators
BITWISE_OR: '|';
BITWISE_XOR: '^';
BITWISE_AND: '&';
EQUALS: '==';
NOT_EQUALS: '!=';
LESS_EQUAL: '<=';
GREATER_EQUAL: '>=';
LEFT_SHIFT: '<<';
RIGHT_SHIFT: '>>';
UNSIGNED_RIGHT_SHIFT: '>>>';
PLUS: '+';
MINUS: '-';
MULTIPLY: '*';
DIVIDE: '/';
MODULO: '%';
LOGICAL_OR: '||';
LOGICAL_AND: '&&';
LOGICAL_NOT: '!';
BITWISE_NOT: '~';

// 单个字符的运算符放在最后，避免与多字符运算符冲突
LESS: '<';
GREATER: '>';

// Separators
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';
SEMI: ';';
COMMA: ',';
DOT: '.';
AT: '@';
ASSIGN: '=';
COLON: ':';