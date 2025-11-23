// Generated from ./src/grammar/java/JavaParser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
  ATN,
  ATNDeserializer,
  type DecisionState,
  DFA,
  FailedPredicateException,
  NoViableAltException,
  ParserATNSimulator,
  ParserRuleContext,
  PredictionContextCache,
  RecognitionException,
  RuleContext,
  TerminalNode,
  Token,
  type TokenStream,
} from 'antlr4';
import JavaParserListener from './JavaParserListener.js';
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
// type int = number;

import JavaParserBase from './JavaParserBase.js';

export default class JavaParser extends JavaParserBase {
  public static readonly ABSTRACT = 1;
  public static readonly ASSERT = 2;
  public static readonly BOOLEAN = 3;
  public static readonly BREAK = 4;
  public static readonly BYTE = 5;
  public static readonly CASE = 6;
  public static readonly CATCH = 7;
  public static readonly CHAR = 8;
  public static readonly CLASS = 9;
  public static readonly CONST = 10;
  public static readonly CONTINUE = 11;
  public static readonly DEFAULT = 12;
  public static readonly DO = 13;
  public static readonly DOUBLE = 14;
  public static readonly ELSE = 15;
  public static readonly ENUM = 16;
  public static readonly EXPORTS = 17;
  public static readonly EXTENDS = 18;
  public static readonly FINAL = 19;
  public static readonly FINALLY = 20;
  public static readonly FLOAT = 21;
  public static readonly FOR = 22;
  public static readonly GOTO = 23;
  public static readonly IF = 24;
  public static readonly IMPLEMENTS = 25;
  public static readonly IMPORT = 26;
  public static readonly INSTANCEOF = 27;
  public static readonly INT = 28;
  public static readonly INTERFACE = 29;
  public static readonly LONG = 30;
  public static readonly MODULE = 31;
  public static readonly NATIVE = 32;
  public static readonly NEW = 33;
  public static readonly NON_SEALED = 34;
  public static readonly OPEN = 35;
  public static readonly OPENS = 36;
  public static readonly PACKAGE = 37;
  public static readonly PERMITS = 38;
  public static readonly PRIVATE = 39;
  public static readonly PROTECTED = 40;
  public static readonly PROVIDES = 41;
  public static readonly PUBLIC = 42;
  public static readonly RECORD = 43;
  public static readonly REQUIRES = 44;
  public static readonly RETURN = 45;
  public static readonly SEALED = 46;
  public static readonly SHORT = 47;
  public static readonly STATIC = 48;
  public static readonly STRICTFP = 49;
  public static readonly SUPER = 50;
  public static readonly SWITCH = 51;
  public static readonly SYNCHRONIZED = 52;
  public static readonly THIS = 53;
  public static readonly THROW = 54;
  public static readonly THROWS = 55;
  public static readonly TO = 56;
  public static readonly TRANSIENT = 57;
  public static readonly TRANSITIVE = 58;
  public static readonly TRY = 59;
  public static readonly USES = 60;
  public static readonly VAR = 61;
  public static readonly VOID = 62;
  public static readonly VOLATILE = 63;
  public static readonly WHEN = 64;
  public static readonly WHILE = 65;
  public static readonly WITH = 66;
  public static readonly YIELD = 67;
  public static readonly DECIMAL_LITERAL = 68;
  public static readonly HEX_LITERAL = 69;
  public static readonly OCT_LITERAL = 70;
  public static readonly BINARY_LITERAL = 71;
  public static readonly FLOAT_LITERAL = 72;
  public static readonly HEX_FLOAT_LITERAL = 73;
  public static readonly BOOL_LITERAL = 74;
  public static readonly CHAR_LITERAL = 75;
  public static readonly STRING_LITERAL = 76;
  public static readonly TEXT_BLOCK = 77;
  public static readonly NULL_LITERAL = 78;
  public static readonly LPAREN = 79;
  public static readonly RPAREN = 80;
  public static readonly LBRACE = 81;
  public static readonly RBRACE = 82;
  public static readonly LBRACK = 83;
  public static readonly RBRACK = 84;
  public static readonly SEMI = 85;
  public static readonly COMMA = 86;
  public static readonly DOT = 87;
  public static readonly ASSIGN = 88;
  public static readonly GT = 89;
  public static readonly LT = 90;
  public static readonly BANG = 91;
  public static readonly TILDE = 92;
  public static readonly QUESTION = 93;
  public static readonly COLON = 94;
  public static readonly EQUAL = 95;
  public static readonly LE = 96;
  public static readonly GE = 97;
  public static readonly NOTEQUAL = 98;
  public static readonly AND = 99;
  public static readonly OR = 100;
  public static readonly INC = 101;
  public static readonly DEC = 102;
  public static readonly ADD = 103;
  public static readonly SUB = 104;
  public static readonly MUL = 105;
  public static readonly DIV = 106;
  public static readonly BITAND = 107;
  public static readonly BITOR = 108;
  public static readonly CARET = 109;
  public static readonly MOD = 110;
  public static readonly ADD_ASSIGN = 111;
  public static readonly SUB_ASSIGN = 112;
  public static readonly MUL_ASSIGN = 113;
  public static readonly DIV_ASSIGN = 114;
  public static readonly AND_ASSIGN = 115;
  public static readonly OR_ASSIGN = 116;
  public static readonly XOR_ASSIGN = 117;
  public static readonly MOD_ASSIGN = 118;
  public static readonly LSHIFT_ASSIGN = 119;
  public static readonly RSHIFT_ASSIGN = 120;
  public static readonly URSHIFT_ASSIGN = 121;
  public static readonly ARROW = 122;
  public static readonly COLONCOLON = 123;
  public static readonly AT = 124;
  public static readonly ELLIPSIS = 125;
  public static readonly WS = 126;
  public static readonly COMMENT = 127;
  public static readonly LINE_COMMENT = 128;
  public static readonly IDENTIFIER = 129;
  public static override readonly EOF = Token.EOF;
  public static readonly RULE_compilationUnit = 0;
  public static readonly RULE_modularCompulationUnit = 1;
  public static readonly RULE_packageDeclaration = 2;
  public static readonly RULE_importDeclaration = 3;
  public static readonly RULE_typeDeclaration = 4;
  public static readonly RULE_modifier = 5;
  public static readonly RULE_classOrInterfaceModifier = 6;
  public static readonly RULE_variableModifier = 7;
  public static readonly RULE_classDeclaration = 8;
  public static readonly RULE_typeParameters = 9;
  public static readonly RULE_typeParameter = 10;
  public static readonly RULE_typeBound = 11;
  public static readonly RULE_enumDeclaration = 12;
  public static readonly RULE_enumConstants = 13;
  public static readonly RULE_enumConstant = 14;
  public static readonly RULE_enumBodyDeclarations = 15;
  public static readonly RULE_interfaceDeclaration = 16;
  public static readonly RULE_classBody = 17;
  public static readonly RULE_interfaceBody = 18;
  public static readonly RULE_classBodyDeclaration = 19;
  public static readonly RULE_memberDeclaration = 20;
  public static readonly RULE_methodDeclaration = 21;
  public static readonly RULE_methodBody = 22;
  public static readonly RULE_typeTypeOrVoid = 23;
  public static readonly RULE_genericMethodDeclaration = 24;
  public static readonly RULE_genericConstructorDeclaration = 25;
  public static readonly RULE_constructorDeclaration = 26;
  public static readonly RULE_compactConstructorDeclaration = 27;
  public static readonly RULE_fieldDeclaration = 28;
  public static readonly RULE_interfaceBodyDeclaration = 29;
  public static readonly RULE_interfaceMemberDeclaration = 30;
  public static readonly RULE_constDeclaration = 31;
  public static readonly RULE_constantDeclarator = 32;
  public static readonly RULE_interfaceMethodDeclaration = 33;
  public static readonly RULE_interfaceMethodModifier = 34;
  public static readonly RULE_genericInterfaceMethodDeclaration = 35;
  public static readonly RULE_interfaceCommonBodyDeclaration = 36;
  public static readonly RULE_variableDeclarators = 37;
  public static readonly RULE_variableDeclarator = 38;
  public static readonly RULE_variableDeclaratorId = 39;
  public static readonly RULE_variableInitializer = 40;
  public static readonly RULE_arrayInitializer = 41;
  public static readonly RULE_classType = 42;
  public static readonly RULE_packageName = 43;
  public static readonly RULE_typeArgument = 44;
  public static readonly RULE_qualifiedNameList = 45;
  public static readonly RULE_formalParameters = 46;
  public static readonly RULE_receiverParameter = 47;
  public static readonly RULE_formalParameterList = 48;
  public static readonly RULE_formalParameter = 49;
  public static readonly RULE_lambdaLVTIList = 50;
  public static readonly RULE_lambdaLVTIParameter = 51;
  public static readonly RULE_qualifiedName = 52;
  public static readonly RULE_literal = 53;
  public static readonly RULE_integerLiteral = 54;
  public static readonly RULE_floatLiteral = 55;
  public static readonly RULE_altAnnotationQualifiedName = 56;
  public static readonly RULE_annotation = 57;
  public static readonly RULE_annotationFieldValues = 58;
  public static readonly RULE_annotationFieldValue = 59;
  public static readonly RULE_annotationValue = 60;
  public static readonly RULE_elementValue = 61;
  public static readonly RULE_elementValueArrayInitializer = 62;
  public static readonly RULE_annotationTypeDeclaration = 63;
  public static readonly RULE_annotationTypeBody = 64;
  public static readonly RULE_annotationTypeElementDeclaration = 65;
  public static readonly RULE_annotationTypeElementRest = 66;
  public static readonly RULE_annotationMethodOrConstantRest = 67;
  public static readonly RULE_annotationMethodRest = 68;
  public static readonly RULE_annotationConstantRest = 69;
  public static readonly RULE_defaultValue = 70;
  public static readonly RULE_moduleDeclaration = 71;
  public static readonly RULE_moduleDirective = 72;
  public static readonly RULE_requiresModifier = 73;
  public static readonly RULE_recordDeclaration = 74;
  public static readonly RULE_recordHeader = 75;
  public static readonly RULE_recordComponentList = 76;
  public static readonly RULE_recordComponent = 77;
  public static readonly RULE_recordBody = 78;
  public static readonly RULE_block = 79;
  public static readonly RULE_blockStatement = 80;
  public static readonly RULE_localVariableDeclaration = 81;
  public static readonly RULE_identifier = 82;
  public static readonly RULE_typeIdentifier = 83;
  public static readonly RULE_localTypeDeclaration = 84;
  public static readonly RULE_statement = 85;
  public static readonly RULE_catchClause = 86;
  public static readonly RULE_catchType = 87;
  public static readonly RULE_finallyBlock = 88;
  public static readonly RULE_resourceSpecification = 89;
  public static readonly RULE_resources = 90;
  public static readonly RULE_resource = 91;
  public static readonly RULE_switchBlockStatementGroup = 92;
  public static readonly RULE_switchLabel = 93;
  public static readonly RULE_forControl = 94;
  public static readonly RULE_forInit = 95;
  public static readonly RULE_enhancedForControl = 96;
  public static readonly RULE_expressionList = 97;
  public static readonly RULE_methodCall = 98;
  public static readonly RULE_expression = 99;
  public static readonly RULE_pattern = 100;
  public static readonly RULE_componentPatternList = 101;
  public static readonly RULE_componentPattern = 102;
  public static readonly RULE_lambdaExpression = 103;
  public static readonly RULE_lambdaParameters = 104;
  public static readonly RULE_lambdaBody = 105;
  public static readonly RULE_primary = 106;
  public static readonly RULE_switchExpression = 107;
  public static readonly RULE_switchLabeledRule = 108;
  public static readonly RULE_guard = 109;
  public static readonly RULE_casePattern = 110;
  public static readonly RULE_switchRuleOutcome = 111;
  public static readonly RULE_classOrInterfaceType = 112;
  public static readonly RULE_creator = 113;
  public static readonly RULE_createdName = 114;
  public static readonly RULE_innerCreator = 115;
  public static readonly RULE_arrayCreatorRest = 116;
  public static readonly RULE_classCreatorRest = 117;
  public static readonly RULE_explicitGenericInvocation = 118;
  public static readonly RULE_typeArgumentsOrDiamond = 119;
  public static readonly RULE_nonWildcardTypeArgumentsOrDiamond = 120;
  public static readonly RULE_nonWildcardTypeArguments = 121;
  public static readonly RULE_typeList = 122;
  public static readonly RULE_typeType = 123;
  public static readonly RULE_primitiveType = 124;
  public static readonly RULE_typeArguments = 125;
  public static readonly RULE_superSuffix = 126;
  public static readonly RULE_explicitGenericInvocationSuffix = 127;
  public static readonly RULE_arguments = 128;
  public static readonly literalNames: (string | null)[] = [
    null,
    "'abstract'",
    "'assert'",
    "'boolean'",
    "'break'",
    "'byte'",
    "'case'",
    "'catch'",
    "'char'",
    "'class'",
    "'const'",
    "'continue'",
    "'default'",
    "'do'",
    "'double'",
    "'else'",
    "'enum'",
    "'exports'",
    "'extends'",
    "'final'",
    "'finally'",
    "'float'",
    "'for'",
    "'goto'",
    "'if'",
    "'implements'",
    "'import'",
    "'instanceof'",
    "'int'",
    "'interface'",
    "'long'",
    "'module'",
    "'native'",
    "'new'",
    "'non-sealed'",
    "'open'",
    "'opens'",
    "'package'",
    "'permits'",
    "'private'",
    "'protected'",
    "'provides'",
    "'public'",
    "'record'",
    "'requires'",
    "'return'",
    "'sealed'",
    "'short'",
    "'static'",
    "'strictfp'",
    "'super'",
    "'switch'",
    "'synchronized'",
    "'this'",
    "'throw'",
    "'throws'",
    "'to'",
    "'transient'",
    "'transitive'",
    "'try'",
    "'uses'",
    "'var'",
    "'void'",
    "'volatile'",
    "'when'",
    "'while'",
    "'with'",
    "'yield'",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "'null'",
    "'('",
    "')'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "';'",
    "','",
    "'.'",
    "'='",
    "'>'",
    "'<'",
    "'!'",
    "'~'",
    "'?'",
    "':'",
    "'=='",
    "'<='",
    "'>='",
    "'!='",
    "'&&'",
    "'||'",
    "'++'",
    "'--'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'&'",
    "'|'",
    "'^'",
    "'%'",
    "'+='",
    "'-='",
    "'*='",
    "'/='",
    "'&='",
    "'|='",
    "'^='",
    "'%='",
    "'<<='",
    "'>>='",
    "'>>>='",
    "'->'",
    "'::'",
    "'@'",
    "'...'",
  ];
  public static readonly symbolicNames: (string | null)[] = [
    null,
    'ABSTRACT',
    'ASSERT',
    'BOOLEAN',
    'BREAK',
    'BYTE',
    'CASE',
    'CATCH',
    'CHAR',
    'CLASS',
    'CONST',
    'CONTINUE',
    'DEFAULT',
    'DO',
    'DOUBLE',
    'ELSE',
    'ENUM',
    'EXPORTS',
    'EXTENDS',
    'FINAL',
    'FINALLY',
    'FLOAT',
    'FOR',
    'GOTO',
    'IF',
    'IMPLEMENTS',
    'IMPORT',
    'INSTANCEOF',
    'INT',
    'INTERFACE',
    'LONG',
    'MODULE',
    'NATIVE',
    'NEW',
    'NON_SEALED',
    'OPEN',
    'OPENS',
    'PACKAGE',
    'PERMITS',
    'PRIVATE',
    'PROTECTED',
    'PROVIDES',
    'PUBLIC',
    'RECORD',
    'REQUIRES',
    'RETURN',
    'SEALED',
    'SHORT',
    'STATIC',
    'STRICTFP',
    'SUPER',
    'SWITCH',
    'SYNCHRONIZED',
    'THIS',
    'THROW',
    'THROWS',
    'TO',
    'TRANSIENT',
    'TRANSITIVE',
    'TRY',
    'USES',
    'VAR',
    'VOID',
    'VOLATILE',
    'WHEN',
    'WHILE',
    'WITH',
    'YIELD',
    'DECIMAL_LITERAL',
    'HEX_LITERAL',
    'OCT_LITERAL',
    'BINARY_LITERAL',
    'FLOAT_LITERAL',
    'HEX_FLOAT_LITERAL',
    'BOOL_LITERAL',
    'CHAR_LITERAL',
    'STRING_LITERAL',
    'TEXT_BLOCK',
    'NULL_LITERAL',
    'LPAREN',
    'RPAREN',
    'LBRACE',
    'RBRACE',
    'LBRACK',
    'RBRACK',
    'SEMI',
    'COMMA',
    'DOT',
    'ASSIGN',
    'GT',
    'LT',
    'BANG',
    'TILDE',
    'QUESTION',
    'COLON',
    'EQUAL',
    'LE',
    'GE',
    'NOTEQUAL',
    'AND',
    'OR',
    'INC',
    'DEC',
    'ADD',
    'SUB',
    'MUL',
    'DIV',
    'BITAND',
    'BITOR',
    'CARET',
    'MOD',
    'ADD_ASSIGN',
    'SUB_ASSIGN',
    'MUL_ASSIGN',
    'DIV_ASSIGN',
    'AND_ASSIGN',
    'OR_ASSIGN',
    'XOR_ASSIGN',
    'MOD_ASSIGN',
    'LSHIFT_ASSIGN',
    'RSHIFT_ASSIGN',
    'URSHIFT_ASSIGN',
    'ARROW',
    'COLONCOLON',
    'AT',
    'ELLIPSIS',
    'WS',
    'COMMENT',
    'LINE_COMMENT',
    'IDENTIFIER',
  ];
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'compilationUnit',
    'modularCompulationUnit',
    'packageDeclaration',
    'importDeclaration',
    'typeDeclaration',
    'modifier',
    'classOrInterfaceModifier',
    'variableModifier',
    'classDeclaration',
    'typeParameters',
    'typeParameter',
    'typeBound',
    'enumDeclaration',
    'enumConstants',
    'enumConstant',
    'enumBodyDeclarations',
    'interfaceDeclaration',
    'classBody',
    'interfaceBody',
    'classBodyDeclaration',
    'memberDeclaration',
    'methodDeclaration',
    'methodBody',
    'typeTypeOrVoid',
    'genericMethodDeclaration',
    'genericConstructorDeclaration',
    'constructorDeclaration',
    'compactConstructorDeclaration',
    'fieldDeclaration',
    'interfaceBodyDeclaration',
    'interfaceMemberDeclaration',
    'constDeclaration',
    'constantDeclarator',
    'interfaceMethodDeclaration',
    'interfaceMethodModifier',
    'genericInterfaceMethodDeclaration',
    'interfaceCommonBodyDeclaration',
    'variableDeclarators',
    'variableDeclarator',
    'variableDeclaratorId',
    'variableInitializer',
    'arrayInitializer',
    'classType',
    'packageName',
    'typeArgument',
    'qualifiedNameList',
    'formalParameters',
    'receiverParameter',
    'formalParameterList',
    'formalParameter',
    'lambdaLVTIList',
    'lambdaLVTIParameter',
    'qualifiedName',
    'literal',
    'integerLiteral',
    'floatLiteral',
    'altAnnotationQualifiedName',
    'annotation',
    'annotationFieldValues',
    'annotationFieldValue',
    'annotationValue',
    'elementValue',
    'elementValueArrayInitializer',
    'annotationTypeDeclaration',
    'annotationTypeBody',
    'annotationTypeElementDeclaration',
    'annotationTypeElementRest',
    'annotationMethodOrConstantRest',
    'annotationMethodRest',
    'annotationConstantRest',
    'defaultValue',
    'moduleDeclaration',
    'moduleDirective',
    'requiresModifier',
    'recordDeclaration',
    'recordHeader',
    'recordComponentList',
    'recordComponent',
    'recordBody',
    'block',
    'blockStatement',
    'localVariableDeclaration',
    'identifier',
    'typeIdentifier',
    'localTypeDeclaration',
    'statement',
    'catchClause',
    'catchType',
    'finallyBlock',
    'resourceSpecification',
    'resources',
    'resource',
    'switchBlockStatementGroup',
    'switchLabel',
    'forControl',
    'forInit',
    'enhancedForControl',
    'expressionList',
    'methodCall',
    'expression',
    'pattern',
    'componentPatternList',
    'componentPattern',
    'lambdaExpression',
    'lambdaParameters',
    'lambdaBody',
    'primary',
    'switchExpression',
    'switchLabeledRule',
    'guard',
    'casePattern',
    'switchRuleOutcome',
    'classOrInterfaceType',
    'creator',
    'createdName',
    'innerCreator',
    'arrayCreatorRest',
    'classCreatorRest',
    'explicitGenericInvocation',
    'typeArgumentsOrDiamond',
    'nonWildcardTypeArgumentsOrDiamond',
    'nonWildcardTypeArguments',
    'typeList',
    'typeType',
    'primitiveType',
    'typeArguments',
    'superSuffix',
    'explicitGenericInvocationSuffix',
    'arguments',
  ];
  public get grammarFileName(): string {
    return 'JavaParser.g4';
  }
  public get literalNames(): (string | null)[] {
    return JavaParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return JavaParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return JavaParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return JavaParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(
      this,
      JavaParser._ATN,
      JavaParser.DecisionsToDFA,
      new PredictionContextCache(),
    );
  }
  // @RuleVersion(0)
  public compilationUnit(): CompilationUnitContext {
    let localctx: CompilationUnitContext = new CompilationUnitContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 0, JavaParser.RULE_compilationUnit);
    let _la: number;
    try {
      let _alt: number;
      this.state = 279;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 5, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 259;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 0, this._ctx)) {
              case 1:
                {
                  this.state = 258;
                  this.packageDeclaration();
                }
                break;
            }
            this.state = 265;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  this.state = 263;
                  this._errHandler.sync(this);
                  switch (this._input.LA(1)) {
                    case 26:
                      {
                        this.state = 261;
                        this.importDeclaration();
                      }
                      break;
                    case 85:
                      {
                        this.state = 262;
                        this.match(JavaParser.SEMI);
                      }
                      break;
                    default:
                      throw new NoViableAltException(this);
                  }
                }
              }
              this.state = 267;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
            }
            this.state = 272;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 537461250) !== 0) ||
              (((_la - 34) & ~0x1f) === 0 &&
                ((1 << (_la - 34)) & 54113) !== 0) ||
              _la === 85 ||
              _la === 124
            ) {
              {
                this.state = 270;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                  case 1:
                  case 9:
                  case 16:
                  case 19:
                  case 29:
                  case 34:
                  case 39:
                  case 40:
                  case 42:
                  case 43:
                  case 46:
                  case 48:
                  case 49:
                  case 124:
                    {
                      this.state = 268;
                      this.typeDeclaration();
                    }
                    break;
                  case 85:
                    {
                      this.state = 269;
                      this.match(JavaParser.SEMI);
                    }
                    break;
                  default:
                    throw new NoViableAltException(this);
                }
              }
              this.state = 274;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 275;
            this.match(JavaParser.EOF);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 276;
            this.modularCompulationUnit();
            this.state = 277;
            this.match(JavaParser.EOF);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public modularCompulationUnit(): ModularCompulationUnitContext {
    let localctx: ModularCompulationUnitContext =
      new ModularCompulationUnitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, JavaParser.RULE_modularCompulationUnit);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 284;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 26) {
          {
            {
              this.state = 281;
              this.importDeclaration();
            }
          }
          this.state = 286;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 287;
        this.moduleDeclaration();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public packageDeclaration(): PackageDeclarationContext {
    let localctx: PackageDeclarationContext = new PackageDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 4, JavaParser.RULE_packageDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 292;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 124) {
          {
            {
              this.state = 289;
              this.annotation();
            }
          }
          this.state = 294;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 295;
        this.match(JavaParser.PACKAGE);
        this.state = 296;
        this.qualifiedName();
        this.state = 297;
        this.match(JavaParser.SEMI);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public importDeclaration(): ImportDeclarationContext {
    let localctx: ImportDeclarationContext = new ImportDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 6, JavaParser.RULE_importDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 299;
        this.match(JavaParser.IMPORT);
        this.state = 301;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 48) {
          {
            this.state = 300;
            this.match(JavaParser.STATIC);
          }
        }

        this.state = 303;
        this.qualifiedName();
        this.state = 306;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 87) {
          {
            this.state = 304;
            this.match(JavaParser.DOT);
            this.state = 305;
            this.match(JavaParser.MUL);
          }
        }

        this.state = 308;
        this.match(JavaParser.SEMI);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeDeclaration(): TypeDeclarationContext {
    let localctx: TypeDeclarationContext = new TypeDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 8, JavaParser.RULE_typeDeclaration);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 313;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 310;
                this.classOrInterfaceModifier();
              }
            }
          }
          this.state = 315;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
        }
        this.state = 321;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 9:
            {
              this.state = 316;
              this.classDeclaration();
            }
            break;
          case 16:
            {
              this.state = 317;
              this.enumDeclaration();
            }
            break;
          case 29:
            {
              this.state = 318;
              this.interfaceDeclaration();
            }
            break;
          case 124:
            {
              this.state = 319;
              this.annotationTypeDeclaration();
            }
            break;
          case 43:
            {
              this.state = 320;
              this.recordDeclaration();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public modifier(): ModifierContext {
    let localctx: ModifierContext = new ModifierContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 10, JavaParser.RULE_modifier);
    try {
      this.state = 328;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 1:
        case 19:
        case 34:
        case 39:
        case 40:
        case 42:
        case 46:
        case 48:
        case 49:
        case 124:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 323;
            this.classOrInterfaceModifier();
          }
          break;
        case 32:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 324;
            this.match(JavaParser.NATIVE);
          }
          break;
        case 52:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 325;
            this.match(JavaParser.SYNCHRONIZED);
          }
          break;
        case 57:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 326;
            this.match(JavaParser.TRANSIENT);
          }
          break;
        case 63:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 327;
            this.match(JavaParser.VOLATILE);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public classOrInterfaceModifier(): ClassOrInterfaceModifierContext {
    let localctx: ClassOrInterfaceModifierContext =
      new ClassOrInterfaceModifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, JavaParser.RULE_classOrInterfaceModifier);
    try {
      this.state = 340;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 124:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 330;
            this.annotation();
          }
          break;
        case 42:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 331;
            this.match(JavaParser.PUBLIC);
          }
          break;
        case 40:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 332;
            this.match(JavaParser.PROTECTED);
          }
          break;
        case 39:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 333;
            this.match(JavaParser.PRIVATE);
          }
          break;
        case 48:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 334;
            this.match(JavaParser.STATIC);
          }
          break;
        case 1:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 335;
            this.match(JavaParser.ABSTRACT);
          }
          break;
        case 19:
          this.enterOuterAlt(localctx, 7);
          {
            this.state = 336;
            this.match(JavaParser.FINAL);
          }
          break;
        case 49:
          this.enterOuterAlt(localctx, 8);
          {
            this.state = 337;
            this.match(JavaParser.STRICTFP);
          }
          break;
        case 46:
          this.enterOuterAlt(localctx, 9);
          {
            this.state = 338;
            this.match(JavaParser.SEALED);
          }
          break;
        case 34:
          this.enterOuterAlt(localctx, 10);
          {
            this.state = 339;
            this.match(JavaParser.NON_SEALED);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public variableModifier(): VariableModifierContext {
    let localctx: VariableModifierContext = new VariableModifierContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 14, JavaParser.RULE_variableModifier);
    try {
      this.state = 344;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 19:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 342;
            this.match(JavaParser.FINAL);
          }
          break;
        case 124:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 343;
            this.annotation();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public classDeclaration(): ClassDeclarationContext {
    let localctx: ClassDeclarationContext = new ClassDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 16, JavaParser.RULE_classDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 346;
        this.match(JavaParser.CLASS);
        this.state = 347;
        this.identifier();
        this.state = 349;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 90) {
          {
            this.state = 348;
            this.typeParameters();
          }
        }

        this.state = 353;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 18) {
          {
            this.state = 351;
            this.match(JavaParser.EXTENDS);
            this.state = 352;
            this.typeType();
          }
        }

        this.state = 357;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 25) {
          {
            this.state = 355;
            this.match(JavaParser.IMPLEMENTS);
            this.state = 356;
            this.typeList();
          }
        }

        this.state = 361;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 38) {
          {
            this.state = 359;
            this.match(JavaParser.PERMITS);
            this.state = 360;
            this.typeList();
          }
        }

        this.state = 363;
        this.classBody();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeParameters(): TypeParametersContext {
    let localctx: TypeParametersContext = new TypeParametersContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 18, JavaParser.RULE_typeParameters);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 365;
        this.match(JavaParser.LT);
        this.state = 366;
        this.typeParameter();
        this.state = 371;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 367;
              this.match(JavaParser.COMMA);
              this.state = 368;
              this.typeParameter();
            }
          }
          this.state = 373;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 374;
        this.match(JavaParser.GT);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeParameter(): TypeParameterContext {
    let localctx: TypeParameterContext = new TypeParameterContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 20, JavaParser.RULE_typeParameter);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 379;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 124) {
          {
            {
              this.state = 376;
              this.annotation();
            }
          }
          this.state = 381;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 382;
        this.identifier();
        this.state = 391;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 18) {
          {
            this.state = 383;
            this.match(JavaParser.EXTENDS);
            this.state = 387;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 384;
                    this.annotation();
                  }
                }
              }
              this.state = 389;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
            }
            this.state = 390;
            this.typeBound();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeBound(): TypeBoundContext {
    let localctx: TypeBoundContext = new TypeBoundContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 22, JavaParser.RULE_typeBound);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 393;
        this.typeType();
        this.state = 398;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 107) {
          {
            {
              this.state = 394;
              this.match(JavaParser.BITAND);
              this.state = 395;
              this.typeType();
            }
          }
          this.state = 400;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public enumDeclaration(): EnumDeclarationContext {
    let localctx: EnumDeclarationContext = new EnumDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 24, JavaParser.RULE_enumDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 401;
        this.match(JavaParser.ENUM);
        this.state = 402;
        this.identifier();
        this.state = 405;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 25) {
          {
            this.state = 403;
            this.match(JavaParser.IMPLEMENTS);
            this.state = 404;
            this.typeList();
          }
        }

        this.state = 407;
        this.match(JavaParser.LBRACE);
        this.state = 409;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 17) & ~0x1f) === 0 &&
            ((1 << (_la - 17)) & 757874689) !== 0) ||
          (((_la - 56) & ~0x1f) === 0 && ((1 << (_la - 56)) & 3381) !== 0) ||
          _la === 124 ||
          _la === 129
        ) {
          {
            this.state = 408;
            this.enumConstants();
          }
        }

        this.state = 412;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 86) {
          {
            this.state = 411;
            this.match(JavaParser.COMMA);
          }
        }

        this.state = 415;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 85) {
          {
            this.state = 414;
            this.enumBodyDeclarations();
          }
        }

        this.state = 417;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public enumConstants(): EnumConstantsContext {
    let localctx: EnumConstantsContext = new EnumConstantsContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 26, JavaParser.RULE_enumConstants);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 419;
        this.enumConstant();
        this.state = 424;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 420;
                this.match(JavaParser.COMMA);
                this.state = 421;
                this.enumConstant();
              }
            }
          }
          this.state = 426;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public enumConstant(): EnumConstantContext {
    let localctx: EnumConstantContext = new EnumConstantContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 28, JavaParser.RULE_enumConstant);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 430;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 124) {
          {
            {
              this.state = 427;
              this.annotation();
            }
          }
          this.state = 432;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 433;
        this.identifier();
        this.state = 435;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 79) {
          {
            this.state = 434;
            this.arguments();
          }
        }

        this.state = 438;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 81) {
          {
            this.state = 437;
            this.classBody();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public enumBodyDeclarations(): EnumBodyDeclarationsContext {
    let localctx: EnumBodyDeclarationsContext = new EnumBodyDeclarationsContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 30, JavaParser.RULE_enumBodyDeclarations);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 440;
        this.match(JavaParser.SEMI);
        this.state = 444;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 4029367082) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) & 4145274845) !== 0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) & 69337101) !== 0) ||
          _la === 124 ||
          _la === 129
        ) {
          {
            {
              this.state = 441;
              this.classBodyDeclaration();
            }
          }
          this.state = 446;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public interfaceDeclaration(): InterfaceDeclarationContext {
    let localctx: InterfaceDeclarationContext = new InterfaceDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 32, JavaParser.RULE_interfaceDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 447;
        this.match(JavaParser.INTERFACE);
        this.state = 448;
        this.identifier();
        this.state = 450;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 90) {
          {
            this.state = 449;
            this.typeParameters();
          }
        }

        this.state = 454;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 18) {
          {
            this.state = 452;
            this.match(JavaParser.EXTENDS);
            this.state = 453;
            this.typeList();
          }
        }

        this.state = 458;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 38) {
          {
            this.state = 456;
            this.match(JavaParser.PERMITS);
            this.state = 457;
            this.typeList();
          }
        }

        this.state = 460;
        this.interfaceBody();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public classBody(): ClassBodyContext {
    let localctx: ClassBodyContext = new ClassBodyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 34, JavaParser.RULE_classBody);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 462;
        this.match(JavaParser.LBRACE);
        this.state = 466;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 4029367082) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) & 4145274845) !== 0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) & 69337101) !== 0) ||
          _la === 124 ||
          _la === 129
        ) {
          {
            {
              this.state = 463;
              this.classBodyDeclaration();
            }
          }
          this.state = 468;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 469;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public interfaceBody(): InterfaceBodyContext {
    let localctx: InterfaceBodyContext = new InterfaceBodyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 36, JavaParser.RULE_interfaceBody);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 471;
        this.match(JavaParser.LBRACE);
        this.state = 475;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 4029371178) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) & 4145274845) !== 0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) & 69206029) !== 0) ||
          _la === 124 ||
          _la === 129
        ) {
          {
            {
              this.state = 472;
              this.interfaceBodyDeclaration();
            }
          }
          this.state = 477;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 478;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public classBodyDeclaration(): ClassBodyDeclarationContext {
    let localctx: ClassBodyDeclarationContext = new ClassBodyDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 38, JavaParser.RULE_classBodyDeclaration);
    let _la: number;
    try {
      let _alt: number;
      this.state = 492;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 40, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 480;
            this.match(JavaParser.SEMI);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 482;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 48) {
              {
                this.state = 481;
                this.match(JavaParser.STATIC);
              }
            }

            this.state = 484;
            this.block();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 488;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 485;
                    this.modifier();
                  }
                }
              }
              this.state = 490;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
            }
            this.state = 491;
            this.memberDeclaration();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public memberDeclaration(): MemberDeclarationContext {
    let localctx: MemberDeclarationContext = new MemberDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 40, JavaParser.RULE_memberDeclaration);
    try {
      this.state = 504;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 41, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 494;
            this.recordDeclaration();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 495;
            this.methodDeclaration();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 496;
            this.genericMethodDeclaration();
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 497;
            this.fieldDeclaration();
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 498;
            this.constructorDeclaration();
          }
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 499;
            this.genericConstructorDeclaration();
          }
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          {
            this.state = 500;
            this.interfaceDeclaration();
          }
          break;
        case 8:
          this.enterOuterAlt(localctx, 8);
          {
            this.state = 501;
            this.annotationTypeDeclaration();
          }
          break;
        case 9:
          this.enterOuterAlt(localctx, 9);
          {
            this.state = 502;
            this.classDeclaration();
          }
          break;
        case 10:
          this.enterOuterAlt(localctx, 10);
          {
            this.state = 503;
            this.enumDeclaration();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public methodDeclaration(): MethodDeclarationContext {
    let localctx: MethodDeclarationContext = new MethodDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 42, JavaParser.RULE_methodDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 506;
        this.typeTypeOrVoid();
        this.state = 507;
        this.identifier();
        this.state = 508;
        this.formalParameters();
        this.state = 513;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 509;
              this.match(JavaParser.LBRACK);
              this.state = 510;
              this.match(JavaParser.RBRACK);
            }
          }
          this.state = 515;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 518;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 55) {
          {
            this.state = 516;
            this.match(JavaParser.THROWS);
            this.state = 517;
            this.qualifiedNameList();
          }
        }

        this.state = 520;
        this.methodBody();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public methodBody(): MethodBodyContext {
    let localctx: MethodBodyContext = new MethodBodyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 44, JavaParser.RULE_methodBody);
    try {
      this.state = 524;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 81:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 522;
            this.block();
          }
          break;
        case 85:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 523;
            this.match(JavaParser.SEMI);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeTypeOrVoid(): TypeTypeOrVoidContext {
    let localctx: TypeTypeOrVoidContext = new TypeTypeOrVoidContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 46, JavaParser.RULE_typeTypeOrVoid);
    try {
      this.state = 528;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 3:
        case 5:
        case 8:
        case 14:
        case 17:
        case 21:
        case 28:
        case 30:
        case 31:
        case 35:
        case 36:
        case 38:
        case 41:
        case 43:
        case 44:
        case 46:
        case 47:
        case 56:
        case 58:
        case 60:
        case 61:
        case 64:
        case 66:
        case 67:
        case 124:
        case 129:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 526;
            this.typeType();
          }
          break;
        case 62:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 527;
            this.match(JavaParser.VOID);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public genericMethodDeclaration(): GenericMethodDeclarationContext {
    let localctx: GenericMethodDeclarationContext =
      new GenericMethodDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, JavaParser.RULE_genericMethodDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 530;
        this.typeParameters();
        this.state = 531;
        this.methodDeclaration();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public genericConstructorDeclaration(): GenericConstructorDeclarationContext {
    let localctx: GenericConstructorDeclarationContext =
      new GenericConstructorDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, JavaParser.RULE_genericConstructorDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 533;
        this.typeParameters();
        this.state = 534;
        this.constructorDeclaration();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public constructorDeclaration(): ConstructorDeclarationContext {
    let localctx: ConstructorDeclarationContext =
      new ConstructorDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, JavaParser.RULE_constructorDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 536;
        this.identifier();
        this.state = 537;
        this.formalParameters();
        this.state = 540;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 55) {
          {
            this.state = 538;
            this.match(JavaParser.THROWS);
            this.state = 539;
            this.qualifiedNameList();
          }
        }

        this.state = 542;
        localctx._constructorBody = this.block();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public compactConstructorDeclaration(): CompactConstructorDeclarationContext {
    let localctx: CompactConstructorDeclarationContext =
      new CompactConstructorDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, JavaParser.RULE_compactConstructorDeclaration);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 547;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 544;
                this.modifier();
              }
            }
          }
          this.state = 549;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
        }
        this.state = 550;
        this.identifier();
        this.state = 551;
        localctx._constructorBody = this.block();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public fieldDeclaration(): FieldDeclarationContext {
    let localctx: FieldDeclarationContext = new FieldDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 56, JavaParser.RULE_fieldDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 553;
        this.typeType();
        this.state = 554;
        this.variableDeclarators();
        this.state = 555;
        this.match(JavaParser.SEMI);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public interfaceBodyDeclaration(): InterfaceBodyDeclarationContext {
    let localctx: InterfaceBodyDeclarationContext =
      new InterfaceBodyDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, JavaParser.RULE_interfaceBodyDeclaration);
    try {
      let _alt: number;
      this.state = 565;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 1:
        case 3:
        case 5:
        case 8:
        case 9:
        case 12:
        case 14:
        case 16:
        case 17:
        case 19:
        case 21:
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 34:
        case 35:
        case 36:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 46:
        case 47:
        case 48:
        case 49:
        case 52:
        case 56:
        case 57:
        case 58:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 66:
        case 67:
        case 90:
        case 124:
        case 129:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 560;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 557;
                    this.modifier();
                  }
                }
              }
              this.state = 562;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
            }
            this.state = 563;
            this.interfaceMemberDeclaration();
          }
          break;
        case 85:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 564;
            this.match(JavaParser.SEMI);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext {
    let localctx: InterfaceMemberDeclarationContext =
      new InterfaceMemberDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, JavaParser.RULE_interfaceMemberDeclaration);
    try {
      this.state = 575;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 50, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 567;
            this.recordDeclaration();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 568;
            this.constDeclaration();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 569;
            this.interfaceMethodDeclaration();
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 570;
            this.genericInterfaceMethodDeclaration();
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 571;
            this.interfaceDeclaration();
          }
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 572;
            this.annotationTypeDeclaration();
          }
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          {
            this.state = 573;
            this.classDeclaration();
          }
          break;
        case 8:
          this.enterOuterAlt(localctx, 8);
          {
            this.state = 574;
            this.enumDeclaration();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public constDeclaration(): ConstDeclarationContext {
    let localctx: ConstDeclarationContext = new ConstDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 62, JavaParser.RULE_constDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 577;
        this.typeType();
        this.state = 578;
        this.constantDeclarator();
        this.state = 583;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 579;
              this.match(JavaParser.COMMA);
              this.state = 580;
              this.constantDeclarator();
            }
          }
          this.state = 585;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 586;
        this.match(JavaParser.SEMI);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public constantDeclarator(): ConstantDeclaratorContext {
    let localctx: ConstantDeclaratorContext = new ConstantDeclaratorContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 64, JavaParser.RULE_constantDeclarator);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 588;
        this.identifier();
        this.state = 593;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 589;
              this.match(JavaParser.LBRACK);
              this.state = 590;
              this.match(JavaParser.RBRACK);
            }
          }
          this.state = 595;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 596;
        this.match(JavaParser.ASSIGN);
        this.state = 597;
        this.variableInitializer();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext {
    let localctx: InterfaceMethodDeclarationContext =
      new InterfaceMethodDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 66, JavaParser.RULE_interfaceMethodDeclaration);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 602;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 53, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 599;
                this.interfaceMethodModifier();
              }
            }
          }
          this.state = 604;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 53, this._ctx);
        }
        this.state = 605;
        this.interfaceCommonBodyDeclaration();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public interfaceMethodModifier(): InterfaceMethodModifierContext {
    let localctx: InterfaceMethodModifierContext =
      new InterfaceMethodModifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 68, JavaParser.RULE_interfaceMethodModifier);
    try {
      this.state = 613;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 124:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 607;
            this.annotation();
          }
          break;
        case 42:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 608;
            this.match(JavaParser.PUBLIC);
          }
          break;
        case 1:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 609;
            this.match(JavaParser.ABSTRACT);
          }
          break;
        case 12:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 610;
            this.match(JavaParser.DEFAULT);
          }
          break;
        case 48:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 611;
            this.match(JavaParser.STATIC);
          }
          break;
        case 49:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 612;
            this.match(JavaParser.STRICTFP);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public genericInterfaceMethodDeclaration(): GenericInterfaceMethodDeclarationContext {
    let localctx: GenericInterfaceMethodDeclarationContext =
      new GenericInterfaceMethodDeclarationContext(this, this._ctx, this.state);
    this.enterRule(
      localctx,
      70,
      JavaParser.RULE_genericInterfaceMethodDeclaration,
    );
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 618;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          _la === 1 ||
          _la === 12 ||
          (((_la - 42) & ~0x1f) === 0 && ((1 << (_la - 42)) & 193) !== 0) ||
          _la === 124
        ) {
          {
            {
              this.state = 615;
              this.interfaceMethodModifier();
            }
          }
          this.state = 620;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 621;
        this.typeParameters();
        this.state = 622;
        this.interfaceCommonBodyDeclaration();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public interfaceCommonBodyDeclaration(): InterfaceCommonBodyDeclarationContext {
    let localctx: InterfaceCommonBodyDeclarationContext =
      new InterfaceCommonBodyDeclarationContext(this, this._ctx, this.state);
    this.enterRule(
      localctx,
      72,
      JavaParser.RULE_interfaceCommonBodyDeclaration,
    );
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 627;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 56, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 624;
                this.annotation();
              }
            }
          }
          this.state = 629;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 56, this._ctx);
        }
        this.state = 630;
        this.typeTypeOrVoid();
        this.state = 631;
        this.identifier();
        this.state = 632;
        this.formalParameters();
        this.state = 637;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 83) {
          {
            {
              this.state = 633;
              this.match(JavaParser.LBRACK);
              this.state = 634;
              this.match(JavaParser.RBRACK);
            }
          }
          this.state = 639;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 642;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 55) {
          {
            this.state = 640;
            this.match(JavaParser.THROWS);
            this.state = 641;
            this.qualifiedNameList();
          }
        }

        this.state = 644;
        this.methodBody();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public variableDeclarators(): VariableDeclaratorsContext {
    let localctx: VariableDeclaratorsContext = new VariableDeclaratorsContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 74, JavaParser.RULE_variableDeclarators);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 646;
        this.variableDeclarator();
        this.state = 651;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 59, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 647;
                this.match(JavaParser.COMMA);
                this.state = 648;
                this.variableDeclarator();
              }
            }
          }
          this.state = 653;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 59, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public variableDeclarator(): VariableDeclaratorContext {
    let localctx: VariableDeclaratorContext = new VariableDeclaratorContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 76, JavaParser.RULE_variableDeclarator);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 654;
        this.variableDeclaratorId();
        this.state = 657;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 60, this._ctx)) {
          case 1:
            {
              this.state = 655;
              this.match(JavaParser.ASSIGN);
              this.state = 656;
              this.variableInitializer();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public variableDeclaratorId(): VariableDeclaratorIdContext {
    let localctx: VariableDeclaratorIdContext = new VariableDeclaratorIdContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 78, JavaParser.RULE_variableDeclaratorId);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 659;
        this.identifier();
        this.state = 664;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 61, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 660;
                this.match(JavaParser.LBRACK);
                this.state = 661;
                this.match(JavaParser.RBRACK);
              }
            }
          }
          this.state = 666;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 61, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public variableInitializer(): VariableInitializerContext {
    let localctx: VariableInitializerContext = new VariableInitializerContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 80, JavaParser.RULE_variableInitializer);
    try {
      this.state = 669;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 81:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 667;
            this.arrayInitializer();
          }
          break;
        case 3:
        case 5:
        case 8:
        case 14:
        case 17:
        case 21:
        case 28:
        case 30:
        case 31:
        case 33:
        case 35:
        case 36:
        case 38:
        case 41:
        case 43:
        case 44:
        case 46:
        case 47:
        case 50:
        case 51:
        case 53:
        case 56:
        case 58:
        case 60:
        case 61:
        case 62:
        case 64:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 90:
        case 91:
        case 92:
        case 101:
        case 102:
        case 103:
        case 104:
        case 124:
        case 129:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 668;
            this.expression(0);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public arrayInitializer(): ArrayInitializerContext {
    let localctx: ArrayInitializerContext = new ArrayInitializerContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 82, JavaParser.RULE_arrayInitializer);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 671;
        this.match(JavaParser.LBRACE);
        this.state = 683;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) & 3130420525) !== 0) ||
          (((_la - 66) & ~0x1f) === 0 &&
            ((1 << (_la - 66)) & 117489663) !== 0) ||
          (((_la - 101) & ~0x1f) === 0 &&
            ((1 << (_la - 101)) & 276824079) !== 0)
        ) {
          {
            this.state = 672;
            this.variableInitializer();
            this.state = 677;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 63, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 673;
                    this.match(JavaParser.COMMA);
                    this.state = 674;
                    this.variableInitializer();
                  }
                }
              }
              this.state = 679;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 63, this._ctx);
            }
            this.state = 681;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 86) {
              {
                this.state = 680;
                this.match(JavaParser.COMMA);
              }
            }
          }
        }

        this.state = 685;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public classType(): ClassTypeContext {
    let localctx: ClassTypeContext = new ClassTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 84, JavaParser.RULE_classType);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 701;
        this._errHandler.sync(this);
        _alt = 1;
        do {
          switch (_alt) {
            case 1:
              {
                {
                  this.state = 695;
                  this._errHandler.sync(this);
                  switch (
                    this._interp.adaptivePredict(this._input, 67, this._ctx)
                  ) {
                    case 1:
                      {
                        this.state = 687;
                        this.packageName();
                        this.state = 688;
                        this.match(JavaParser.DOT);
                        this.state = 692;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === 124) {
                          {
                            {
                              this.state = 689;
                              this.annotation();
                            }
                          }
                          this.state = 694;
                          this._errHandler.sync(this);
                          _la = this._input.LA(1);
                        }
                      }
                      break;
                  }
                  this.state = 697;
                  this.typeIdentifier();
                  this.state = 699;
                  this._errHandler.sync(this);
                  switch (
                    this._interp.adaptivePredict(this._input, 68, this._ctx)
                  ) {
                    case 1:
                      {
                        this.state = 698;
                        this.typeArguments();
                      }
                      break;
                  }
                }
              }
              break;
            default:
              throw new NoViableAltException(this);
          }
          this.state = 703;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 69, this._ctx);
        } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
        this.state = 718;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 72, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 705;
                this.match(JavaParser.DOT);
                this.state = 709;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 124) {
                  {
                    {
                      this.state = 706;
                      this.annotation();
                    }
                  }
                  this.state = 711;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                }
                this.state = 712;
                this.typeIdentifier();
                this.state = 714;
                this._errHandler.sync(this);
                switch (
                  this._interp.adaptivePredict(this._input, 71, this._ctx)
                ) {
                  case 1:
                    {
                      this.state = 713;
                      this.typeArguments();
                    }
                    break;
                }
              }
            }
          }
          this.state = 720;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 72, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public packageName(): PackageNameContext {
    let localctx: PackageNameContext = new PackageNameContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 86, JavaParser.RULE_packageName);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 721;
        this.identifier();
        this.state = 726;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 73, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 722;
                this.match(JavaParser.DOT);
                this.state = 723;
                this.identifier();
              }
            }
          }
          this.state = 728;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 73, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeArgument(): TypeArgumentContext {
    let localctx: TypeArgumentContext = new TypeArgumentContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 88, JavaParser.RULE_typeArgument);
    let _la: number;
    try {
      this.state = 741;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 76, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 729;
            this.typeType();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 733;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 124) {
              {
                {
                  this.state = 730;
                  this.annotation();
                }
              }
              this.state = 735;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 736;
            this.match(JavaParser.QUESTION);
            this.state = 739;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 18 || _la === 50) {
              {
                this.state = 737;
                _la = this._input.LA(1);
                if (!(_la === 18 || _la === 50)) {
                  this._errHandler.recoverInline(this);
                } else {
                  this._errHandler.reportMatch(this);
                  this.consume();
                }
                this.state = 738;
                this.typeType();
              }
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public qualifiedNameList(): QualifiedNameListContext {
    let localctx: QualifiedNameListContext = new QualifiedNameListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 90, JavaParser.RULE_qualifiedNameList);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 743;
        this.qualifiedName();
        this.state = 748;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 744;
              this.match(JavaParser.COMMA);
              this.state = 745;
              this.qualifiedName();
            }
          }
          this.state = 750;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public formalParameters(): FormalParametersContext {
    let localctx: FormalParametersContext = new FormalParametersContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 92, JavaParser.RULE_formalParameters);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 751;
        this.match(JavaParser.LPAREN);
        this.state = 763;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3492430120) !== 0) ||
          (((_la - 35) & ~0x1f) === 0 &&
            ((1 << (_la - 35)) & 2795510603) !== 0) ||
          _la === 67 ||
          _la === 124 ||
          _la === 129
        ) {
          {
            this.state = 754;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 78, this._ctx)) {
              case 1:
                {
                  this.state = 752;
                  this.receiverParameter();
                }
                break;
              case 2:
                {
                  this.state = 753;
                  this.formalParameter();
                }
                break;
            }
            this.state = 760;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 86) {
              {
                {
                  this.state = 756;
                  this.match(JavaParser.COMMA);
                  this.state = 757;
                  this.formalParameterList();
                }
              }
              this.state = 762;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
        }

        this.state = 765;
        this.match(JavaParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public receiverParameter(): ReceiverParameterContext {
    let localctx: ReceiverParameterContext = new ReceiverParameterContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 94, JavaParser.RULE_receiverParameter);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 767;
        this.typeType();
        this.state = 773;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          (((_la - 17) & ~0x1f) === 0 &&
            ((1 << (_la - 17)) & 757874689) !== 0) ||
          (((_la - 56) & ~0x1f) === 0 && ((1 << (_la - 56)) & 3381) !== 0) ||
          _la === 129
        ) {
          {
            {
              this.state = 768;
              this.identifier();
              this.state = 769;
              this.match(JavaParser.DOT);
            }
          }
          this.state = 775;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 776;
        this.match(JavaParser.THIS);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public formalParameterList(): FormalParameterListContext {
    let localctx: FormalParameterListContext = new FormalParameterListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 96, JavaParser.RULE_formalParameterList);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 778;
        this.formalParameter();
        this.state = 783;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 82, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 779;
                this.match(JavaParser.COMMA);
                this.state = 780;
                this.formalParameter();
              }
            }
          }
          this.state = 785;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 82, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public formalParameter(): FormalParameterContext {
    let localctx: FormalParameterContext = new FormalParameterContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 98, JavaParser.RULE_formalParameter);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 789;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 83, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 786;
                this.variableModifier();
              }
            }
          }
          this.state = 791;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 83, this._ctx);
        }
        this.state = 792;
        this.typeType();
        this.state = 800;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 124 || _la === 125) {
          {
            this.state = 796;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 124) {
              {
                {
                  this.state = 793;
                  this.annotation();
                }
              }
              this.state = 798;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 799;
            this.match(JavaParser.ELLIPSIS);
          }
        }

        this.state = 802;
        this.variableDeclaratorId();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public lambdaLVTIList(): LambdaLVTIListContext {
    let localctx: LambdaLVTIListContext = new LambdaLVTIListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 100, JavaParser.RULE_lambdaLVTIList);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 804;
        this.lambdaLVTIParameter();
        this.state = 809;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 805;
              this.match(JavaParser.COMMA);
              this.state = 806;
              this.lambdaLVTIParameter();
            }
          }
          this.state = 811;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public lambdaLVTIParameter(): LambdaLVTIParameterContext {
    let localctx: LambdaLVTIParameterContext = new LambdaLVTIParameterContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 102, JavaParser.RULE_lambdaLVTIParameter);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 815;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 19 || _la === 124) {
          {
            {
              this.state = 812;
              this.variableModifier();
            }
          }
          this.state = 817;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 818;
        this.match(JavaParser.VAR);
        this.state = 819;
        this.identifier();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public qualifiedName(): QualifiedNameContext {
    let localctx: QualifiedNameContext = new QualifiedNameContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 104, JavaParser.RULE_qualifiedName);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 821;
        this.identifier();
        this.state = 826;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 88, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 822;
                this.match(JavaParser.DOT);
                this.state = 823;
                this.identifier();
              }
            }
          }
          this.state = 828;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 88, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public literal(): LiteralContext {
    let localctx: LiteralContext = new LiteralContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 106, JavaParser.RULE_literal);
    try {
      this.state = 836;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 68:
        case 69:
        case 70:
        case 71:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 829;
            this.integerLiteral();
          }
          break;
        case 72:
        case 73:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 830;
            this.floatLiteral();
          }
          break;
        case 75:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 831;
            this.match(JavaParser.CHAR_LITERAL);
          }
          break;
        case 76:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 832;
            this.match(JavaParser.STRING_LITERAL);
          }
          break;
        case 74:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 833;
            this.match(JavaParser.BOOL_LITERAL);
          }
          break;
        case 78:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 834;
            this.match(JavaParser.NULL_LITERAL);
          }
          break;
        case 77:
          this.enterOuterAlt(localctx, 7);
          {
            this.state = 835;
            this.match(JavaParser.TEXT_BLOCK);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public integerLiteral(): IntegerLiteralContext {
    let localctx: IntegerLiteralContext = new IntegerLiteralContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 108, JavaParser.RULE_integerLiteral);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 838;
        _la = this._input.LA(1);
        if (!(((_la - 68) & ~0x1f) === 0 && ((1 << (_la - 68)) & 15) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public floatLiteral(): FloatLiteralContext {
    let localctx: FloatLiteralContext = new FloatLiteralContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 110, JavaParser.RULE_floatLiteral);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 840;
        _la = this._input.LA(1);
        if (!(_la === 72 || _la === 73)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public altAnnotationQualifiedName(): AltAnnotationQualifiedNameContext {
    let localctx: AltAnnotationQualifiedNameContext =
      new AltAnnotationQualifiedNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 112, JavaParser.RULE_altAnnotationQualifiedName);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 847;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          (((_la - 17) & ~0x1f) === 0 &&
            ((1 << (_la - 17)) & 757874689) !== 0) ||
          (((_la - 56) & ~0x1f) === 0 && ((1 << (_la - 56)) & 3381) !== 0) ||
          _la === 129
        ) {
          {
            {
              this.state = 842;
              this.identifier();
              this.state = 843;
              this.match(JavaParser.DOT);
            }
          }
          this.state = 849;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 850;
        this.match(JavaParser.AT);
        this.state = 851;
        this.identifier();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotation(): AnnotationContext {
    let localctx: AnnotationContext = new AnnotationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 114, JavaParser.RULE_annotation);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        {
          this.state = 853;
          this.match(JavaParser.AT);
          this.state = 854;
          this.qualifiedName();
        }
        this.state = 857;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 79) {
          {
            this.state = 856;
            this.annotationFieldValues();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationFieldValues(): AnnotationFieldValuesContext {
    let localctx: AnnotationFieldValuesContext =
      new AnnotationFieldValuesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 116, JavaParser.RULE_annotationFieldValues);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 859;
        this.match(JavaParser.LPAREN);
        this.state = 868;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 93, this._ctx)) {
          case 1:
            {
              this.state = 860;
              this.annotationFieldValue();
              this.state = 865;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              while (_la === 86) {
                {
                  {
                    this.state = 861;
                    this.match(JavaParser.COMMA);
                    this.state = 862;
                    this.annotationFieldValue();
                  }
                }
                this.state = 867;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
              }
            }
            break;
        }
        this.state = 870;
        this.match(JavaParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationFieldValue(): AnnotationFieldValueContext {
    let localctx: AnnotationFieldValueContext = new AnnotationFieldValueContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 118, JavaParser.RULE_annotationFieldValue);
    try {
      this.state = 878;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 94, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 872;
            if (!this.IsNotIdentifierAssign()) {
              throw this.createFailedPredicateException(
                ' this.IsNotIdentifierAssign() ',
              );
            }
            this.state = 873;
            this.annotationValue();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 874;
            this.identifier();
            this.state = 875;
            this.match(JavaParser.ASSIGN);
            this.state = 876;
            this.annotationValue();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationValue(): AnnotationValueContext {
    let localctx: AnnotationValueContext = new AnnotationValueContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 120, JavaParser.RULE_annotationValue);
    let _la: number;
    try {
      let _alt: number;
      this.state = 897;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 98, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 880;
            this.expression(0);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 881;
            this.annotation();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 882;
            this.match(JavaParser.LBRACE);
            this.state = 891;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
              (((_la - 33) & ~0x1f) === 0 &&
                ((1 << (_la - 33)) & 3130420525) !== 0) ||
              (((_la - 66) & ~0x1f) === 0 &&
                ((1 << (_la - 66)) & 117489663) !== 0) ||
              (((_la - 101) & ~0x1f) === 0 &&
                ((1 << (_la - 101)) & 276824079) !== 0)
            ) {
              {
                this.state = 883;
                this.annotationValue();
                this.state = 888;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 95, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                  if (_alt === 1) {
                    {
                      {
                        this.state = 884;
                        this.match(JavaParser.COMMA);
                        this.state = 885;
                        this.annotationValue();
                      }
                    }
                  }
                  this.state = 890;
                  this._errHandler.sync(this);
                  _alt = this._interp.adaptivePredict(
                    this._input,
                    95,
                    this._ctx,
                  );
                }
              }
            }

            this.state = 894;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 86) {
              {
                this.state = 893;
                this.match(JavaParser.COMMA);
              }
            }

            this.state = 896;
            this.match(JavaParser.RBRACE);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public elementValue(): ElementValueContext {
    let localctx: ElementValueContext = new ElementValueContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 122, JavaParser.RULE_elementValue);
    try {
      this.state = 902;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 99, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 899;
            this.expression(0);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 900;
            this.annotation();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 901;
            this.elementValueArrayInitializer();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public elementValueArrayInitializer(): ElementValueArrayInitializerContext {
    let localctx: ElementValueArrayInitializerContext =
      new ElementValueArrayInitializerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 124, JavaParser.RULE_elementValueArrayInitializer);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 904;
        this.match(JavaParser.LBRACE);
        this.state = 913;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) & 3130420525) !== 0) ||
          (((_la - 66) & ~0x1f) === 0 &&
            ((1 << (_la - 66)) & 117489663) !== 0) ||
          (((_la - 101) & ~0x1f) === 0 &&
            ((1 << (_la - 101)) & 276824079) !== 0)
        ) {
          {
            this.state = 905;
            this.elementValue();
            this.state = 910;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 100, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 906;
                    this.match(JavaParser.COMMA);
                    this.state = 907;
                    this.elementValue();
                  }
                }
              }
              this.state = 912;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 100, this._ctx);
            }
          }
        }

        this.state = 916;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 86) {
          {
            this.state = 915;
            this.match(JavaParser.COMMA);
          }
        }

        this.state = 918;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationTypeDeclaration(): AnnotationTypeDeclarationContext {
    let localctx: AnnotationTypeDeclarationContext =
      new AnnotationTypeDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 126, JavaParser.RULE_annotationTypeDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 920;
        this.match(JavaParser.AT);
        this.state = 921;
        this.match(JavaParser.INTERFACE);
        this.state = 922;
        this.identifier();
        this.state = 923;
        this.annotationTypeBody();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationTypeBody(): AnnotationTypeBodyContext {
    let localctx: AnnotationTypeBodyContext = new AnnotationTypeBodyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 128, JavaParser.RULE_annotationTypeBody);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 925;
        this.match(JavaParser.LBRACE);
        this.state = 929;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 4029367082) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) & 3071533021) !== 0) ||
          (((_la - 64) & ~0x1f) === 0 && ((1 << (_la - 64)) & 2097165) !== 0) ||
          _la === 124 ||
          _la === 129
        ) {
          {
            {
              this.state = 926;
              this.annotationTypeElementDeclaration();
            }
          }
          this.state = 931;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 932;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationTypeElementDeclaration(): AnnotationTypeElementDeclarationContext {
    let localctx: AnnotationTypeElementDeclarationContext =
      new AnnotationTypeElementDeclarationContext(this, this._ctx, this.state);
    this.enterRule(
      localctx,
      130,
      JavaParser.RULE_annotationTypeElementDeclaration,
    );
    try {
      let _alt: number;
      this.state = 942;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 1:
        case 3:
        case 5:
        case 8:
        case 9:
        case 14:
        case 16:
        case 17:
        case 19:
        case 21:
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 34:
        case 35:
        case 36:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 46:
        case 47:
        case 48:
        case 49:
        case 52:
        case 56:
        case 57:
        case 58:
        case 60:
        case 61:
        case 63:
        case 64:
        case 66:
        case 67:
        case 124:
        case 129:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 937;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 104, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 934;
                    this.modifier();
                  }
                }
              }
              this.state = 939;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 104, this._ctx);
            }
            this.state = 940;
            this.annotationTypeElementRest();
          }
          break;
        case 85:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 941;
            this.match(JavaParser.SEMI);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationTypeElementRest(): AnnotationTypeElementRestContext {
    let localctx: AnnotationTypeElementRestContext =
      new AnnotationTypeElementRestContext(this, this._ctx, this.state);
    this.enterRule(localctx, 132, JavaParser.RULE_annotationTypeElementRest);
    try {
      this.state = 968;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 111, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 944;
            this.typeType();
            this.state = 945;
            this.annotationMethodOrConstantRest();
            this.state = 946;
            this.match(JavaParser.SEMI);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 948;
            this.classDeclaration();
            this.state = 950;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 106, this._ctx)) {
              case 1:
                {
                  this.state = 949;
                  this.match(JavaParser.SEMI);
                }
                break;
            }
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 952;
            this.interfaceDeclaration();
            this.state = 954;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 107, this._ctx)) {
              case 1:
                {
                  this.state = 953;
                  this.match(JavaParser.SEMI);
                }
                break;
            }
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 956;
            this.enumDeclaration();
            this.state = 958;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 108, this._ctx)) {
              case 1:
                {
                  this.state = 957;
                  this.match(JavaParser.SEMI);
                }
                break;
            }
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 960;
            this.annotationTypeDeclaration();
            this.state = 962;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 109, this._ctx)) {
              case 1:
                {
                  this.state = 961;
                  this.match(JavaParser.SEMI);
                }
                break;
            }
          }
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 964;
            this.recordDeclaration();
            this.state = 966;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 110, this._ctx)) {
              case 1:
                {
                  this.state = 965;
                  this.match(JavaParser.SEMI);
                }
                break;
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationMethodOrConstantRest(): AnnotationMethodOrConstantRestContext {
    let localctx: AnnotationMethodOrConstantRestContext =
      new AnnotationMethodOrConstantRestContext(this, this._ctx, this.state);
    this.enterRule(
      localctx,
      134,
      JavaParser.RULE_annotationMethodOrConstantRest,
    );
    try {
      this.state = 972;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 112, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 970;
            this.annotationMethodRest();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 971;
            this.annotationConstantRest();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationMethodRest(): AnnotationMethodRestContext {
    let localctx: AnnotationMethodRestContext = new AnnotationMethodRestContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 136, JavaParser.RULE_annotationMethodRest);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 974;
        this.identifier();
        this.state = 975;
        this.match(JavaParser.LPAREN);
        this.state = 976;
        this.match(JavaParser.RPAREN);
        this.state = 978;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 12) {
          {
            this.state = 977;
            this.defaultValue();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public annotationConstantRest(): AnnotationConstantRestContext {
    let localctx: AnnotationConstantRestContext =
      new AnnotationConstantRestContext(this, this._ctx, this.state);
    this.enterRule(localctx, 138, JavaParser.RULE_annotationConstantRest);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 980;
        this.variableDeclarators();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public defaultValue(): DefaultValueContext {
    let localctx: DefaultValueContext = new DefaultValueContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 140, JavaParser.RULE_defaultValue);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 982;
        this.match(JavaParser.DEFAULT);
        this.state = 983;
        this.elementValue();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public moduleDeclaration(): ModuleDeclarationContext {
    let localctx: ModuleDeclarationContext = new ModuleDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 142, JavaParser.RULE_moduleDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 988;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 124) {
          {
            {
              this.state = 985;
              this.annotation();
            }
          }
          this.state = 990;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 992;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 35) {
          {
            this.state = 991;
            this.match(JavaParser.OPEN);
          }
        }

        this.state = 994;
        this.match(JavaParser.MODULE);
        this.state = 995;
        this.qualifiedName();
        this.state = 996;
        this.match(JavaParser.LBRACE);
        this.state = 1000;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          _la === 17 ||
          (((_la - 36) & ~0x1f) === 0 && ((1 << (_la - 36)) & 16777505) !== 0)
        ) {
          {
            {
              this.state = 997;
              this.moduleDirective();
            }
          }
          this.state = 1002;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1003;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public moduleDirective(): ModuleDirectiveContext {
    let localctx: ModuleDirectiveContext = new ModuleDirectiveContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 144, JavaParser.RULE_moduleDirective);
    let _la: number;
    try {
      let _alt: number;
      this.state = 1062;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 44:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1005;
            this.match(JavaParser.REQUIRES);
            this.state = 1009;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 117, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 1006;
                    this.requiresModifier();
                  }
                }
              }
              this.state = 1011;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 117, this._ctx);
            }
            this.state = 1012;
            this.qualifiedName();
            this.state = 1013;
            this.match(JavaParser.SEMI);
          }
          break;
        case 17:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1015;
            this.match(JavaParser.EXPORTS);
            this.state = 1016;
            this.qualifiedName();
            this.state = 1026;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 56) {
              {
                this.state = 1017;
                this.match(JavaParser.TO);
                this.state = 1018;
                this.qualifiedName();
                this.state = 1023;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 86) {
                  {
                    {
                      this.state = 1019;
                      this.match(JavaParser.COMMA);
                      this.state = 1020;
                      this.qualifiedName();
                    }
                  }
                  this.state = 1025;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                }
              }
            }

            this.state = 1028;
            this.match(JavaParser.SEMI);
          }
          break;
        case 36:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 1030;
            this.match(JavaParser.OPENS);
            this.state = 1031;
            this.qualifiedName();
            this.state = 1041;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 56) {
              {
                this.state = 1032;
                this.match(JavaParser.TO);
                this.state = 1033;
                this.qualifiedName();
                this.state = 1038;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 86) {
                  {
                    {
                      this.state = 1034;
                      this.match(JavaParser.COMMA);
                      this.state = 1035;
                      this.qualifiedName();
                    }
                  }
                  this.state = 1040;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                }
              }
            }

            this.state = 1043;
            this.match(JavaParser.SEMI);
          }
          break;
        case 60:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 1045;
            this.match(JavaParser.USES);
            this.state = 1046;
            this.qualifiedName();
            this.state = 1047;
            this.match(JavaParser.SEMI);
          }
          break;
        case 41:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 1049;
            this.match(JavaParser.PROVIDES);
            this.state = 1050;
            this.qualifiedName();
            this.state = 1051;
            this.match(JavaParser.WITH);
            this.state = 1052;
            this.qualifiedName();
            this.state = 1057;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 86) {
              {
                {
                  this.state = 1053;
                  this.match(JavaParser.COMMA);
                  this.state = 1054;
                  this.qualifiedName();
                }
              }
              this.state = 1059;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 1060;
            this.match(JavaParser.SEMI);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public requiresModifier(): RequiresModifierContext {
    let localctx: RequiresModifierContext = new RequiresModifierContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 146, JavaParser.RULE_requiresModifier);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1064;
        _la = this._input.LA(1);
        if (!(_la === 48 || _la === 58)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public recordDeclaration(): RecordDeclarationContext {
    let localctx: RecordDeclarationContext = new RecordDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 148, JavaParser.RULE_recordDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1066;
        this.match(JavaParser.RECORD);
        this.state = 1067;
        this.identifier();
        this.state = 1069;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 90) {
          {
            this.state = 1068;
            this.typeParameters();
          }
        }

        this.state = 1071;
        this.recordHeader();
        this.state = 1074;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 25) {
          {
            this.state = 1072;
            this.match(JavaParser.IMPLEMENTS);
            this.state = 1073;
            this.typeList();
          }
        }

        this.state = 1076;
        this.recordBody();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public recordHeader(): RecordHeaderContext {
    let localctx: RecordHeaderContext = new RecordHeaderContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 150, JavaParser.RULE_recordHeader);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1078;
        this.match(JavaParser.LPAREN);
        this.state = 1080;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
          (((_la - 35) & ~0x1f) === 0 &&
            ((1 << (_la - 35)) & 2795510603) !== 0) ||
          _la === 67 ||
          _la === 124 ||
          _la === 129
        ) {
          {
            this.state = 1079;
            this.recordComponentList();
          }
        }

        this.state = 1082;
        this.match(JavaParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public recordComponentList(): RecordComponentListContext {
    let localctx: RecordComponentListContext = new RecordComponentListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 152, JavaParser.RULE_recordComponentList);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1084;
        this.recordComponent();
        this.state = 1089;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 127, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 1085;
                this.match(JavaParser.COMMA);
                this.state = 1086;
                this.recordComponent();
              }
            }
          }
          this.state = 1091;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 127, this._ctx);
        }
        this.state = 1092;
        if (!this.DoLastRecordComponent()) {
          throw this.createFailedPredicateException(
            ' this.DoLastRecordComponent() ',
          );
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public recordComponent(): RecordComponentContext {
    let localctx: RecordComponentContext = new RecordComponentContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 154, JavaParser.RULE_recordComponent);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1097;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 128, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 1094;
                this.annotation();
              }
            }
          }
          this.state = 1099;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 128, this._ctx);
        }
        this.state = 1100;
        this.typeType();
        this.state = 1108;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 124 || _la === 125) {
          {
            this.state = 1104;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 124) {
              {
                {
                  this.state = 1101;
                  this.annotation();
                }
              }
              this.state = 1106;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 1107;
            this.match(JavaParser.ELLIPSIS);
          }
        }

        this.state = 1110;
        this.identifier();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public recordBody(): RecordBodyContext {
    let localctx: RecordBodyContext = new RecordBodyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 156, JavaParser.RULE_recordBody);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1112;
        this.match(JavaParser.LBRACE);
        this.state = 1117;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 4029367082) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) & 4145274845) !== 0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) & 69337101) !== 0) ||
          _la === 124 ||
          _la === 129
        ) {
          {
            this.state = 1115;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 131, this._ctx)) {
              case 1:
                {
                  this.state = 1113;
                  this.classBodyDeclaration();
                }
                break;
              case 2:
                {
                  this.state = 1114;
                  this.compactConstructorDeclaration();
                }
                break;
            }
          }
          this.state = 1119;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1120;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public block(): BlockContext {
    let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 158, JavaParser.RULE_block);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1122;
        this.match(JavaParser.LBRACE);
        this.state = 1126;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 4050348862) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) & 3200253935) !== 0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) & 236027903) !== 0) ||
          (((_la - 101) & ~0x1f) === 0 &&
            ((1 << (_la - 101)) & 276824079) !== 0)
        ) {
          {
            {
              this.state = 1123;
              this.blockStatement();
            }
          }
          this.state = 1128;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1129;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public blockStatement(): BlockStatementContext {
    let localctx: BlockStatementContext = new BlockStatementContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 160, JavaParser.RULE_blockStatement);
    try {
      this.state = 1136;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 134, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1131;
            this.localVariableDeclaration();
            this.state = 1132;
            this.match(JavaParser.SEMI);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1134;
            this.localTypeDeclaration();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 1135;
            this.statement();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public localVariableDeclaration(): LocalVariableDeclarationContext {
    let localctx: LocalVariableDeclarationContext =
      new LocalVariableDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 162, JavaParser.RULE_localVariableDeclaration);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1141;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 135, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 1138;
                this.variableModifier();
              }
            }
          }
          this.state = 1143;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 135, this._ctx);
        }
        this.state = 1152;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 136, this._ctx)) {
          case 1:
            {
              this.state = 1144;
              this.match(JavaParser.VAR);
              this.state = 1145;
              this.identifier();
              this.state = 1146;
              this.match(JavaParser.ASSIGN);
              this.state = 1147;
              this.expression(0);
            }
            break;
          case 2:
            {
              this.state = 1149;
              this.typeType();
              this.state = 1150;
              this.variableDeclarators();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public identifier(): IdentifierContext {
    let localctx: IdentifierContext = new IdentifierContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 164, JavaParser.RULE_identifier);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1154;
        _la = this._input.LA(1);
        if (
          !(
            (((_la - 17) & ~0x1f) === 0 &&
              ((1 << (_la - 17)) & 757874689) !== 0) ||
            (((_la - 56) & ~0x1f) === 0 && ((1 << (_la - 56)) & 3381) !== 0) ||
            _la === 129
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeIdentifier(): TypeIdentifierContext {
    let localctx: TypeIdentifierContext = new TypeIdentifierContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 166, JavaParser.RULE_typeIdentifier);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1156;
        _la = this._input.LA(1);
        if (
          !(
            _la === 17 ||
            _la === 31 ||
            (((_la - 35) & ~0x1f) === 0 &&
              ((1 << (_la - 35)) & 2191526467) !== 0) ||
            _la === 129
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public localTypeDeclaration(): LocalTypeDeclarationContext {
    let localctx: LocalTypeDeclarationContext = new LocalTypeDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 168, JavaParser.RULE_localTypeDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1161;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          _la === 1 ||
          _la === 19 ||
          (((_la - 34) & ~0x1f) === 0 && ((1 << (_la - 34)) & 53601) !== 0) ||
          _la === 124
        ) {
          {
            {
              this.state = 1158;
              this.classOrInterfaceModifier();
            }
          }
          this.state = 1163;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1168;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 9:
            {
              this.state = 1164;
              this.classDeclaration();
            }
            break;
          case 29:
            {
              this.state = 1165;
              this.interfaceDeclaration();
            }
            break;
          case 43:
            {
              this.state = 1166;
              this.recordDeclaration();
            }
            break;
          case 16:
            {
              this.state = 1167;
              this.enumDeclaration();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public statement(): StatementContext {
    let localctx: StatementContext = new StatementContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 170, JavaParser.RULE_statement);
    let _la: number;
    try {
      let _alt: number;
      this.state = 1293;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 152, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1170;
            localctx._blockLabel = this.block();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1171;
            this.match(JavaParser.ASSERT);
            this.state = 1172;
            this.expression(0);
            this.state = 1175;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 94) {
              {
                this.state = 1173;
                this.match(JavaParser.COLON);
                this.state = 1174;
                this.expression(0);
              }
            }

            this.state = 1177;
            this.match(JavaParser.SEMI);
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 1179;
            this.match(JavaParser.IF);
            this.state = 1180;
            this.match(JavaParser.LPAREN);
            this.state = 1181;
            this.expression(0);
            this.state = 1182;
            this.match(JavaParser.RPAREN);
            this.state = 1183;
            this.statement();
            this.state = 1186;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 140, this._ctx)) {
              case 1:
                {
                  this.state = 1184;
                  this.match(JavaParser.ELSE);
                  this.state = 1185;
                  this.statement();
                }
                break;
            }
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 1188;
            this.match(JavaParser.FOR);
            this.state = 1189;
            this.match(JavaParser.LPAREN);
            this.state = 1190;
            this.forControl();
            this.state = 1191;
            this.match(JavaParser.RPAREN);
            this.state = 1192;
            this.statement();
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 1194;
            this.match(JavaParser.WHILE);
            this.state = 1195;
            this.match(JavaParser.LPAREN);
            this.state = 1196;
            this.expression(0);
            this.state = 1197;
            this.match(JavaParser.RPAREN);
            this.state = 1198;
            this.statement();
          }
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 1200;
            this.match(JavaParser.DO);
            this.state = 1201;
            this.statement();
            this.state = 1202;
            this.match(JavaParser.WHILE);
            this.state = 1203;
            this.match(JavaParser.LPAREN);
            this.state = 1204;
            this.expression(0);
            this.state = 1205;
            this.match(JavaParser.RPAREN);
            this.state = 1206;
            this.match(JavaParser.SEMI);
          }
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          {
            this.state = 1208;
            this.match(JavaParser.TRY);
            this.state = 1209;
            this.block();
            this.state = 1219;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case 7:
                {
                  this.state = 1211;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  do {
                    {
                      {
                        this.state = 1210;
                        this.catchClause();
                      }
                    }
                    this.state = 1213;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                  } while (_la === 7);
                  this.state = 1216;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  if (_la === 20) {
                    {
                      this.state = 1215;
                      this.finallyBlock();
                    }
                  }
                }
                break;
              case 20:
                {
                  this.state = 1218;
                  this.finallyBlock();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
          }
          break;
        case 8:
          this.enterOuterAlt(localctx, 8);
          {
            this.state = 1221;
            this.match(JavaParser.TRY);
            this.state = 1222;
            this.resourceSpecification();
            this.state = 1223;
            this.block();
            this.state = 1227;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 7) {
              {
                {
                  this.state = 1224;
                  this.catchClause();
                }
              }
              this.state = 1229;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 1231;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 20) {
              {
                this.state = 1230;
                this.finallyBlock();
              }
            }
          }
          break;
        case 9:
          this.enterOuterAlt(localctx, 9);
          {
            this.state = 1233;
            this.match(JavaParser.SWITCH);
            this.state = 1234;
            this.match(JavaParser.LPAREN);
            this.state = 1235;
            this.expression(0);
            this.state = 1236;
            this.match(JavaParser.RPAREN);
            this.state = 1237;
            this.match(JavaParser.LBRACE);
            this.state = 1241;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 146, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 1238;
                    this.switchBlockStatementGroup();
                  }
                }
              }
              this.state = 1243;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 146, this._ctx);
            }
            this.state = 1247;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 6 || _la === 12) {
              {
                {
                  this.state = 1244;
                  this.switchLabel();
                }
              }
              this.state = 1249;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 1250;
            this.match(JavaParser.RBRACE);
          }
          break;
        case 10:
          this.enterOuterAlt(localctx, 10);
          {
            this.state = 1252;
            this.match(JavaParser.SYNCHRONIZED);
            this.state = 1253;
            this.match(JavaParser.LPAREN);
            this.state = 1254;
            this.expression(0);
            this.state = 1255;
            this.match(JavaParser.RPAREN);
            this.state = 1256;
            this.block();
          }
          break;
        case 11:
          this.enterOuterAlt(localctx, 11);
          {
            this.state = 1258;
            this.match(JavaParser.RETURN);
            this.state = 1260;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
              (((_la - 33) & ~0x1f) === 0 &&
                ((1 << (_la - 33)) & 3130420525) !== 0) ||
              (((_la - 66) & ~0x1f) === 0 &&
                ((1 << (_la - 66)) & 117456895) !== 0) ||
              (((_la - 101) & ~0x1f) === 0 &&
                ((1 << (_la - 101)) & 276824079) !== 0)
            ) {
              {
                this.state = 1259;
                this.expression(0);
              }
            }

            this.state = 1262;
            this.match(JavaParser.SEMI);
          }
          break;
        case 12:
          this.enterOuterAlt(localctx, 12);
          {
            this.state = 1263;
            this.match(JavaParser.THROW);
            this.state = 1264;
            this.expression(0);
            this.state = 1265;
            this.match(JavaParser.SEMI);
          }
          break;
        case 13:
          this.enterOuterAlt(localctx, 13);
          {
            this.state = 1267;
            this.match(JavaParser.BREAK);
            this.state = 1269;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              (((_la - 17) & ~0x1f) === 0 &&
                ((1 << (_la - 17)) & 757874689) !== 0) ||
              (((_la - 56) & ~0x1f) === 0 &&
                ((1 << (_la - 56)) & 3381) !== 0) ||
              _la === 129
            ) {
              {
                this.state = 1268;
                this.identifier();
              }
            }

            this.state = 1271;
            this.match(JavaParser.SEMI);
          }
          break;
        case 14:
          this.enterOuterAlt(localctx, 14);
          {
            this.state = 1272;
            this.match(JavaParser.CONTINUE);
            this.state = 1274;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              (((_la - 17) & ~0x1f) === 0 &&
                ((1 << (_la - 17)) & 757874689) !== 0) ||
              (((_la - 56) & ~0x1f) === 0 &&
                ((1 << (_la - 56)) & 3381) !== 0) ||
              _la === 129
            ) {
              {
                this.state = 1273;
                this.identifier();
              }
            }

            this.state = 1276;
            this.match(JavaParser.SEMI);
          }
          break;
        case 15:
          this.enterOuterAlt(localctx, 15);
          {
            this.state = 1277;
            this.match(JavaParser.YIELD);
            this.state = 1278;
            this.expression(0);
            this.state = 1279;
            this.match(JavaParser.SEMI);
          }
          break;
        case 16:
          this.enterOuterAlt(localctx, 16);
          {
            this.state = 1281;
            this.match(JavaParser.SEMI);
          }
          break;
        case 17:
          this.enterOuterAlt(localctx, 17);
          {
            this.state = 1282;
            localctx._statementExpression = this.expression(0);
            this.state = 1283;
            this.match(JavaParser.SEMI);
          }
          break;
        case 18:
          this.enterOuterAlt(localctx, 18);
          {
            this.state = 1285;
            this.switchExpression();
            this.state = 1287;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 151, this._ctx)) {
              case 1:
                {
                  this.state = 1286;
                  this.match(JavaParser.SEMI);
                }
                break;
            }
          }
          break;
        case 19:
          this.enterOuterAlt(localctx, 19);
          {
            this.state = 1289;
            localctx._identifierLabel = this.identifier();
            this.state = 1290;
            this.match(JavaParser.COLON);
            this.state = 1291;
            this.statement();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public catchClause(): CatchClauseContext {
    let localctx: CatchClauseContext = new CatchClauseContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 172, JavaParser.RULE_catchClause);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1295;
        this.match(JavaParser.CATCH);
        this.state = 1296;
        this.match(JavaParser.LPAREN);
        this.state = 1300;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 19 || _la === 124) {
          {
            {
              this.state = 1297;
              this.variableModifier();
            }
          }
          this.state = 1302;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1303;
        this.catchType();
        this.state = 1304;
        this.identifier();
        this.state = 1305;
        this.match(JavaParser.RPAREN);
        this.state = 1306;
        this.block();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public catchType(): CatchTypeContext {
    let localctx: CatchTypeContext = new CatchTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 174, JavaParser.RULE_catchType);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1308;
        this.qualifiedName();
        this.state = 1313;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 108) {
          {
            {
              this.state = 1309;
              this.match(JavaParser.BITOR);
              this.state = 1310;
              this.qualifiedName();
            }
          }
          this.state = 1315;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public finallyBlock(): FinallyBlockContext {
    let localctx: FinallyBlockContext = new FinallyBlockContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 176, JavaParser.RULE_finallyBlock);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1316;
        this.match(JavaParser.FINALLY);
        this.state = 1317;
        this.block();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public resourceSpecification(): ResourceSpecificationContext {
    let localctx: ResourceSpecificationContext =
      new ResourceSpecificationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 178, JavaParser.RULE_resourceSpecification);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1319;
        this.match(JavaParser.LPAREN);
        this.state = 1320;
        this.resources();
        this.state = 1322;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 85) {
          {
            this.state = 1321;
            this.match(JavaParser.SEMI);
          }
        }

        this.state = 1324;
        this.match(JavaParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public resources(): ResourcesContext {
    let localctx: ResourcesContext = new ResourcesContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 180, JavaParser.RULE_resources);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1326;
        this.resource();
        this.state = 1331;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 156, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 1327;
                this.match(JavaParser.SEMI);
                this.state = 1328;
                this.resource();
              }
            }
          }
          this.state = 1333;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 156, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public resource(): ResourceContext {
    let localctx: ResourceContext = new ResourceContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 182, JavaParser.RULE_resource);
    let _la: number;
    try {
      this.state = 1351;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 159, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1337;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 19 || _la === 124) {
              {
                {
                  this.state = 1334;
                  this.variableModifier();
                }
              }
              this.state = 1339;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 1345;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 158, this._ctx)) {
              case 1:
                {
                  this.state = 1340;
                  this.classOrInterfaceType();
                  this.state = 1341;
                  this.variableDeclaratorId();
                }
                break;
              case 2:
                {
                  this.state = 1343;
                  this.match(JavaParser.VAR);
                  this.state = 1344;
                  this.identifier();
                }
                break;
            }
            this.state = 1347;
            this.match(JavaParser.ASSIGN);
            this.state = 1348;
            this.expression(0);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1350;
            this.qualifiedName();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public switchBlockStatementGroup(): SwitchBlockStatementGroupContext {
    let localctx: SwitchBlockStatementGroupContext =
      new SwitchBlockStatementGroupContext(this, this._ctx, this.state);
    this.enterRule(localctx, 184, JavaParser.RULE_switchBlockStatementGroup);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1356;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 1353;
              this.switchLabel();
              this.state = 1354;
              this.match(JavaParser.COLON);
            }
          }
          this.state = 1358;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === 6 || _la === 12);
        this.state = 1361;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 1360;
              this.blockStatement();
            }
          }
          this.state = 1363;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 4050348862) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) & 3200253935) !== 0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) & 236027903) !== 0) ||
          (((_la - 101) & ~0x1f) === 0 &&
            ((1 << (_la - 101)) & 276824079) !== 0)
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public switchLabel(): SwitchLabelContext {
    let localctx: SwitchLabelContext = new SwitchLabelContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 186, JavaParser.RULE_switchLabel);
    try {
      this.state = 1374;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 6:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1365;
            this.match(JavaParser.CASE);
            this.state = 1371;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 162, this._ctx)) {
              case 1:
                {
                  this.state = 1366;
                  localctx._constantExpression = this.expression(0);
                }
                break;
              case 2:
                {
                  this.state = 1367;
                  localctx._enumConstantName = this.match(
                    JavaParser.IDENTIFIER,
                  );
                }
                break;
              case 3:
                {
                  this.state = 1368;
                  this.typeType();
                  this.state = 1369;
                  localctx._varName = this.identifier();
                }
                break;
            }
          }
          break;
        case 12:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1373;
            this.match(JavaParser.DEFAULT);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public forControl(): ForControlContext {
    let localctx: ForControlContext = new ForControlContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 188, JavaParser.RULE_forControl);
    let _la: number;
    try {
      this.state = 1388;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 167, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1376;
            this.enhancedForControl();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1378;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 3492430120) !== 0) ||
              (((_la - 33) & ~0x1f) === 0 &&
                ((1 << (_la - 33)) & 3130420525) !== 0) ||
              (((_la - 66) & ~0x1f) === 0 &&
                ((1 << (_la - 66)) & 117456895) !== 0) ||
              (((_la - 101) & ~0x1f) === 0 &&
                ((1 << (_la - 101)) & 276824079) !== 0)
            ) {
              {
                this.state = 1377;
                this.forInit();
              }
            }

            this.state = 1380;
            this.match(JavaParser.SEMI);
            this.state = 1382;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
              (((_la - 33) & ~0x1f) === 0 &&
                ((1 << (_la - 33)) & 3130420525) !== 0) ||
              (((_la - 66) & ~0x1f) === 0 &&
                ((1 << (_la - 66)) & 117456895) !== 0) ||
              (((_la - 101) & ~0x1f) === 0 &&
                ((1 << (_la - 101)) & 276824079) !== 0)
            ) {
              {
                this.state = 1381;
                this.expression(0);
              }
            }

            this.state = 1384;
            this.match(JavaParser.SEMI);
            this.state = 1386;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
              (((_la - 33) & ~0x1f) === 0 &&
                ((1 << (_la - 33)) & 3130420525) !== 0) ||
              (((_la - 66) & ~0x1f) === 0 &&
                ((1 << (_la - 66)) & 117456895) !== 0) ||
              (((_la - 101) & ~0x1f) === 0 &&
                ((1 << (_la - 101)) & 276824079) !== 0)
            ) {
              {
                this.state = 1385;
                localctx._forUpdate = this.expressionList();
              }
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public forInit(): ForInitContext {
    let localctx: ForInitContext = new ForInitContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 190, JavaParser.RULE_forInit);
    try {
      this.state = 1392;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 168, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1390;
            this.localVariableDeclaration();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1391;
            this.expressionList();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public enhancedForControl(): EnhancedForControlContext {
    let localctx: EnhancedForControlContext = new EnhancedForControlContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 192, JavaParser.RULE_enhancedForControl);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1397;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 169, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 1394;
                this.variableModifier();
              }
            }
          }
          this.state = 1399;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 169, this._ctx);
        }
        this.state = 1402;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 170, this._ctx)) {
          case 1:
            {
              this.state = 1400;
              this.typeType();
            }
            break;
          case 2:
            {
              this.state = 1401;
              this.match(JavaParser.VAR);
            }
            break;
        }
        this.state = 1404;
        this.variableDeclaratorId();
        this.state = 1405;
        this.match(JavaParser.COLON);
        this.state = 1406;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public expressionList(): ExpressionListContext {
    let localctx: ExpressionListContext = new ExpressionListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 194, JavaParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1408;
        this.expression(0);
        this.state = 1413;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 1409;
              this.match(JavaParser.COMMA);
              this.state = 1410;
              this.expression(0);
            }
          }
          this.state = 1415;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public methodCall(): MethodCallContext {
    let localctx: MethodCallContext = new MethodCallContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 196, JavaParser.RULE_methodCall);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1419;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 17:
          case 31:
          case 35:
          case 36:
          case 38:
          case 41:
          case 43:
          case 44:
          case 46:
          case 56:
          case 58:
          case 60:
          case 61:
          case 64:
          case 66:
          case 67:
          case 129:
            {
              this.state = 1416;
              this.identifier();
            }
            break;
          case 53:
            {
              this.state = 1417;
              this.match(JavaParser.THIS);
            }
            break;
          case 50:
            {
              this.state = 1418;
              this.match(JavaParser.SUPER);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 1421;
        this.arguments();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }

  public expression(): ExpressionContext;
  public expression(_p: number): ExpressionContext;
  // @RuleVersion(0)
  public expression(_p?: number): ExpressionContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let localctx: ExpressionContext = new ExpressionContext(
      this,
      this._ctx,
      _parentState,
    );
    let _prevctx: ExpressionContext = localctx;
    let _startState: number = 198;
    this.enterRecursionRule(localctx, 198, JavaParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1466;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 178, this._ctx)) {
          case 1:
            {
              localctx = new PrimaryExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;

              this.state = 1424;
              this.primary();
            }
            break;
          case 2:
            {
              localctx = new MethodCallExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1425;
              this.methodCall();
            }
            break;
          case 3:
            {
              localctx = new MethodReferenceExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1426;
              this.typeType();
              this.state = 1427;
              this.match(JavaParser.COLONCOLON);
              this.state = 1433;
              this._errHandler.sync(this);
              switch (this._input.LA(1)) {
                case 17:
                case 31:
                case 35:
                case 36:
                case 38:
                case 41:
                case 43:
                case 44:
                case 46:
                case 56:
                case 58:
                case 60:
                case 61:
                case 64:
                case 66:
                case 67:
                case 90:
                case 129:
                  {
                    this.state = 1429;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (_la === 90) {
                      {
                        this.state = 1428;
                        this.typeArguments();
                      }
                    }

                    this.state = 1431;
                    this.identifier();
                  }
                  break;
                case 33:
                  {
                    this.state = 1432;
                    this.match(JavaParser.NEW);
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
            }
            break;
          case 4:
            {
              localctx = new MethodReferenceExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1435;
              this.classType();
              this.state = 1436;
              this.match(JavaParser.COLONCOLON);
              this.state = 1438;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === 90) {
                {
                  this.state = 1437;
                  this.typeArguments();
                }
              }

              this.state = 1440;
              this.match(JavaParser.NEW);
            }
            break;
          case 5:
            {
              localctx = new ExpressionSwitchContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1442;
              this.switchExpression();
            }
            break;
          case 6:
            {
              localctx = new UnaryOperatorExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1443;
              (localctx as UnaryOperatorExpressionContext)._prefix =
                this._input.LT(1);
              _la = this._input.LA(1);
              if (
                !(
                  ((_la - 91) & ~0x1f) === 0 &&
                  ((1 << (_la - 91)) & 15363) !== 0
                )
              ) {
                (localctx as UnaryOperatorExpressionContext)._prefix =
                  this._errHandler.recoverInline(this);
              } else {
                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 1444;
              this.expression(17);
            }
            break;
          case 7:
            {
              localctx = new CastExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1445;
              this.match(JavaParser.LPAREN);
              this.state = 1449;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 176, this._ctx);
              while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                if (_alt === 1) {
                  {
                    {
                      this.state = 1446;
                      this.annotation();
                    }
                  }
                }
                this.state = 1451;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(
                  this._input,
                  176,
                  this._ctx,
                );
              }
              this.state = 1452;
              this.typeType();
              this.state = 1457;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              while (_la === 107) {
                {
                  {
                    this.state = 1453;
                    this.match(JavaParser.BITAND);
                    this.state = 1454;
                    this.typeType();
                  }
                }
                this.state = 1459;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
              }
              this.state = 1460;
              this.match(JavaParser.RPAREN);
              this.state = 1461;
              this.expression(16);
            }
            break;
          case 8:
            {
              localctx = new ObjectCreationExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1463;
              this.match(JavaParser.NEW);
              this.state = 1464;
              this.creator();
            }
            break;
          case 9:
            {
              localctx = new ExpressionLambdaContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 1465;
              this.lambdaExpression();
            }
            break;
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 1551;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 185, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = localctx;
            {
              this.state = 1549;
              this._errHandler.sync(this);
              switch (
                this._interp.adaptivePredict(this._input, 184, this._ctx)
              ) {
                case 1:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1468;
                    if (!this.precpred(this._ctx, 14)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 14)',
                      );
                    }
                    this.state = 1469;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this._input.LT(1);
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 105) & ~0x1f) === 0 &&
                        ((1 << (_la - 105)) & 35) !== 0
                      )
                    ) {
                      (localctx as BinaryOperatorExpressionContext)._bop =
                        this._errHandler.recoverInline(this);
                    } else {
                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 1470;
                    this.expression(15);
                  }
                  break;
                case 2:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1471;
                    if (!this.precpred(this._ctx, 13)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 13)',
                      );
                    }
                    this.state = 1472;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this._input.LT(1);
                    _la = this._input.LA(1);
                    if (!(_la === 103 || _la === 104)) {
                      (localctx as BinaryOperatorExpressionContext)._bop =
                        this._errHandler.recoverInline(this);
                    } else {
                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 1473;
                    this.expression(14);
                  }
                  break;
                case 3:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1474;
                    if (!this.precpred(this._ctx, 12)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 12)',
                      );
                    }
                    this.state = 1482;
                    this._errHandler.sync(this);
                    switch (
                      this._interp.adaptivePredict(this._input, 179, this._ctx)
                    ) {
                      case 1:
                        {
                          this.state = 1475;
                          this.match(JavaParser.LT);
                          this.state = 1476;
                          this.match(JavaParser.LT);
                        }
                        break;
                      case 2:
                        {
                          this.state = 1477;
                          this.match(JavaParser.GT);
                          this.state = 1478;
                          this.match(JavaParser.GT);
                          this.state = 1479;
                          this.match(JavaParser.GT);
                        }
                        break;
                      case 3:
                        {
                          this.state = 1480;
                          this.match(JavaParser.GT);
                          this.state = 1481;
                          this.match(JavaParser.GT);
                        }
                        break;
                    }
                    this.state = 1484;
                    this.expression(13);
                  }
                  break;
                case 4:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1485;
                    if (!this.precpred(this._ctx, 11)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 11)',
                      );
                    }
                    this.state = 1486;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this._input.LT(1);
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 89) & ~0x1f) === 0 &&
                        ((1 << (_la - 89)) & 387) !== 0
                      )
                    ) {
                      (localctx as BinaryOperatorExpressionContext)._bop =
                        this._errHandler.recoverInline(this);
                    } else {
                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 1487;
                    this.expression(12);
                  }
                  break;
                case 5:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1488;
                    if (!this.precpred(this._ctx, 9)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 9)',
                      );
                    }
                    this.state = 1489;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this._input.LT(1);
                    _la = this._input.LA(1);
                    if (!(_la === 95 || _la === 98)) {
                      (localctx as BinaryOperatorExpressionContext)._bop =
                        this._errHandler.recoverInline(this);
                    } else {
                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 1490;
                    this.expression(10);
                  }
                  break;
                case 6:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1491;
                    if (!this.precpred(this._ctx, 8)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 8)',
                      );
                    }
                    this.state = 1492;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this.match(JavaParser.BITAND);
                    this.state = 1493;
                    this.expression(9);
                  }
                  break;
                case 7:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1494;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 7)',
                      );
                    }
                    this.state = 1495;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this.match(JavaParser.CARET);
                    this.state = 1496;
                    this.expression(8);
                  }
                  break;
                case 8:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1497;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 6)',
                      );
                    }
                    this.state = 1498;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this.match(JavaParser.BITOR);
                    this.state = 1499;
                    this.expression(7);
                  }
                  break;
                case 9:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1500;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 5)',
                      );
                    }
                    this.state = 1501;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this.match(JavaParser.AND);
                    this.state = 1502;
                    this.expression(6);
                  }
                  break;
                case 10:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1503;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 4)',
                      );
                    }
                    this.state = 1504;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this.match(JavaParser.OR);
                    this.state = 1505;
                    this.expression(5);
                  }
                  break;
                case 11:
                  {
                    localctx = new TernaryExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1506;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 3)',
                      );
                    }
                    this.state = 1507;
                    (localctx as TernaryExpressionContext)._bop = this.match(
                      JavaParser.QUESTION,
                    );
                    this.state = 1508;
                    this.expression(0);
                    this.state = 1509;
                    this.match(JavaParser.COLON);
                    this.state = 1510;
                    this.expression(3);
                  }
                  break;
                case 12:
                  {
                    localctx = new BinaryOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1512;
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 2)',
                      );
                    }
                    this.state = 1513;
                    (localctx as BinaryOperatorExpressionContext)._bop =
                      this._input.LT(1);
                    _la = this._input.LA(1);
                    if (
                      !(
                        (((_la - 88) & ~0x1f) === 0 &&
                          ((1 << (_la - 88)) & 4286578689) !== 0) ||
                        _la === 120 ||
                        _la === 121
                      )
                    ) {
                      (localctx as BinaryOperatorExpressionContext)._bop =
                        this._errHandler.recoverInline(this);
                    } else {
                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 1514;
                    this.expression(2);
                  }
                  break;
                case 13:
                  {
                    localctx = new SquareBracketExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1515;
                    if (!this.precpred(this._ctx, 25)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 25)',
                      );
                    }
                    this.state = 1516;
                    this.match(JavaParser.LBRACK);
                    this.state = 1517;
                    this.expression(0);
                    this.state = 1518;
                    this.match(JavaParser.RBRACK);
                  }
                  break;
                case 14:
                  {
                    localctx = new MemberReferenceExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1520;
                    if (!this.precpred(this._ctx, 24)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 24)',
                      );
                    }
                    this.state = 1521;
                    (localctx as MemberReferenceExpressionContext)._bop =
                      this.match(JavaParser.DOT);
                    this.state = 1533;
                    this._errHandler.sync(this);
                    switch (
                      this._interp.adaptivePredict(this._input, 181, this._ctx)
                    ) {
                      case 1:
                        {
                          this.state = 1522;
                          this.identifier();
                        }
                        break;
                      case 2:
                        {
                          this.state = 1523;
                          this.methodCall();
                        }
                        break;
                      case 3:
                        {
                          this.state = 1524;
                          this.match(JavaParser.THIS);
                        }
                        break;
                      case 4:
                        {
                          this.state = 1525;
                          this.match(JavaParser.NEW);
                          this.state = 1527;
                          this._errHandler.sync(this);
                          _la = this._input.LA(1);
                          if (_la === 90) {
                            {
                              this.state = 1526;
                              this.nonWildcardTypeArguments();
                            }
                          }

                          this.state = 1529;
                          this.innerCreator();
                        }
                        break;
                      case 5:
                        {
                          this.state = 1530;
                          this.match(JavaParser.SUPER);
                          this.state = 1531;
                          this.superSuffix();
                        }
                        break;
                      case 6:
                        {
                          this.state = 1532;
                          this.explicitGenericInvocation();
                        }
                        break;
                    }
                  }
                  break;
                case 15:
                  {
                    localctx = new MethodReferenceExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1535;
                    if (!this.precpred(this._ctx, 22)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 22)',
                      );
                    }
                    this.state = 1536;
                    this.match(JavaParser.COLONCOLON);
                    this.state = 1538;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (_la === 90) {
                      {
                        this.state = 1537;
                        this.typeArguments();
                      }
                    }

                    this.state = 1540;
                    this.identifier();
                  }
                  break;
                case 16:
                  {
                    localctx =
                      new PostIncrementDecrementOperatorExpressionContext(
                        this,
                        new ExpressionContext(this, _parentctx, _parentState),
                      );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1541;
                    if (!this.precpred(this._ctx, 18)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 18)',
                      );
                    }
                    this.state = 1542;
                    (
                      localctx as PostIncrementDecrementOperatorExpressionContext
                    )._postfix = this._input.LT(1);
                    _la = this._input.LA(1);
                    if (!(_la === 101 || _la === 102)) {
                      (
                        localctx as PostIncrementDecrementOperatorExpressionContext
                      )._postfix = this._errHandler.recoverInline(this);
                    } else {
                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                  }
                  break;
                case 17:
                  {
                    localctx = new InstanceOfOperatorExpressionContext(
                      this,
                      new ExpressionContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      JavaParser.RULE_expression,
                    );
                    this.state = 1543;
                    if (!this.precpred(this._ctx, 10)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 10)',
                      );
                    }
                    this.state = 1544;
                    (localctx as InstanceOfOperatorExpressionContext)._bop =
                      this.match(JavaParser.INSTANCEOF);
                    this.state = 1547;
                    this._errHandler.sync(this);
                    switch (
                      this._interp.adaptivePredict(this._input, 183, this._ctx)
                    ) {
                      case 1:
                        {
                          this.state = 1545;
                          this.typeType();
                        }
                        break;
                      case 2:
                        {
                          this.state = 1546;
                          this.pattern();
                        }
                        break;
                    }
                  }
                  break;
              }
            }
          }
          this.state = 1553;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 185, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return localctx;
  }
  // @RuleVersion(0)
  public pattern(): PatternContext {
    let localctx: PatternContext = new PatternContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 200, JavaParser.RULE_pattern);
    let _la: number;
    try {
      let _alt: number;
      this.state = 1576;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 189, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1557;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 186, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 1554;
                    this.variableModifier();
                  }
                }
              }
              this.state = 1559;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 186, this._ctx);
            }
            this.state = 1560;
            this.typeType();
            this.state = 1564;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 124) {
              {
                {
                  this.state = 1561;
                  this.annotation();
                }
              }
              this.state = 1566;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 1567;
            this.variableDeclarators();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1569;
            this.typeType();
            this.state = 1570;
            this.match(JavaParser.LPAREN);
            this.state = 1572;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 3492430120) !== 0) ||
              (((_la - 35) & ~0x1f) === 0 &&
                ((1 << (_la - 35)) & 2795510603) !== 0) ||
              _la === 67 ||
              _la === 124 ||
              _la === 129
            ) {
              {
                this.state = 1571;
                this.componentPatternList();
              }
            }

            this.state = 1574;
            this.match(JavaParser.RPAREN);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public componentPatternList(): ComponentPatternListContext {
    let localctx: ComponentPatternListContext = new ComponentPatternListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 202, JavaParser.RULE_componentPatternList);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1578;
        this.componentPattern();
        this.state = 1583;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 1579;
              this.match(JavaParser.COMMA);
              this.state = 1580;
              this.componentPattern();
            }
          }
          this.state = 1585;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public componentPattern(): ComponentPatternContext {
    let localctx: ComponentPatternContext = new ComponentPatternContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 204, JavaParser.RULE_componentPattern);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1586;
        this.pattern();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public lambdaExpression(): LambdaExpressionContext {
    let localctx: LambdaExpressionContext = new LambdaExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 206, JavaParser.RULE_lambdaExpression);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1588;
        this.lambdaParameters();
        this.state = 1589;
        this.match(JavaParser.ARROW);
        this.state = 1590;
        this.lambdaBody();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public lambdaParameters(): LambdaParametersContext {
    let localctx: LambdaParametersContext = new LambdaParametersContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 208, JavaParser.RULE_lambdaParameters);
    let _la: number;
    try {
      this.state = 1614;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 194, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1592;
            this.identifier();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1593;
            this.match(JavaParser.LPAREN);
            this.state = 1595;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 3492430120) !== 0) ||
              (((_la - 35) & ~0x1f) === 0 &&
                ((1 << (_la - 35)) & 2795510603) !== 0) ||
              _la === 67 ||
              _la === 124 ||
              _la === 129
            ) {
              {
                this.state = 1594;
                this.formalParameterList();
              }
            }

            this.state = 1597;
            this.match(JavaParser.RPAREN);
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 1598;
            this.match(JavaParser.LPAREN);
            this.state = 1599;
            this.identifier();
            this.state = 1604;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 86) {
              {
                {
                  this.state = 1600;
                  this.match(JavaParser.COMMA);
                  this.state = 1601;
                  this.identifier();
                }
              }
              this.state = 1606;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 1607;
            this.match(JavaParser.RPAREN);
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 1609;
            this.match(JavaParser.LPAREN);
            this.state = 1611;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 19 || _la === 61 || _la === 124) {
              {
                this.state = 1610;
                this.lambdaLVTIList();
              }
            }

            this.state = 1613;
            this.match(JavaParser.RPAREN);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public lambdaBody(): LambdaBodyContext {
    let localctx: LambdaBodyContext = new LambdaBodyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 210, JavaParser.RULE_lambdaBody);
    try {
      this.state = 1618;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 3:
        case 5:
        case 8:
        case 14:
        case 17:
        case 21:
        case 28:
        case 30:
        case 31:
        case 33:
        case 35:
        case 36:
        case 38:
        case 41:
        case 43:
        case 44:
        case 46:
        case 47:
        case 50:
        case 51:
        case 53:
        case 56:
        case 58:
        case 60:
        case 61:
        case 62:
        case 64:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 90:
        case 91:
        case 92:
        case 101:
        case 102:
        case 103:
        case 104:
        case 124:
        case 129:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1616;
            this.expression(0);
          }
          break;
        case 81:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1617;
            this.block();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public primary(): PrimaryContext {
    let localctx: PrimaryContext = new PrimaryContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 212, JavaParser.RULE_primary);
    try {
      this.state = 1638;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 197, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1620;
            this.match(JavaParser.LPAREN);
            this.state = 1621;
            this.expression(0);
            this.state = 1622;
            this.match(JavaParser.RPAREN);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1624;
            this.match(JavaParser.THIS);
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 1625;
            this.match(JavaParser.SUPER);
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 1626;
            this.literal();
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 1627;
            this.identifier();
          }
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          {
            this.state = 1628;
            this.typeTypeOrVoid();
            this.state = 1629;
            this.match(JavaParser.DOT);
            this.state = 1630;
            this.match(JavaParser.CLASS);
          }
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          {
            this.state = 1632;
            this.nonWildcardTypeArguments();
            this.state = 1636;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case 17:
              case 31:
              case 35:
              case 36:
              case 38:
              case 41:
              case 43:
              case 44:
              case 46:
              case 50:
              case 56:
              case 58:
              case 60:
              case 61:
              case 64:
              case 66:
              case 67:
              case 129:
                {
                  this.state = 1633;
                  this.explicitGenericInvocationSuffix();
                }
                break;
              case 53:
                {
                  this.state = 1634;
                  this.match(JavaParser.THIS);
                  this.state = 1635;
                  this.arguments();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public switchExpression(): SwitchExpressionContext {
    let localctx: SwitchExpressionContext = new SwitchExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 214, JavaParser.RULE_switchExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1640;
        this.match(JavaParser.SWITCH);
        this.state = 1641;
        this.match(JavaParser.LPAREN);
        this.state = 1642;
        this.expression(0);
        this.state = 1643;
        this.match(JavaParser.RPAREN);
        this.state = 1644;
        this.match(JavaParser.LBRACE);
        this.state = 1648;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 6 || _la === 12) {
          {
            {
              this.state = 1645;
              this.switchLabeledRule();
            }
          }
          this.state = 1650;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1651;
        this.match(JavaParser.RBRACE);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public switchLabeledRule(): SwitchLabeledRuleContext {
    let localctx: SwitchLabeledRuleContext = new SwitchLabeledRuleContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 216, JavaParser.RULE_switchLabeledRule);
    let _la: number;
    try {
      this.state = 1678;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 6:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1653;
            this.match(JavaParser.CASE);
            this.state = 1671;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 202, this._ctx)) {
              case 1:
                {
                  this.state = 1654;
                  this.expressionList();
                }
                break;
              case 2:
                {
                  this.state = 1655;
                  this.match(JavaParser.NULL_LITERAL);
                  this.state = 1658;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  if (_la === 86) {
                    {
                      this.state = 1656;
                      this.match(JavaParser.COMMA);
                      this.state = 1657;
                      this.match(JavaParser.DEFAULT);
                    }
                  }
                }
                break;
              case 3:
                {
                  this.state = 1660;
                  this.casePattern();
                  this.state = 1665;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  while (_la === 86) {
                    {
                      {
                        this.state = 1661;
                        this.match(JavaParser.COMMA);
                        this.state = 1662;
                        this.casePattern();
                      }
                    }
                    this.state = 1667;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                  }
                  this.state = 1669;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  if (_la === 64) {
                    {
                      this.state = 1668;
                      this.guard();
                    }
                  }
                }
                break;
            }
            this.state = 1673;
            _la = this._input.LA(1);
            if (!(_la === 94 || _la === 122)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 1674;
            this.switchRuleOutcome();
          }
          break;
        case 12:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1675;
            this.match(JavaParser.DEFAULT);
            this.state = 1676;
            _la = this._input.LA(1);
            if (!(_la === 94 || _la === 122)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 1677;
            this.switchRuleOutcome();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public guard(): GuardContext {
    let localctx: GuardContext = new GuardContext(this, this._ctx, this.state);
    this.enterRule(localctx, 218, JavaParser.RULE_guard);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1680;
        this.match(JavaParser.WHEN);
        this.state = 1681;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public casePattern(): CasePatternContext {
    let localctx: CasePatternContext = new CasePatternContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 220, JavaParser.RULE_casePattern);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1683;
        this.pattern();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public switchRuleOutcome(): SwitchRuleOutcomeContext {
    let localctx: SwitchRuleOutcomeContext = new SwitchRuleOutcomeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 222, JavaParser.RULE_switchRuleOutcome);
    let _la: number;
    try {
      this.state = 1692;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 205, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1685;
            this.block();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1689;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 4050348862) !== 0) ||
              (((_la - 33) & ~0x1f) === 0 &&
                ((1 << (_la - 33)) & 3200253935) !== 0) ||
              (((_la - 65) & ~0x1f) === 0 &&
                ((1 << (_la - 65)) & 236027903) !== 0) ||
              (((_la - 101) & ~0x1f) === 0 &&
                ((1 << (_la - 101)) & 276824079) !== 0)
            ) {
              {
                {
                  this.state = 1686;
                  this.blockStatement();
                }
              }
              this.state = 1691;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public classOrInterfaceType(): ClassOrInterfaceTypeContext {
    let localctx: ClassOrInterfaceTypeContext = new ClassOrInterfaceTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 224, JavaParser.RULE_classOrInterfaceType);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1694;
        this.classType();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public creator(): CreatorContext {
    let localctx: CreatorContext = new CreatorContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 226, JavaParser.RULE_creator);
    let _la: number;
    try {
      this.state = 1705;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 207, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1697;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 90) {
              {
                this.state = 1696;
                this.nonWildcardTypeArguments();
              }
            }

            this.state = 1699;
            this.createdName();
            this.state = 1700;
            this.classCreatorRest();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1702;
            this.createdName();
            this.state = 1703;
            this.arrayCreatorRest();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public createdName(): CreatedNameContext {
    let localctx: CreatedNameContext = new CreatedNameContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 228, JavaParser.RULE_createdName);
    let _la: number;
    try {
      this.state = 1722;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 17:
        case 31:
        case 35:
        case 36:
        case 38:
        case 41:
        case 43:
        case 44:
        case 46:
        case 56:
        case 58:
        case 60:
        case 61:
        case 64:
        case 66:
        case 67:
        case 129:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1707;
            this.identifier();
            this.state = 1709;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 90) {
              {
                this.state = 1708;
                this.typeArgumentsOrDiamond();
              }
            }

            this.state = 1718;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 87) {
              {
                {
                  this.state = 1711;
                  this.match(JavaParser.DOT);
                  this.state = 1712;
                  this.identifier();
                  this.state = 1714;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  if (_la === 90) {
                    {
                      this.state = 1713;
                      this.typeArgumentsOrDiamond();
                    }
                  }
                }
              }
              this.state = 1720;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
        case 3:
        case 5:
        case 8:
        case 14:
        case 21:
        case 28:
        case 30:
        case 47:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1721;
            this.primitiveType();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public innerCreator(): InnerCreatorContext {
    let localctx: InnerCreatorContext = new InnerCreatorContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 230, JavaParser.RULE_innerCreator);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1724;
        this.identifier();
        this.state = 1726;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 90) {
          {
            this.state = 1725;
            this.nonWildcardTypeArgumentsOrDiamond();
          }
        }

        this.state = 1728;
        this.classCreatorRest();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public arrayCreatorRest(): ArrayCreatorRestContext {
    let localctx: ArrayCreatorRestContext = new ArrayCreatorRestContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 232, JavaParser.RULE_arrayCreatorRest);
    let _la: number;
    try {
      let _alt: number;
      this.state = 1752;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 216, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1732;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 1730;
                  this.match(JavaParser.LBRACK);
                  this.state = 1731;
                  this.match(JavaParser.RBRACK);
                }
              }
              this.state = 1734;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === 83);
            this.state = 1736;
            this.arrayInitializer();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1741;
            this._errHandler.sync(this);
            _alt = 1;
            do {
              switch (_alt) {
                case 1:
                  {
                    {
                      this.state = 1737;
                      this.match(JavaParser.LBRACK);
                      this.state = 1738;
                      this.expression(0);
                      this.state = 1739;
                      this.match(JavaParser.RBRACK);
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 1743;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 214, this._ctx);
            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            this.state = 1749;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 215, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 1745;
                    this.match(JavaParser.LBRACK);
                    this.state = 1746;
                    this.match(JavaParser.RBRACK);
                  }
                }
              }
              this.state = 1751;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 215, this._ctx);
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public classCreatorRest(): ClassCreatorRestContext {
    let localctx: ClassCreatorRestContext = new ClassCreatorRestContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 234, JavaParser.RULE_classCreatorRest);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1754;
        this.arguments();
        this.state = 1756;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 217, this._ctx)) {
          case 1:
            {
              this.state = 1755;
              this.classBody();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public explicitGenericInvocation(): ExplicitGenericInvocationContext {
    let localctx: ExplicitGenericInvocationContext =
      new ExplicitGenericInvocationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 236, JavaParser.RULE_explicitGenericInvocation);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1758;
        this.nonWildcardTypeArguments();
        this.state = 1759;
        this.explicitGenericInvocationSuffix();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext {
    let localctx: TypeArgumentsOrDiamondContext =
      new TypeArgumentsOrDiamondContext(this, this._ctx, this.state);
    this.enterRule(localctx, 238, JavaParser.RULE_typeArgumentsOrDiamond);
    try {
      this.state = 1764;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 218, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1761;
            this.match(JavaParser.LT);
            this.state = 1762;
            this.match(JavaParser.GT);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1763;
            this.typeArguments();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public nonWildcardTypeArgumentsOrDiamond(): NonWildcardTypeArgumentsOrDiamondContext {
    let localctx: NonWildcardTypeArgumentsOrDiamondContext =
      new NonWildcardTypeArgumentsOrDiamondContext(this, this._ctx, this.state);
    this.enterRule(
      localctx,
      240,
      JavaParser.RULE_nonWildcardTypeArgumentsOrDiamond,
    );
    try {
      this.state = 1769;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 219, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1766;
            this.match(JavaParser.LT);
            this.state = 1767;
            this.match(JavaParser.GT);
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1768;
            this.nonWildcardTypeArguments();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
    let localctx: NonWildcardTypeArgumentsContext =
      new NonWildcardTypeArgumentsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 242, JavaParser.RULE_nonWildcardTypeArguments);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1771;
        this.match(JavaParser.LT);
        this.state = 1772;
        this.typeList();
        this.state = 1773;
        this.match(JavaParser.GT);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeList(): TypeListContext {
    let localctx: TypeListContext = new TypeListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 244, JavaParser.RULE_typeList);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1775;
        this.typeType();
        this.state = 1780;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 1776;
              this.match(JavaParser.COMMA);
              this.state = 1777;
              this.typeType();
            }
          }
          this.state = 1782;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeType(): TypeTypeContext {
    let localctx: TypeTypeContext = new TypeTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 246, JavaParser.RULE_typeType);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1786;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 124) {
          {
            {
              this.state = 1783;
              this.annotation();
            }
          }
          this.state = 1788;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1791;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 17:
          case 31:
          case 35:
          case 36:
          case 38:
          case 41:
          case 43:
          case 44:
          case 46:
          case 56:
          case 58:
          case 60:
          case 61:
          case 64:
          case 66:
          case 67:
          case 129:
            {
              this.state = 1789;
              this.classOrInterfaceType();
            }
            break;
          case 3:
          case 5:
          case 8:
          case 14:
          case 21:
          case 28:
          case 30:
          case 47:
            {
              this.state = 1790;
              this.primitiveType();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 1803;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 224, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 1796;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 124) {
                  {
                    {
                      this.state = 1793;
                      this.annotation();
                    }
                  }
                  this.state = 1798;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                }
                this.state = 1799;
                this.match(JavaParser.LBRACK);
                this.state = 1800;
                this.match(JavaParser.RBRACK);
              }
            }
          }
          this.state = 1805;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 224, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public primitiveType(): PrimitiveTypeContext {
    let localctx: PrimitiveTypeContext = new PrimitiveTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 248, JavaParser.RULE_primitiveType);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1806;
        _la = this._input.LA(1);
        if (
          !(
            ((_la & ~0x1f) === 0 && ((1 << _la) & 1344291112) !== 0) ||
            _la === 47
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public typeArguments(): TypeArgumentsContext {
    let localctx: TypeArgumentsContext = new TypeArgumentsContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 250, JavaParser.RULE_typeArguments);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1808;
        this.match(JavaParser.LT);
        this.state = 1809;
        this.typeArgument();
        this.state = 1814;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 86) {
          {
            {
              this.state = 1810;
              this.match(JavaParser.COMMA);
              this.state = 1811;
              this.typeArgument();
            }
          }
          this.state = 1816;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 1817;
        this.match(JavaParser.GT);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public superSuffix(): SuperSuffixContext {
    let localctx: SuperSuffixContext = new SuperSuffixContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 252, JavaParser.RULE_superSuffix);
    let _la: number;
    try {
      this.state = 1828;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 79:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1819;
            this.arguments();
          }
          break;
        case 87:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1820;
            this.match(JavaParser.DOT);
            this.state = 1822;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 90) {
              {
                this.state = 1821;
                this.typeArguments();
              }
            }

            this.state = 1824;
            this.identifier();
            this.state = 1826;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 227, this._ctx)) {
              case 1:
                {
                  this.state = 1825;
                  this.arguments();
                }
                break;
            }
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext {
    let localctx: ExplicitGenericInvocationSuffixContext =
      new ExplicitGenericInvocationSuffixContext(this, this._ctx, this.state);
    this.enterRule(
      localctx,
      254,
      JavaParser.RULE_explicitGenericInvocationSuffix,
    );
    try {
      this.state = 1835;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 50:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 1830;
            this.match(JavaParser.SUPER);
            this.state = 1831;
            this.superSuffix();
          }
          break;
        case 17:
        case 31:
        case 35:
        case 36:
        case 38:
        case 41:
        case 43:
        case 44:
        case 46:
        case 56:
        case 58:
        case 60:
        case 61:
        case 64:
        case 66:
        case 67:
        case 129:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 1832;
            this.identifier();
            this.state = 1833;
            this.arguments();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public arguments(): ArgumentsContext {
    let localctx: ArgumentsContext = new ArgumentsContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 256, JavaParser.RULE_arguments);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 1837;
        this.match(JavaParser.LPAREN);
        this.state = 1839;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3491905832) !== 0) ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) & 3130420525) !== 0) ||
          (((_la - 66) & ~0x1f) === 0 &&
            ((1 << (_la - 66)) & 117456895) !== 0) ||
          (((_la - 101) & ~0x1f) === 0 &&
            ((1 << (_la - 101)) & 276824079) !== 0)
        ) {
          {
            this.state = 1838;
            this.expressionList();
          }
        }

        this.state = 1841;
        this.match(JavaParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }

  public sempred(
    localctx: RuleContext,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 59:
        return this.annotationFieldValue_sempred(
          localctx as AnnotationFieldValueContext,
          predIndex,
        );
      case 76:
        return this.recordComponentList_sempred(
          localctx as RecordComponentListContext,
          predIndex,
        );
      case 99:
        return this.expression_sempred(
          localctx as ExpressionContext,
          predIndex,
        );
    }
    return true;
  }
  private annotationFieldValue_sempred(
    localctx: AnnotationFieldValueContext,
    predIndex: number,
  ): boolean {
    switch (predIndex) {
      case 0:
        return this.IsNotIdentifierAssign();
    }
    return true;
  }
  private recordComponentList_sempred(
    localctx: RecordComponentListContext,
    predIndex: number,
  ): boolean {
    switch (predIndex) {
      case 1:
        return this.DoLastRecordComponent();
    }
    return true;
  }
  private expression_sempred(
    localctx: ExpressionContext,
    predIndex: number,
  ): boolean {
    switch (predIndex) {
      case 2:
        return this.precpred(this._ctx, 14);
      case 3:
        return this.precpred(this._ctx, 13);
      case 4:
        return this.precpred(this._ctx, 12);
      case 5:
        return this.precpred(this._ctx, 11);
      case 6:
        return this.precpred(this._ctx, 9);
      case 7:
        return this.precpred(this._ctx, 8);
      case 8:
        return this.precpred(this._ctx, 7);
      case 9:
        return this.precpred(this._ctx, 6);
      case 10:
        return this.precpred(this._ctx, 5);
      case 11:
        return this.precpred(this._ctx, 4);
      case 12:
        return this.precpred(this._ctx, 3);
      case 13:
        return this.precpred(this._ctx, 2);
      case 14:
        return this.precpred(this._ctx, 25);
      case 15:
        return this.precpred(this._ctx, 24);
      case 16:
        return this.precpred(this._ctx, 22);
      case 17:
        return this.precpred(this._ctx, 18);
      case 18:
        return this.precpred(this._ctx, 10);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 129, 1844, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4,
    2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2,
    11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7,
    16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7, 21, 2,
    22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2, 27, 7,
    27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7, 32, 2,
    33, 7, 33, 2, 34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7,
    38, 2, 39, 7, 39, 2, 40, 7, 40, 2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2,
    44, 7, 44, 2, 45, 7, 45, 2, 46, 7, 46, 2, 47, 7, 47, 2, 48, 7, 48, 2, 49, 7,
    49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7, 52, 2, 53, 7, 53, 2, 54, 7, 54, 2,
    55, 7, 55, 2, 56, 7, 56, 2, 57, 7, 57, 2, 58, 7, 58, 2, 59, 7, 59, 2, 60, 7,
    60, 2, 61, 7, 61, 2, 62, 7, 62, 2, 63, 7, 63, 2, 64, 7, 64, 2, 65, 7, 65, 2,
    66, 7, 66, 2, 67, 7, 67, 2, 68, 7, 68, 2, 69, 7, 69, 2, 70, 7, 70, 2, 71, 7,
    71, 2, 72, 7, 72, 2, 73, 7, 73, 2, 74, 7, 74, 2, 75, 7, 75, 2, 76, 7, 76, 2,
    77, 7, 77, 2, 78, 7, 78, 2, 79, 7, 79, 2, 80, 7, 80, 2, 81, 7, 81, 2, 82, 7,
    82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 2, 86, 7, 86, 2, 87, 7, 87, 2,
    88, 7, 88, 2, 89, 7, 89, 2, 90, 7, 90, 2, 91, 7, 91, 2, 92, 7, 92, 2, 93, 7,
    93, 2, 94, 7, 94, 2, 95, 7, 95, 2, 96, 7, 96, 2, 97, 7, 97, 2, 98, 7, 98, 2,
    99, 7, 99, 2, 100, 7, 100, 2, 101, 7, 101, 2, 102, 7, 102, 2, 103, 7, 103,
    2, 104, 7, 104, 2, 105, 7, 105, 2, 106, 7, 106, 2, 107, 7, 107, 2, 108, 7,
    108, 2, 109, 7, 109, 2, 110, 7, 110, 2, 111, 7, 111, 2, 112, 7, 112, 2, 113,
    7, 113, 2, 114, 7, 114, 2, 115, 7, 115, 2, 116, 7, 116, 2, 117, 7, 117, 2,
    118, 7, 118, 2, 119, 7, 119, 2, 120, 7, 120, 2, 121, 7, 121, 2, 122, 7, 122,
    2, 123, 7, 123, 2, 124, 7, 124, 2, 125, 7, 125, 2, 126, 7, 126, 2, 127, 7,
    127, 2, 128, 7, 128, 1, 0, 3, 0, 260, 8, 0, 1, 0, 1, 0, 5, 0, 264, 8, 0, 10,
    0, 12, 0, 267, 9, 0, 1, 0, 1, 0, 5, 0, 271, 8, 0, 10, 0, 12, 0, 274, 9, 0,
    1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 280, 8, 0, 1, 1, 5, 1, 283, 8, 1, 10, 1, 12,
    1, 286, 9, 1, 1, 1, 1, 1, 1, 2, 5, 2, 291, 8, 2, 10, 2, 12, 2, 294, 9, 2, 1,
    2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 3, 3, 3, 302, 8, 3, 1, 3, 1, 3, 1, 3, 3, 3,
    307, 8, 3, 1, 3, 1, 3, 1, 4, 5, 4, 312, 8, 4, 10, 4, 12, 4, 315, 9, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 1, 4, 3, 4, 322, 8, 4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5,
    329, 8, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6,
    341, 8, 6, 1, 7, 1, 7, 3, 7, 345, 8, 7, 1, 8, 1, 8, 1, 8, 3, 8, 350, 8, 8,
    1, 8, 1, 8, 3, 8, 354, 8, 8, 1, 8, 1, 8, 3, 8, 358, 8, 8, 1, 8, 1, 8, 3, 8,
    362, 8, 8, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 1, 9, 5, 9, 370, 8, 9, 10, 9, 12,
    9, 373, 9, 9, 1, 9, 1, 9, 1, 10, 5, 10, 378, 8, 10, 10, 10, 12, 10, 381, 9,
    10, 1, 10, 1, 10, 1, 10, 5, 10, 386, 8, 10, 10, 10, 12, 10, 389, 9, 10, 1,
    10, 3, 10, 392, 8, 10, 1, 11, 1, 11, 1, 11, 5, 11, 397, 8, 11, 10, 11, 12,
    11, 400, 9, 11, 1, 12, 1, 12, 1, 12, 1, 12, 3, 12, 406, 8, 12, 1, 12, 1, 12,
    3, 12, 410, 8, 12, 1, 12, 3, 12, 413, 8, 12, 1, 12, 3, 12, 416, 8, 12, 1,
    12, 1, 12, 1, 13, 1, 13, 1, 13, 5, 13, 423, 8, 13, 10, 13, 12, 13, 426, 9,
    13, 1, 14, 5, 14, 429, 8, 14, 10, 14, 12, 14, 432, 9, 14, 1, 14, 1, 14, 3,
    14, 436, 8, 14, 1, 14, 3, 14, 439, 8, 14, 1, 15, 1, 15, 5, 15, 443, 8, 15,
    10, 15, 12, 15, 446, 9, 15, 1, 16, 1, 16, 1, 16, 3, 16, 451, 8, 16, 1, 16,
    1, 16, 3, 16, 455, 8, 16, 1, 16, 1, 16, 3, 16, 459, 8, 16, 1, 16, 1, 16, 1,
    17, 1, 17, 5, 17, 465, 8, 17, 10, 17, 12, 17, 468, 9, 17, 1, 17, 1, 17, 1,
    18, 1, 18, 5, 18, 474, 8, 18, 10, 18, 12, 18, 477, 9, 18, 1, 18, 1, 18, 1,
    19, 1, 19, 3, 19, 483, 8, 19, 1, 19, 1, 19, 5, 19, 487, 8, 19, 10, 19, 12,
    19, 490, 9, 19, 1, 19, 3, 19, 493, 8, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1, 20,
    1, 20, 1, 20, 1, 20, 1, 20, 1, 20, 3, 20, 505, 8, 20, 1, 21, 1, 21, 1, 21,
    1, 21, 1, 21, 5, 21, 512, 8, 21, 10, 21, 12, 21, 515, 9, 21, 1, 21, 1, 21,
    3, 21, 519, 8, 21, 1, 21, 1, 21, 1, 22, 1, 22, 3, 22, 525, 8, 22, 1, 23, 1,
    23, 3, 23, 529, 8, 23, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 26, 1,
    26, 1, 26, 1, 26, 3, 26, 541, 8, 26, 1, 26, 1, 26, 1, 27, 5, 27, 546, 8, 27,
    10, 27, 12, 27, 549, 9, 27, 1, 27, 1, 27, 1, 27, 1, 28, 1, 28, 1, 28, 1, 28,
    1, 29, 5, 29, 559, 8, 29, 10, 29, 12, 29, 562, 9, 29, 1, 29, 1, 29, 3, 29,
    566, 8, 29, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 1, 30, 3, 30,
    576, 8, 30, 1, 31, 1, 31, 1, 31, 1, 31, 5, 31, 582, 8, 31, 10, 31, 12, 31,
    585, 9, 31, 1, 31, 1, 31, 1, 32, 1, 32, 1, 32, 5, 32, 592, 8, 32, 10, 32,
    12, 32, 595, 9, 32, 1, 32, 1, 32, 1, 32, 1, 33, 5, 33, 601, 8, 33, 10, 33,
    12, 33, 604, 9, 33, 1, 33, 1, 33, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34, 1, 34,
    3, 34, 614, 8, 34, 1, 35, 5, 35, 617, 8, 35, 10, 35, 12, 35, 620, 9, 35, 1,
    35, 1, 35, 1, 35, 1, 36, 5, 36, 626, 8, 36, 10, 36, 12, 36, 629, 9, 36, 1,
    36, 1, 36, 1, 36, 1, 36, 1, 36, 5, 36, 636, 8, 36, 10, 36, 12, 36, 639, 9,
    36, 1, 36, 1, 36, 3, 36, 643, 8, 36, 1, 36, 1, 36, 1, 37, 1, 37, 1, 37, 5,
    37, 650, 8, 37, 10, 37, 12, 37, 653, 9, 37, 1, 38, 1, 38, 1, 38, 3, 38, 658,
    8, 38, 1, 39, 1, 39, 1, 39, 5, 39, 663, 8, 39, 10, 39, 12, 39, 666, 9, 39,
    1, 40, 1, 40, 3, 40, 670, 8, 40, 1, 41, 1, 41, 1, 41, 1, 41, 5, 41, 676, 8,
    41, 10, 41, 12, 41, 679, 9, 41, 1, 41, 3, 41, 682, 8, 41, 3, 41, 684, 8, 41,
    1, 41, 1, 41, 1, 42, 1, 42, 1, 42, 5, 42, 691, 8, 42, 10, 42, 12, 42, 694,
    9, 42, 3, 42, 696, 8, 42, 1, 42, 1, 42, 3, 42, 700, 8, 42, 4, 42, 702, 8,
    42, 11, 42, 12, 42, 703, 1, 42, 1, 42, 5, 42, 708, 8, 42, 10, 42, 12, 42,
    711, 9, 42, 1, 42, 1, 42, 3, 42, 715, 8, 42, 5, 42, 717, 8, 42, 10, 42, 12,
    42, 720, 9, 42, 1, 43, 1, 43, 1, 43, 5, 43, 725, 8, 43, 10, 43, 12, 43, 728,
    9, 43, 1, 44, 1, 44, 5, 44, 732, 8, 44, 10, 44, 12, 44, 735, 9, 44, 1, 44,
    1, 44, 1, 44, 3, 44, 740, 8, 44, 3, 44, 742, 8, 44, 1, 45, 1, 45, 1, 45, 5,
    45, 747, 8, 45, 10, 45, 12, 45, 750, 9, 45, 1, 46, 1, 46, 1, 46, 3, 46, 755,
    8, 46, 1, 46, 1, 46, 5, 46, 759, 8, 46, 10, 46, 12, 46, 762, 9, 46, 3, 46,
    764, 8, 46, 1, 46, 1, 46, 1, 47, 1, 47, 1, 47, 1, 47, 5, 47, 772, 8, 47, 10,
    47, 12, 47, 775, 9, 47, 1, 47, 1, 47, 1, 48, 1, 48, 1, 48, 5, 48, 782, 8,
    48, 10, 48, 12, 48, 785, 9, 48, 1, 49, 5, 49, 788, 8, 49, 10, 49, 12, 49,
    791, 9, 49, 1, 49, 1, 49, 5, 49, 795, 8, 49, 10, 49, 12, 49, 798, 9, 49, 1,
    49, 3, 49, 801, 8, 49, 1, 49, 1, 49, 1, 50, 1, 50, 1, 50, 5, 50, 808, 8, 50,
    10, 50, 12, 50, 811, 9, 50, 1, 51, 5, 51, 814, 8, 51, 10, 51, 12, 51, 817,
    9, 51, 1, 51, 1, 51, 1, 51, 1, 52, 1, 52, 1, 52, 5, 52, 825, 8, 52, 10, 52,
    12, 52, 828, 9, 52, 1, 53, 1, 53, 1, 53, 1, 53, 1, 53, 1, 53, 1, 53, 3, 53,
    837, 8, 53, 1, 54, 1, 54, 1, 55, 1, 55, 1, 56, 1, 56, 1, 56, 5, 56, 846, 8,
    56, 10, 56, 12, 56, 849, 9, 56, 1, 56, 1, 56, 1, 56, 1, 57, 1, 57, 1, 57, 1,
    57, 3, 57, 858, 8, 57, 1, 58, 1, 58, 1, 58, 1, 58, 5, 58, 864, 8, 58, 10,
    58, 12, 58, 867, 9, 58, 3, 58, 869, 8, 58, 1, 58, 1, 58, 1, 59, 1, 59, 1,
    59, 1, 59, 1, 59, 1, 59, 3, 59, 879, 8, 59, 1, 60, 1, 60, 1, 60, 1, 60, 1,
    60, 1, 60, 5, 60, 887, 8, 60, 10, 60, 12, 60, 890, 9, 60, 3, 60, 892, 8, 60,
    1, 60, 3, 60, 895, 8, 60, 1, 60, 3, 60, 898, 8, 60, 1, 61, 1, 61, 1, 61, 3,
    61, 903, 8, 61, 1, 62, 1, 62, 1, 62, 1, 62, 5, 62, 909, 8, 62, 10, 62, 12,
    62, 912, 9, 62, 3, 62, 914, 8, 62, 1, 62, 3, 62, 917, 8, 62, 1, 62, 1, 62,
    1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 64, 1, 64, 5, 64, 928, 8, 64, 10, 64,
    12, 64, 931, 9, 64, 1, 64, 1, 64, 1, 65, 5, 65, 936, 8, 65, 10, 65, 12, 65,
    939, 9, 65, 1, 65, 1, 65, 3, 65, 943, 8, 65, 1, 66, 1, 66, 1, 66, 1, 66, 1,
    66, 1, 66, 3, 66, 951, 8, 66, 1, 66, 1, 66, 3, 66, 955, 8, 66, 1, 66, 1, 66,
    3, 66, 959, 8, 66, 1, 66, 1, 66, 3, 66, 963, 8, 66, 1, 66, 1, 66, 3, 66,
    967, 8, 66, 3, 66, 969, 8, 66, 1, 67, 1, 67, 3, 67, 973, 8, 67, 1, 68, 1,
    68, 1, 68, 1, 68, 3, 68, 979, 8, 68, 1, 69, 1, 69, 1, 70, 1, 70, 1, 70, 1,
    71, 5, 71, 987, 8, 71, 10, 71, 12, 71, 990, 9, 71, 1, 71, 3, 71, 993, 8, 71,
    1, 71, 1, 71, 1, 71, 1, 71, 5, 71, 999, 8, 71, 10, 71, 12, 71, 1002, 9, 71,
    1, 71, 1, 71, 1, 72, 1, 72, 5, 72, 1008, 8, 72, 10, 72, 12, 72, 1011, 9, 72,
    1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 5, 72, 1022,
    8, 72, 10, 72, 12, 72, 1025, 9, 72, 3, 72, 1027, 8, 72, 1, 72, 1, 72, 1, 72,
    1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 5, 72, 1037, 8, 72, 10, 72, 12, 72, 1040,
    9, 72, 3, 72, 1042, 8, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72,
    1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 5, 72, 1056, 8, 72, 10, 72, 12, 72, 1059,
    9, 72, 1, 72, 1, 72, 3, 72, 1063, 8, 72, 1, 73, 1, 73, 1, 74, 1, 74, 1, 74,
    3, 74, 1070, 8, 74, 1, 74, 1, 74, 1, 74, 3, 74, 1075, 8, 74, 1, 74, 1, 74,
    1, 75, 1, 75, 3, 75, 1081, 8, 75, 1, 75, 1, 75, 1, 76, 1, 76, 1, 76, 5, 76,
    1088, 8, 76, 10, 76, 12, 76, 1091, 9, 76, 1, 76, 1, 76, 1, 77, 5, 77, 1096,
    8, 77, 10, 77, 12, 77, 1099, 9, 77, 1, 77, 1, 77, 5, 77, 1103, 8, 77, 10,
    77, 12, 77, 1106, 9, 77, 1, 77, 3, 77, 1109, 8, 77, 1, 77, 1, 77, 1, 78, 1,
    78, 1, 78, 5, 78, 1116, 8, 78, 10, 78, 12, 78, 1119, 9, 78, 1, 78, 1, 78, 1,
    79, 1, 79, 5, 79, 1125, 8, 79, 10, 79, 12, 79, 1128, 9, 79, 1, 79, 1, 79, 1,
    80, 1, 80, 1, 80, 1, 80, 1, 80, 3, 80, 1137, 8, 80, 1, 81, 5, 81, 1140, 8,
    81, 10, 81, 12, 81, 1143, 9, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81, 1, 81,
    1, 81, 1, 81, 3, 81, 1153, 8, 81, 1, 82, 1, 82, 1, 83, 1, 83, 1, 84, 5, 84,
    1160, 8, 84, 10, 84, 12, 84, 1163, 9, 84, 1, 84, 1, 84, 1, 84, 1, 84, 3, 84,
    1169, 8, 84, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 3, 85, 1176, 8, 85, 1, 85,
    1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 3, 85, 1187, 8, 85,
    1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85,
    1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85,
    1, 85, 4, 85, 1212, 8, 85, 11, 85, 12, 85, 1213, 1, 85, 3, 85, 1217, 8, 85,
    1, 85, 3, 85, 1220, 8, 85, 1, 85, 1, 85, 1, 85, 1, 85, 5, 85, 1226, 8, 85,
    10, 85, 12, 85, 1229, 9, 85, 1, 85, 3, 85, 1232, 8, 85, 1, 85, 1, 85, 1, 85,
    1, 85, 1, 85, 1, 85, 5, 85, 1240, 8, 85, 10, 85, 12, 85, 1243, 9, 85, 1, 85,
    5, 85, 1246, 8, 85, 10, 85, 12, 85, 1249, 9, 85, 1, 85, 1, 85, 1, 85, 1, 85,
    1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 3, 85, 1261, 8, 85, 1, 85, 1, 85,
    1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 3, 85, 1270, 8, 85, 1, 85, 1, 85, 1, 85,
    3, 85, 1275, 8, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85, 1, 85,
    1, 85, 1, 85, 1, 85, 3, 85, 1288, 8, 85, 1, 85, 1, 85, 1, 85, 1, 85, 3, 85,
    1294, 8, 85, 1, 86, 1, 86, 1, 86, 5, 86, 1299, 8, 86, 10, 86, 12, 86, 1302,
    9, 86, 1, 86, 1, 86, 1, 86, 1, 86, 1, 86, 1, 87, 1, 87, 1, 87, 5, 87, 1312,
    8, 87, 10, 87, 12, 87, 1315, 9, 87, 1, 88, 1, 88, 1, 88, 1, 89, 1, 89, 1,
    89, 3, 89, 1323, 8, 89, 1, 89, 1, 89, 1, 90, 1, 90, 1, 90, 5, 90, 1330, 8,
    90, 10, 90, 12, 90, 1333, 9, 90, 1, 91, 5, 91, 1336, 8, 91, 10, 91, 12, 91,
    1339, 9, 91, 1, 91, 1, 91, 1, 91, 1, 91, 1, 91, 3, 91, 1346, 8, 91, 1, 91,
    1, 91, 1, 91, 1, 91, 3, 91, 1352, 8, 91, 1, 92, 1, 92, 1, 92, 4, 92, 1357,
    8, 92, 11, 92, 12, 92, 1358, 1, 92, 4, 92, 1362, 8, 92, 11, 92, 12, 92,
    1363, 1, 93, 1, 93, 1, 93, 1, 93, 1, 93, 1, 93, 3, 93, 1372, 8, 93, 1, 93,
    3, 93, 1375, 8, 93, 1, 94, 1, 94, 3, 94, 1379, 8, 94, 1, 94, 1, 94, 3, 94,
    1383, 8, 94, 1, 94, 1, 94, 3, 94, 1387, 8, 94, 3, 94, 1389, 8, 94, 1, 95, 1,
    95, 3, 95, 1393, 8, 95, 1, 96, 5, 96, 1396, 8, 96, 10, 96, 12, 96, 1399, 9,
    96, 1, 96, 1, 96, 3, 96, 1403, 8, 96, 1, 96, 1, 96, 1, 96, 1, 96, 1, 97, 1,
    97, 1, 97, 5, 97, 1412, 8, 97, 10, 97, 12, 97, 1415, 9, 97, 1, 98, 1, 98, 1,
    98, 3, 98, 1420, 8, 98, 1, 98, 1, 98, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1,
    99, 3, 99, 1430, 8, 99, 1, 99, 1, 99, 3, 99, 1434, 8, 99, 1, 99, 1, 99, 1,
    99, 3, 99, 1439, 8, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 5,
    99, 1448, 8, 99, 10, 99, 12, 99, 1451, 9, 99, 1, 99, 1, 99, 1, 99, 5, 99,
    1456, 8, 99, 10, 99, 12, 99, 1459, 9, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99,
    1, 99, 3, 99, 1467, 8, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99,
    1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 3, 99, 1483, 8, 99, 1, 99,
    1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99,
    1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99,
    1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99,
    1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 3, 99, 1528,
    8, 99, 1, 99, 1, 99, 1, 99, 1, 99, 3, 99, 1534, 8, 99, 1, 99, 1, 99, 1, 99,
    3, 99, 1539, 8, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 1, 99, 3, 99,
    1548, 8, 99, 5, 99, 1550, 8, 99, 10, 99, 12, 99, 1553, 9, 99, 1, 100, 5,
    100, 1556, 8, 100, 10, 100, 12, 100, 1559, 9, 100, 1, 100, 1, 100, 5, 100,
    1563, 8, 100, 10, 100, 12, 100, 1566, 9, 100, 1, 100, 1, 100, 1, 100, 1,
    100, 1, 100, 3, 100, 1573, 8, 100, 1, 100, 1, 100, 3, 100, 1577, 8, 100, 1,
    101, 1, 101, 1, 101, 5, 101, 1582, 8, 101, 10, 101, 12, 101, 1585, 9, 101,
    1, 102, 1, 102, 1, 103, 1, 103, 1, 103, 1, 103, 1, 104, 1, 104, 1, 104, 3,
    104, 1596, 8, 104, 1, 104, 1, 104, 1, 104, 1, 104, 1, 104, 5, 104, 1603, 8,
    104, 10, 104, 12, 104, 1606, 9, 104, 1, 104, 1, 104, 1, 104, 1, 104, 3, 104,
    1612, 8, 104, 1, 104, 3, 104, 1615, 8, 104, 1, 105, 1, 105, 3, 105, 1619, 8,
    105, 1, 106, 1, 106, 1, 106, 1, 106, 1, 106, 1, 106, 1, 106, 1, 106, 1, 106,
    1, 106, 1, 106, 1, 106, 1, 106, 1, 106, 1, 106, 1, 106, 3, 106, 1637, 8,
    106, 3, 106, 1639, 8, 106, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107,
    5, 107, 1647, 8, 107, 10, 107, 12, 107, 1650, 9, 107, 1, 107, 1, 107, 1,
    108, 1, 108, 1, 108, 1, 108, 1, 108, 3, 108, 1659, 8, 108, 1, 108, 1, 108,
    1, 108, 5, 108, 1664, 8, 108, 10, 108, 12, 108, 1667, 9, 108, 1, 108, 3,
    108, 1670, 8, 108, 3, 108, 1672, 8, 108, 1, 108, 1, 108, 1, 108, 1, 108, 1,
    108, 3, 108, 1679, 8, 108, 1, 109, 1, 109, 1, 109, 1, 110, 1, 110, 1, 111,
    1, 111, 5, 111, 1688, 8, 111, 10, 111, 12, 111, 1691, 9, 111, 3, 111, 1693,
    8, 111, 1, 112, 1, 112, 1, 113, 3, 113, 1698, 8, 113, 1, 113, 1, 113, 1,
    113, 1, 113, 1, 113, 1, 113, 3, 113, 1706, 8, 113, 1, 114, 1, 114, 3, 114,
    1710, 8, 114, 1, 114, 1, 114, 1, 114, 3, 114, 1715, 8, 114, 5, 114, 1717, 8,
    114, 10, 114, 12, 114, 1720, 9, 114, 1, 114, 3, 114, 1723, 8, 114, 1, 115,
    1, 115, 3, 115, 1727, 8, 115, 1, 115, 1, 115, 1, 116, 1, 116, 4, 116, 1733,
    8, 116, 11, 116, 12, 116, 1734, 1, 116, 1, 116, 1, 116, 1, 116, 1, 116, 4,
    116, 1742, 8, 116, 11, 116, 12, 116, 1743, 1, 116, 1, 116, 5, 116, 1748, 8,
    116, 10, 116, 12, 116, 1751, 9, 116, 3, 116, 1753, 8, 116, 1, 117, 1, 117,
    3, 117, 1757, 8, 117, 1, 118, 1, 118, 1, 118, 1, 119, 1, 119, 1, 119, 3,
    119, 1765, 8, 119, 1, 120, 1, 120, 1, 120, 3, 120, 1770, 8, 120, 1, 121, 1,
    121, 1, 121, 1, 121, 1, 122, 1, 122, 1, 122, 5, 122, 1779, 8, 122, 10, 122,
    12, 122, 1782, 9, 122, 1, 123, 5, 123, 1785, 8, 123, 10, 123, 12, 123, 1788,
    9, 123, 1, 123, 1, 123, 3, 123, 1792, 8, 123, 1, 123, 5, 123, 1795, 8, 123,
    10, 123, 12, 123, 1798, 9, 123, 1, 123, 1, 123, 5, 123, 1802, 8, 123, 10,
    123, 12, 123, 1805, 9, 123, 1, 124, 1, 124, 1, 125, 1, 125, 1, 125, 1, 125,
    5, 125, 1813, 8, 125, 10, 125, 12, 125, 1816, 9, 125, 1, 125, 1, 125, 1,
    126, 1, 126, 1, 126, 3, 126, 1823, 8, 126, 1, 126, 1, 126, 3, 126, 1827, 8,
    126, 3, 126, 1829, 8, 126, 1, 127, 1, 127, 1, 127, 1, 127, 1, 127, 3, 127,
    1836, 8, 127, 1, 128, 1, 128, 3, 128, 1840, 8, 128, 1, 128, 1, 128, 1, 128,
    0, 1, 198, 129, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
    32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68,
    70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104,
    106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134,
    136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164,
    166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194,
    196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224,
    226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254,
    256, 0, 15, 2, 0, 18, 18, 50, 50, 1, 0, 68, 71, 1, 0, 72, 73, 2, 0, 48, 48,
    58, 58, 13, 0, 17, 17, 31, 31, 35, 36, 38, 38, 41, 41, 43, 44, 46, 46, 56,
    56, 58, 58, 60, 61, 64, 64, 66, 67, 129, 129, 11, 0, 17, 17, 31, 31, 35, 36,
    41, 41, 44, 44, 46, 46, 56, 56, 58, 58, 60, 60, 66, 66, 129, 129, 2, 0, 91,
    92, 101, 104, 2, 0, 105, 106, 110, 110, 1, 0, 103, 104, 2, 0, 89, 90, 96,
    97, 2, 0, 95, 95, 98, 98, 2, 0, 88, 88, 111, 121, 1, 0, 101, 102, 2, 0, 94,
    94, 122, 122, 8, 0, 3, 3, 5, 5, 8, 8, 14, 14, 21, 21, 28, 28, 30, 30, 47,
    47, 2049, 0, 279, 1, 0, 0, 0, 2, 284, 1, 0, 0, 0, 4, 292, 1, 0, 0, 0, 6,
    299, 1, 0, 0, 0, 8, 313, 1, 0, 0, 0, 10, 328, 1, 0, 0, 0, 12, 340, 1, 0, 0,
    0, 14, 344, 1, 0, 0, 0, 16, 346, 1, 0, 0, 0, 18, 365, 1, 0, 0, 0, 20, 379,
    1, 0, 0, 0, 22, 393, 1, 0, 0, 0, 24, 401, 1, 0, 0, 0, 26, 419, 1, 0, 0, 0,
    28, 430, 1, 0, 0, 0, 30, 440, 1, 0, 0, 0, 32, 447, 1, 0, 0, 0, 34, 462, 1,
    0, 0, 0, 36, 471, 1, 0, 0, 0, 38, 492, 1, 0, 0, 0, 40, 504, 1, 0, 0, 0, 42,
    506, 1, 0, 0, 0, 44, 524, 1, 0, 0, 0, 46, 528, 1, 0, 0, 0, 48, 530, 1, 0, 0,
    0, 50, 533, 1, 0, 0, 0, 52, 536, 1, 0, 0, 0, 54, 547, 1, 0, 0, 0, 56, 553,
    1, 0, 0, 0, 58, 565, 1, 0, 0, 0, 60, 575, 1, 0, 0, 0, 62, 577, 1, 0, 0, 0,
    64, 588, 1, 0, 0, 0, 66, 602, 1, 0, 0, 0, 68, 613, 1, 0, 0, 0, 70, 618, 1,
    0, 0, 0, 72, 627, 1, 0, 0, 0, 74, 646, 1, 0, 0, 0, 76, 654, 1, 0, 0, 0, 78,
    659, 1, 0, 0, 0, 80, 669, 1, 0, 0, 0, 82, 671, 1, 0, 0, 0, 84, 701, 1, 0, 0,
    0, 86, 721, 1, 0, 0, 0, 88, 741, 1, 0, 0, 0, 90, 743, 1, 0, 0, 0, 92, 751,
    1, 0, 0, 0, 94, 767, 1, 0, 0, 0, 96, 778, 1, 0, 0, 0, 98, 789, 1, 0, 0, 0,
    100, 804, 1, 0, 0, 0, 102, 815, 1, 0, 0, 0, 104, 821, 1, 0, 0, 0, 106, 836,
    1, 0, 0, 0, 108, 838, 1, 0, 0, 0, 110, 840, 1, 0, 0, 0, 112, 847, 1, 0, 0,
    0, 114, 853, 1, 0, 0, 0, 116, 859, 1, 0, 0, 0, 118, 878, 1, 0, 0, 0, 120,
    897, 1, 0, 0, 0, 122, 902, 1, 0, 0, 0, 124, 904, 1, 0, 0, 0, 126, 920, 1, 0,
    0, 0, 128, 925, 1, 0, 0, 0, 130, 942, 1, 0, 0, 0, 132, 968, 1, 0, 0, 0, 134,
    972, 1, 0, 0, 0, 136, 974, 1, 0, 0, 0, 138, 980, 1, 0, 0, 0, 140, 982, 1, 0,
    0, 0, 142, 988, 1, 0, 0, 0, 144, 1062, 1, 0, 0, 0, 146, 1064, 1, 0, 0, 0,
    148, 1066, 1, 0, 0, 0, 150, 1078, 1, 0, 0, 0, 152, 1084, 1, 0, 0, 0, 154,
    1097, 1, 0, 0, 0, 156, 1112, 1, 0, 0, 0, 158, 1122, 1, 0, 0, 0, 160, 1136,
    1, 0, 0, 0, 162, 1141, 1, 0, 0, 0, 164, 1154, 1, 0, 0, 0, 166, 1156, 1, 0,
    0, 0, 168, 1161, 1, 0, 0, 0, 170, 1293, 1, 0, 0, 0, 172, 1295, 1, 0, 0, 0,
    174, 1308, 1, 0, 0, 0, 176, 1316, 1, 0, 0, 0, 178, 1319, 1, 0, 0, 0, 180,
    1326, 1, 0, 0, 0, 182, 1351, 1, 0, 0, 0, 184, 1356, 1, 0, 0, 0, 186, 1374,
    1, 0, 0, 0, 188, 1388, 1, 0, 0, 0, 190, 1392, 1, 0, 0, 0, 192, 1397, 1, 0,
    0, 0, 194, 1408, 1, 0, 0, 0, 196, 1419, 1, 0, 0, 0, 198, 1466, 1, 0, 0, 0,
    200, 1576, 1, 0, 0, 0, 202, 1578, 1, 0, 0, 0, 204, 1586, 1, 0, 0, 0, 206,
    1588, 1, 0, 0, 0, 208, 1614, 1, 0, 0, 0, 210, 1618, 1, 0, 0, 0, 212, 1638,
    1, 0, 0, 0, 214, 1640, 1, 0, 0, 0, 216, 1678, 1, 0, 0, 0, 218, 1680, 1, 0,
    0, 0, 220, 1683, 1, 0, 0, 0, 222, 1692, 1, 0, 0, 0, 224, 1694, 1, 0, 0, 0,
    226, 1705, 1, 0, 0, 0, 228, 1722, 1, 0, 0, 0, 230, 1724, 1, 0, 0, 0, 232,
    1752, 1, 0, 0, 0, 234, 1754, 1, 0, 0, 0, 236, 1758, 1, 0, 0, 0, 238, 1764,
    1, 0, 0, 0, 240, 1769, 1, 0, 0, 0, 242, 1771, 1, 0, 0, 0, 244, 1775, 1, 0,
    0, 0, 246, 1786, 1, 0, 0, 0, 248, 1806, 1, 0, 0, 0, 250, 1808, 1, 0, 0, 0,
    252, 1828, 1, 0, 0, 0, 254, 1835, 1, 0, 0, 0, 256, 1837, 1, 0, 0, 0, 258,
    260, 3, 4, 2, 0, 259, 258, 1, 0, 0, 0, 259, 260, 1, 0, 0, 0, 260, 265, 1, 0,
    0, 0, 261, 264, 3, 6, 3, 0, 262, 264, 5, 85, 0, 0, 263, 261, 1, 0, 0, 0,
    263, 262, 1, 0, 0, 0, 264, 267, 1, 0, 0, 0, 265, 263, 1, 0, 0, 0, 265, 266,
    1, 0, 0, 0, 266, 272, 1, 0, 0, 0, 267, 265, 1, 0, 0, 0, 268, 271, 3, 8, 4,
    0, 269, 271, 5, 85, 0, 0, 270, 268, 1, 0, 0, 0, 270, 269, 1, 0, 0, 0, 271,
    274, 1, 0, 0, 0, 272, 270, 1, 0, 0, 0, 272, 273, 1, 0, 0, 0, 273, 275, 1, 0,
    0, 0, 274, 272, 1, 0, 0, 0, 275, 280, 5, 0, 0, 1, 276, 277, 3, 2, 1, 0, 277,
    278, 5, 0, 0, 1, 278, 280, 1, 0, 0, 0, 279, 259, 1, 0, 0, 0, 279, 276, 1, 0,
    0, 0, 280, 1, 1, 0, 0, 0, 281, 283, 3, 6, 3, 0, 282, 281, 1, 0, 0, 0, 283,
    286, 1, 0, 0, 0, 284, 282, 1, 0, 0, 0, 284, 285, 1, 0, 0, 0, 285, 287, 1, 0,
    0, 0, 286, 284, 1, 0, 0, 0, 287, 288, 3, 142, 71, 0, 288, 3, 1, 0, 0, 0,
    289, 291, 3, 114, 57, 0, 290, 289, 1, 0, 0, 0, 291, 294, 1, 0, 0, 0, 292,
    290, 1, 0, 0, 0, 292, 293, 1, 0, 0, 0, 293, 295, 1, 0, 0, 0, 294, 292, 1, 0,
    0, 0, 295, 296, 5, 37, 0, 0, 296, 297, 3, 104, 52, 0, 297, 298, 5, 85, 0, 0,
    298, 5, 1, 0, 0, 0, 299, 301, 5, 26, 0, 0, 300, 302, 5, 48, 0, 0, 301, 300,
    1, 0, 0, 0, 301, 302, 1, 0, 0, 0, 302, 303, 1, 0, 0, 0, 303, 306, 3, 104,
    52, 0, 304, 305, 5, 87, 0, 0, 305, 307, 5, 105, 0, 0, 306, 304, 1, 0, 0, 0,
    306, 307, 1, 0, 0, 0, 307, 308, 1, 0, 0, 0, 308, 309, 5, 85, 0, 0, 309, 7,
    1, 0, 0, 0, 310, 312, 3, 12, 6, 0, 311, 310, 1, 0, 0, 0, 312, 315, 1, 0, 0,
    0, 313, 311, 1, 0, 0, 0, 313, 314, 1, 0, 0, 0, 314, 321, 1, 0, 0, 0, 315,
    313, 1, 0, 0, 0, 316, 322, 3, 16, 8, 0, 317, 322, 3, 24, 12, 0, 318, 322, 3,
    32, 16, 0, 319, 322, 3, 126, 63, 0, 320, 322, 3, 148, 74, 0, 321, 316, 1, 0,
    0, 0, 321, 317, 1, 0, 0, 0, 321, 318, 1, 0, 0, 0, 321, 319, 1, 0, 0, 0, 321,
    320, 1, 0, 0, 0, 322, 9, 1, 0, 0, 0, 323, 329, 3, 12, 6, 0, 324, 329, 5, 32,
    0, 0, 325, 329, 5, 52, 0, 0, 326, 329, 5, 57, 0, 0, 327, 329, 5, 63, 0, 0,
    328, 323, 1, 0, 0, 0, 328, 324, 1, 0, 0, 0, 328, 325, 1, 0, 0, 0, 328, 326,
    1, 0, 0, 0, 328, 327, 1, 0, 0, 0, 329, 11, 1, 0, 0, 0, 330, 341, 3, 114, 57,
    0, 331, 341, 5, 42, 0, 0, 332, 341, 5, 40, 0, 0, 333, 341, 5, 39, 0, 0, 334,
    341, 5, 48, 0, 0, 335, 341, 5, 1, 0, 0, 336, 341, 5, 19, 0, 0, 337, 341, 5,
    49, 0, 0, 338, 341, 5, 46, 0, 0, 339, 341, 5, 34, 0, 0, 340, 330, 1, 0, 0,
    0, 340, 331, 1, 0, 0, 0, 340, 332, 1, 0, 0, 0, 340, 333, 1, 0, 0, 0, 340,
    334, 1, 0, 0, 0, 340, 335, 1, 0, 0, 0, 340, 336, 1, 0, 0, 0, 340, 337, 1, 0,
    0, 0, 340, 338, 1, 0, 0, 0, 340, 339, 1, 0, 0, 0, 341, 13, 1, 0, 0, 0, 342,
    345, 5, 19, 0, 0, 343, 345, 3, 114, 57, 0, 344, 342, 1, 0, 0, 0, 344, 343,
    1, 0, 0, 0, 345, 15, 1, 0, 0, 0, 346, 347, 5, 9, 0, 0, 347, 349, 3, 164, 82,
    0, 348, 350, 3, 18, 9, 0, 349, 348, 1, 0, 0, 0, 349, 350, 1, 0, 0, 0, 350,
    353, 1, 0, 0, 0, 351, 352, 5, 18, 0, 0, 352, 354, 3, 246, 123, 0, 353, 351,
    1, 0, 0, 0, 353, 354, 1, 0, 0, 0, 354, 357, 1, 0, 0, 0, 355, 356, 5, 25, 0,
    0, 356, 358, 3, 244, 122, 0, 357, 355, 1, 0, 0, 0, 357, 358, 1, 0, 0, 0,
    358, 361, 1, 0, 0, 0, 359, 360, 5, 38, 0, 0, 360, 362, 3, 244, 122, 0, 361,
    359, 1, 0, 0, 0, 361, 362, 1, 0, 0, 0, 362, 363, 1, 0, 0, 0, 363, 364, 3,
    34, 17, 0, 364, 17, 1, 0, 0, 0, 365, 366, 5, 90, 0, 0, 366, 371, 3, 20, 10,
    0, 367, 368, 5, 86, 0, 0, 368, 370, 3, 20, 10, 0, 369, 367, 1, 0, 0, 0, 370,
    373, 1, 0, 0, 0, 371, 369, 1, 0, 0, 0, 371, 372, 1, 0, 0, 0, 372, 374, 1, 0,
    0, 0, 373, 371, 1, 0, 0, 0, 374, 375, 5, 89, 0, 0, 375, 19, 1, 0, 0, 0, 376,
    378, 3, 114, 57, 0, 377, 376, 1, 0, 0, 0, 378, 381, 1, 0, 0, 0, 379, 377, 1,
    0, 0, 0, 379, 380, 1, 0, 0, 0, 380, 382, 1, 0, 0, 0, 381, 379, 1, 0, 0, 0,
    382, 391, 3, 164, 82, 0, 383, 387, 5, 18, 0, 0, 384, 386, 3, 114, 57, 0,
    385, 384, 1, 0, 0, 0, 386, 389, 1, 0, 0, 0, 387, 385, 1, 0, 0, 0, 387, 388,
    1, 0, 0, 0, 388, 390, 1, 0, 0, 0, 389, 387, 1, 0, 0, 0, 390, 392, 3, 22, 11,
    0, 391, 383, 1, 0, 0, 0, 391, 392, 1, 0, 0, 0, 392, 21, 1, 0, 0, 0, 393,
    398, 3, 246, 123, 0, 394, 395, 5, 107, 0, 0, 395, 397, 3, 246, 123, 0, 396,
    394, 1, 0, 0, 0, 397, 400, 1, 0, 0, 0, 398, 396, 1, 0, 0, 0, 398, 399, 1, 0,
    0, 0, 399, 23, 1, 0, 0, 0, 400, 398, 1, 0, 0, 0, 401, 402, 5, 16, 0, 0, 402,
    405, 3, 164, 82, 0, 403, 404, 5, 25, 0, 0, 404, 406, 3, 244, 122, 0, 405,
    403, 1, 0, 0, 0, 405, 406, 1, 0, 0, 0, 406, 407, 1, 0, 0, 0, 407, 409, 5,
    81, 0, 0, 408, 410, 3, 26, 13, 0, 409, 408, 1, 0, 0, 0, 409, 410, 1, 0, 0,
    0, 410, 412, 1, 0, 0, 0, 411, 413, 5, 86, 0, 0, 412, 411, 1, 0, 0, 0, 412,
    413, 1, 0, 0, 0, 413, 415, 1, 0, 0, 0, 414, 416, 3, 30, 15, 0, 415, 414, 1,
    0, 0, 0, 415, 416, 1, 0, 0, 0, 416, 417, 1, 0, 0, 0, 417, 418, 5, 82, 0, 0,
    418, 25, 1, 0, 0, 0, 419, 424, 3, 28, 14, 0, 420, 421, 5, 86, 0, 0, 421,
    423, 3, 28, 14, 0, 422, 420, 1, 0, 0, 0, 423, 426, 1, 0, 0, 0, 424, 422, 1,
    0, 0, 0, 424, 425, 1, 0, 0, 0, 425, 27, 1, 0, 0, 0, 426, 424, 1, 0, 0, 0,
    427, 429, 3, 114, 57, 0, 428, 427, 1, 0, 0, 0, 429, 432, 1, 0, 0, 0, 430,
    428, 1, 0, 0, 0, 430, 431, 1, 0, 0, 0, 431, 433, 1, 0, 0, 0, 432, 430, 1, 0,
    0, 0, 433, 435, 3, 164, 82, 0, 434, 436, 3, 256, 128, 0, 435, 434, 1, 0, 0,
    0, 435, 436, 1, 0, 0, 0, 436, 438, 1, 0, 0, 0, 437, 439, 3, 34, 17, 0, 438,
    437, 1, 0, 0, 0, 438, 439, 1, 0, 0, 0, 439, 29, 1, 0, 0, 0, 440, 444, 5, 85,
    0, 0, 441, 443, 3, 38, 19, 0, 442, 441, 1, 0, 0, 0, 443, 446, 1, 0, 0, 0,
    444, 442, 1, 0, 0, 0, 444, 445, 1, 0, 0, 0, 445, 31, 1, 0, 0, 0, 446, 444,
    1, 0, 0, 0, 447, 448, 5, 29, 0, 0, 448, 450, 3, 164, 82, 0, 449, 451, 3, 18,
    9, 0, 450, 449, 1, 0, 0, 0, 450, 451, 1, 0, 0, 0, 451, 454, 1, 0, 0, 0, 452,
    453, 5, 18, 0, 0, 453, 455, 3, 244, 122, 0, 454, 452, 1, 0, 0, 0, 454, 455,
    1, 0, 0, 0, 455, 458, 1, 0, 0, 0, 456, 457, 5, 38, 0, 0, 457, 459, 3, 244,
    122, 0, 458, 456, 1, 0, 0, 0, 458, 459, 1, 0, 0, 0, 459, 460, 1, 0, 0, 0,
    460, 461, 3, 36, 18, 0, 461, 33, 1, 0, 0, 0, 462, 466, 5, 81, 0, 0, 463,
    465, 3, 38, 19, 0, 464, 463, 1, 0, 0, 0, 465, 468, 1, 0, 0, 0, 466, 464, 1,
    0, 0, 0, 466, 467, 1, 0, 0, 0, 467, 469, 1, 0, 0, 0, 468, 466, 1, 0, 0, 0,
    469, 470, 5, 82, 0, 0, 470, 35, 1, 0, 0, 0, 471, 475, 5, 81, 0, 0, 472, 474,
    3, 58, 29, 0, 473, 472, 1, 0, 0, 0, 474, 477, 1, 0, 0, 0, 475, 473, 1, 0, 0,
    0, 475, 476, 1, 0, 0, 0, 476, 478, 1, 0, 0, 0, 477, 475, 1, 0, 0, 0, 478,
    479, 5, 82, 0, 0, 479, 37, 1, 0, 0, 0, 480, 493, 5, 85, 0, 0, 481, 483, 5,
    48, 0, 0, 482, 481, 1, 0, 0, 0, 482, 483, 1, 0, 0, 0, 483, 484, 1, 0, 0, 0,
    484, 493, 3, 158, 79, 0, 485, 487, 3, 10, 5, 0, 486, 485, 1, 0, 0, 0, 487,
    490, 1, 0, 0, 0, 488, 486, 1, 0, 0, 0, 488, 489, 1, 0, 0, 0, 489, 491, 1, 0,
    0, 0, 490, 488, 1, 0, 0, 0, 491, 493, 3, 40, 20, 0, 492, 480, 1, 0, 0, 0,
    492, 482, 1, 0, 0, 0, 492, 488, 1, 0, 0, 0, 493, 39, 1, 0, 0, 0, 494, 505,
    3, 148, 74, 0, 495, 505, 3, 42, 21, 0, 496, 505, 3, 48, 24, 0, 497, 505, 3,
    56, 28, 0, 498, 505, 3, 52, 26, 0, 499, 505, 3, 50, 25, 0, 500, 505, 3, 32,
    16, 0, 501, 505, 3, 126, 63, 0, 502, 505, 3, 16, 8, 0, 503, 505, 3, 24, 12,
    0, 504, 494, 1, 0, 0, 0, 504, 495, 1, 0, 0, 0, 504, 496, 1, 0, 0, 0, 504,
    497, 1, 0, 0, 0, 504, 498, 1, 0, 0, 0, 504, 499, 1, 0, 0, 0, 504, 500, 1, 0,
    0, 0, 504, 501, 1, 0, 0, 0, 504, 502, 1, 0, 0, 0, 504, 503, 1, 0, 0, 0, 505,
    41, 1, 0, 0, 0, 506, 507, 3, 46, 23, 0, 507, 508, 3, 164, 82, 0, 508, 513,
    3, 92, 46, 0, 509, 510, 5, 83, 0, 0, 510, 512, 5, 84, 0, 0, 511, 509, 1, 0,
    0, 0, 512, 515, 1, 0, 0, 0, 513, 511, 1, 0, 0, 0, 513, 514, 1, 0, 0, 0, 514,
    518, 1, 0, 0, 0, 515, 513, 1, 0, 0, 0, 516, 517, 5, 55, 0, 0, 517, 519, 3,
    90, 45, 0, 518, 516, 1, 0, 0, 0, 518, 519, 1, 0, 0, 0, 519, 520, 1, 0, 0, 0,
    520, 521, 3, 44, 22, 0, 521, 43, 1, 0, 0, 0, 522, 525, 3, 158, 79, 0, 523,
    525, 5, 85, 0, 0, 524, 522, 1, 0, 0, 0, 524, 523, 1, 0, 0, 0, 525, 45, 1, 0,
    0, 0, 526, 529, 3, 246, 123, 0, 527, 529, 5, 62, 0, 0, 528, 526, 1, 0, 0, 0,
    528, 527, 1, 0, 0, 0, 529, 47, 1, 0, 0, 0, 530, 531, 3, 18, 9, 0, 531, 532,
    3, 42, 21, 0, 532, 49, 1, 0, 0, 0, 533, 534, 3, 18, 9, 0, 534, 535, 3, 52,
    26, 0, 535, 51, 1, 0, 0, 0, 536, 537, 3, 164, 82, 0, 537, 540, 3, 92, 46, 0,
    538, 539, 5, 55, 0, 0, 539, 541, 3, 90, 45, 0, 540, 538, 1, 0, 0, 0, 540,
    541, 1, 0, 0, 0, 541, 542, 1, 0, 0, 0, 542, 543, 3, 158, 79, 0, 543, 53, 1,
    0, 0, 0, 544, 546, 3, 10, 5, 0, 545, 544, 1, 0, 0, 0, 546, 549, 1, 0, 0, 0,
    547, 545, 1, 0, 0, 0, 547, 548, 1, 0, 0, 0, 548, 550, 1, 0, 0, 0, 549, 547,
    1, 0, 0, 0, 550, 551, 3, 164, 82, 0, 551, 552, 3, 158, 79, 0, 552, 55, 1, 0,
    0, 0, 553, 554, 3, 246, 123, 0, 554, 555, 3, 74, 37, 0, 555, 556, 5, 85, 0,
    0, 556, 57, 1, 0, 0, 0, 557, 559, 3, 10, 5, 0, 558, 557, 1, 0, 0, 0, 559,
    562, 1, 0, 0, 0, 560, 558, 1, 0, 0, 0, 560, 561, 1, 0, 0, 0, 561, 563, 1, 0,
    0, 0, 562, 560, 1, 0, 0, 0, 563, 566, 3, 60, 30, 0, 564, 566, 5, 85, 0, 0,
    565, 560, 1, 0, 0, 0, 565, 564, 1, 0, 0, 0, 566, 59, 1, 0, 0, 0, 567, 576,
    3, 148, 74, 0, 568, 576, 3, 62, 31, 0, 569, 576, 3, 66, 33, 0, 570, 576, 3,
    70, 35, 0, 571, 576, 3, 32, 16, 0, 572, 576, 3, 126, 63, 0, 573, 576, 3, 16,
    8, 0, 574, 576, 3, 24, 12, 0, 575, 567, 1, 0, 0, 0, 575, 568, 1, 0, 0, 0,
    575, 569, 1, 0, 0, 0, 575, 570, 1, 0, 0, 0, 575, 571, 1, 0, 0, 0, 575, 572,
    1, 0, 0, 0, 575, 573, 1, 0, 0, 0, 575, 574, 1, 0, 0, 0, 576, 61, 1, 0, 0, 0,
    577, 578, 3, 246, 123, 0, 578, 583, 3, 64, 32, 0, 579, 580, 5, 86, 0, 0,
    580, 582, 3, 64, 32, 0, 581, 579, 1, 0, 0, 0, 582, 585, 1, 0, 0, 0, 583,
    581, 1, 0, 0, 0, 583, 584, 1, 0, 0, 0, 584, 586, 1, 0, 0, 0, 585, 583, 1, 0,
    0, 0, 586, 587, 5, 85, 0, 0, 587, 63, 1, 0, 0, 0, 588, 593, 3, 164, 82, 0,
    589, 590, 5, 83, 0, 0, 590, 592, 5, 84, 0, 0, 591, 589, 1, 0, 0, 0, 592,
    595, 1, 0, 0, 0, 593, 591, 1, 0, 0, 0, 593, 594, 1, 0, 0, 0, 594, 596, 1, 0,
    0, 0, 595, 593, 1, 0, 0, 0, 596, 597, 5, 88, 0, 0, 597, 598, 3, 80, 40, 0,
    598, 65, 1, 0, 0, 0, 599, 601, 3, 68, 34, 0, 600, 599, 1, 0, 0, 0, 601, 604,
    1, 0, 0, 0, 602, 600, 1, 0, 0, 0, 602, 603, 1, 0, 0, 0, 603, 605, 1, 0, 0,
    0, 604, 602, 1, 0, 0, 0, 605, 606, 3, 72, 36, 0, 606, 67, 1, 0, 0, 0, 607,
    614, 3, 114, 57, 0, 608, 614, 5, 42, 0, 0, 609, 614, 5, 1, 0, 0, 610, 614,
    5, 12, 0, 0, 611, 614, 5, 48, 0, 0, 612, 614, 5, 49, 0, 0, 613, 607, 1, 0,
    0, 0, 613, 608, 1, 0, 0, 0, 613, 609, 1, 0, 0, 0, 613, 610, 1, 0, 0, 0, 613,
    611, 1, 0, 0, 0, 613, 612, 1, 0, 0, 0, 614, 69, 1, 0, 0, 0, 615, 617, 3, 68,
    34, 0, 616, 615, 1, 0, 0, 0, 617, 620, 1, 0, 0, 0, 618, 616, 1, 0, 0, 0,
    618, 619, 1, 0, 0, 0, 619, 621, 1, 0, 0, 0, 620, 618, 1, 0, 0, 0, 621, 622,
    3, 18, 9, 0, 622, 623, 3, 72, 36, 0, 623, 71, 1, 0, 0, 0, 624, 626, 3, 114,
    57, 0, 625, 624, 1, 0, 0, 0, 626, 629, 1, 0, 0, 0, 627, 625, 1, 0, 0, 0,
    627, 628, 1, 0, 0, 0, 628, 630, 1, 0, 0, 0, 629, 627, 1, 0, 0, 0, 630, 631,
    3, 46, 23, 0, 631, 632, 3, 164, 82, 0, 632, 637, 3, 92, 46, 0, 633, 634, 5,
    83, 0, 0, 634, 636, 5, 84, 0, 0, 635, 633, 1, 0, 0, 0, 636, 639, 1, 0, 0, 0,
    637, 635, 1, 0, 0, 0, 637, 638, 1, 0, 0, 0, 638, 642, 1, 0, 0, 0, 639, 637,
    1, 0, 0, 0, 640, 641, 5, 55, 0, 0, 641, 643, 3, 90, 45, 0, 642, 640, 1, 0,
    0, 0, 642, 643, 1, 0, 0, 0, 643, 644, 1, 0, 0, 0, 644, 645, 3, 44, 22, 0,
    645, 73, 1, 0, 0, 0, 646, 651, 3, 76, 38, 0, 647, 648, 5, 86, 0, 0, 648,
    650, 3, 76, 38, 0, 649, 647, 1, 0, 0, 0, 650, 653, 1, 0, 0, 0, 651, 649, 1,
    0, 0, 0, 651, 652, 1, 0, 0, 0, 652, 75, 1, 0, 0, 0, 653, 651, 1, 0, 0, 0,
    654, 657, 3, 78, 39, 0, 655, 656, 5, 88, 0, 0, 656, 658, 3, 80, 40, 0, 657,
    655, 1, 0, 0, 0, 657, 658, 1, 0, 0, 0, 658, 77, 1, 0, 0, 0, 659, 664, 3,
    164, 82, 0, 660, 661, 5, 83, 0, 0, 661, 663, 5, 84, 0, 0, 662, 660, 1, 0, 0,
    0, 663, 666, 1, 0, 0, 0, 664, 662, 1, 0, 0, 0, 664, 665, 1, 0, 0, 0, 665,
    79, 1, 0, 0, 0, 666, 664, 1, 0, 0, 0, 667, 670, 3, 82, 41, 0, 668, 670, 3,
    198, 99, 0, 669, 667, 1, 0, 0, 0, 669, 668, 1, 0, 0, 0, 670, 81, 1, 0, 0, 0,
    671, 683, 5, 81, 0, 0, 672, 677, 3, 80, 40, 0, 673, 674, 5, 86, 0, 0, 674,
    676, 3, 80, 40, 0, 675, 673, 1, 0, 0, 0, 676, 679, 1, 0, 0, 0, 677, 675, 1,
    0, 0, 0, 677, 678, 1, 0, 0, 0, 678, 681, 1, 0, 0, 0, 679, 677, 1, 0, 0, 0,
    680, 682, 5, 86, 0, 0, 681, 680, 1, 0, 0, 0, 681, 682, 1, 0, 0, 0, 682, 684,
    1, 0, 0, 0, 683, 672, 1, 0, 0, 0, 683, 684, 1, 0, 0, 0, 684, 685, 1, 0, 0,
    0, 685, 686, 5, 82, 0, 0, 686, 83, 1, 0, 0, 0, 687, 688, 3, 86, 43, 0, 688,
    692, 5, 87, 0, 0, 689, 691, 3, 114, 57, 0, 690, 689, 1, 0, 0, 0, 691, 694,
    1, 0, 0, 0, 692, 690, 1, 0, 0, 0, 692, 693, 1, 0, 0, 0, 693, 696, 1, 0, 0,
    0, 694, 692, 1, 0, 0, 0, 695, 687, 1, 0, 0, 0, 695, 696, 1, 0, 0, 0, 696,
    697, 1, 0, 0, 0, 697, 699, 3, 166, 83, 0, 698, 700, 3, 250, 125, 0, 699,
    698, 1, 0, 0, 0, 699, 700, 1, 0, 0, 0, 700, 702, 1, 0, 0, 0, 701, 695, 1, 0,
    0, 0, 702, 703, 1, 0, 0, 0, 703, 701, 1, 0, 0, 0, 703, 704, 1, 0, 0, 0, 704,
    718, 1, 0, 0, 0, 705, 709, 5, 87, 0, 0, 706, 708, 3, 114, 57, 0, 707, 706,
    1, 0, 0, 0, 708, 711, 1, 0, 0, 0, 709, 707, 1, 0, 0, 0, 709, 710, 1, 0, 0,
    0, 710, 712, 1, 0, 0, 0, 711, 709, 1, 0, 0, 0, 712, 714, 3, 166, 83, 0, 713,
    715, 3, 250, 125, 0, 714, 713, 1, 0, 0, 0, 714, 715, 1, 0, 0, 0, 715, 717,
    1, 0, 0, 0, 716, 705, 1, 0, 0, 0, 717, 720, 1, 0, 0, 0, 718, 716, 1, 0, 0,
    0, 718, 719, 1, 0, 0, 0, 719, 85, 1, 0, 0, 0, 720, 718, 1, 0, 0, 0, 721,
    726, 3, 164, 82, 0, 722, 723, 5, 87, 0, 0, 723, 725, 3, 164, 82, 0, 724,
    722, 1, 0, 0, 0, 725, 728, 1, 0, 0, 0, 726, 724, 1, 0, 0, 0, 726, 727, 1, 0,
    0, 0, 727, 87, 1, 0, 0, 0, 728, 726, 1, 0, 0, 0, 729, 742, 3, 246, 123, 0,
    730, 732, 3, 114, 57, 0, 731, 730, 1, 0, 0, 0, 732, 735, 1, 0, 0, 0, 733,
    731, 1, 0, 0, 0, 733, 734, 1, 0, 0, 0, 734, 736, 1, 0, 0, 0, 735, 733, 1, 0,
    0, 0, 736, 739, 5, 93, 0, 0, 737, 738, 7, 0, 0, 0, 738, 740, 3, 246, 123, 0,
    739, 737, 1, 0, 0, 0, 739, 740, 1, 0, 0, 0, 740, 742, 1, 0, 0, 0, 741, 729,
    1, 0, 0, 0, 741, 733, 1, 0, 0, 0, 742, 89, 1, 0, 0, 0, 743, 748, 3, 104, 52,
    0, 744, 745, 5, 86, 0, 0, 745, 747, 3, 104, 52, 0, 746, 744, 1, 0, 0, 0,
    747, 750, 1, 0, 0, 0, 748, 746, 1, 0, 0, 0, 748, 749, 1, 0, 0, 0, 749, 91,
    1, 0, 0, 0, 750, 748, 1, 0, 0, 0, 751, 763, 5, 79, 0, 0, 752, 755, 3, 94,
    47, 0, 753, 755, 3, 98, 49, 0, 754, 752, 1, 0, 0, 0, 754, 753, 1, 0, 0, 0,
    755, 760, 1, 0, 0, 0, 756, 757, 5, 86, 0, 0, 757, 759, 3, 96, 48, 0, 758,
    756, 1, 0, 0, 0, 759, 762, 1, 0, 0, 0, 760, 758, 1, 0, 0, 0, 760, 761, 1, 0,
    0, 0, 761, 764, 1, 0, 0, 0, 762, 760, 1, 0, 0, 0, 763, 754, 1, 0, 0, 0, 763,
    764, 1, 0, 0, 0, 764, 765, 1, 0, 0, 0, 765, 766, 5, 80, 0, 0, 766, 93, 1, 0,
    0, 0, 767, 773, 3, 246, 123, 0, 768, 769, 3, 164, 82, 0, 769, 770, 5, 87, 0,
    0, 770, 772, 1, 0, 0, 0, 771, 768, 1, 0, 0, 0, 772, 775, 1, 0, 0, 0, 773,
    771, 1, 0, 0, 0, 773, 774, 1, 0, 0, 0, 774, 776, 1, 0, 0, 0, 775, 773, 1, 0,
    0, 0, 776, 777, 5, 53, 0, 0, 777, 95, 1, 0, 0, 0, 778, 783, 3, 98, 49, 0,
    779, 780, 5, 86, 0, 0, 780, 782, 3, 98, 49, 0, 781, 779, 1, 0, 0, 0, 782,
    785, 1, 0, 0, 0, 783, 781, 1, 0, 0, 0, 783, 784, 1, 0, 0, 0, 784, 97, 1, 0,
    0, 0, 785, 783, 1, 0, 0, 0, 786, 788, 3, 14, 7, 0, 787, 786, 1, 0, 0, 0,
    788, 791, 1, 0, 0, 0, 789, 787, 1, 0, 0, 0, 789, 790, 1, 0, 0, 0, 790, 792,
    1, 0, 0, 0, 791, 789, 1, 0, 0, 0, 792, 800, 3, 246, 123, 0, 793, 795, 3,
    114, 57, 0, 794, 793, 1, 0, 0, 0, 795, 798, 1, 0, 0, 0, 796, 794, 1, 0, 0,
    0, 796, 797, 1, 0, 0, 0, 797, 799, 1, 0, 0, 0, 798, 796, 1, 0, 0, 0, 799,
    801, 5, 125, 0, 0, 800, 796, 1, 0, 0, 0, 800, 801, 1, 0, 0, 0, 801, 802, 1,
    0, 0, 0, 802, 803, 3, 78, 39, 0, 803, 99, 1, 0, 0, 0, 804, 809, 3, 102, 51,
    0, 805, 806, 5, 86, 0, 0, 806, 808, 3, 102, 51, 0, 807, 805, 1, 0, 0, 0,
    808, 811, 1, 0, 0, 0, 809, 807, 1, 0, 0, 0, 809, 810, 1, 0, 0, 0, 810, 101,
    1, 0, 0, 0, 811, 809, 1, 0, 0, 0, 812, 814, 3, 14, 7, 0, 813, 812, 1, 0, 0,
    0, 814, 817, 1, 0, 0, 0, 815, 813, 1, 0, 0, 0, 815, 816, 1, 0, 0, 0, 816,
    818, 1, 0, 0, 0, 817, 815, 1, 0, 0, 0, 818, 819, 5, 61, 0, 0, 819, 820, 3,
    164, 82, 0, 820, 103, 1, 0, 0, 0, 821, 826, 3, 164, 82, 0, 822, 823, 5, 87,
    0, 0, 823, 825, 3, 164, 82, 0, 824, 822, 1, 0, 0, 0, 825, 828, 1, 0, 0, 0,
    826, 824, 1, 0, 0, 0, 826, 827, 1, 0, 0, 0, 827, 105, 1, 0, 0, 0, 828, 826,
    1, 0, 0, 0, 829, 837, 3, 108, 54, 0, 830, 837, 3, 110, 55, 0, 831, 837, 5,
    75, 0, 0, 832, 837, 5, 76, 0, 0, 833, 837, 5, 74, 0, 0, 834, 837, 5, 78, 0,
    0, 835, 837, 5, 77, 0, 0, 836, 829, 1, 0, 0, 0, 836, 830, 1, 0, 0, 0, 836,
    831, 1, 0, 0, 0, 836, 832, 1, 0, 0, 0, 836, 833, 1, 0, 0, 0, 836, 834, 1, 0,
    0, 0, 836, 835, 1, 0, 0, 0, 837, 107, 1, 0, 0, 0, 838, 839, 7, 1, 0, 0, 839,
    109, 1, 0, 0, 0, 840, 841, 7, 2, 0, 0, 841, 111, 1, 0, 0, 0, 842, 843, 3,
    164, 82, 0, 843, 844, 5, 87, 0, 0, 844, 846, 1, 0, 0, 0, 845, 842, 1, 0, 0,
    0, 846, 849, 1, 0, 0, 0, 847, 845, 1, 0, 0, 0, 847, 848, 1, 0, 0, 0, 848,
    850, 1, 0, 0, 0, 849, 847, 1, 0, 0, 0, 850, 851, 5, 124, 0, 0, 851, 852, 3,
    164, 82, 0, 852, 113, 1, 0, 0, 0, 853, 854, 5, 124, 0, 0, 854, 855, 3, 104,
    52, 0, 855, 857, 1, 0, 0, 0, 856, 858, 3, 116, 58, 0, 857, 856, 1, 0, 0, 0,
    857, 858, 1, 0, 0, 0, 858, 115, 1, 0, 0, 0, 859, 868, 5, 79, 0, 0, 860, 865,
    3, 118, 59, 0, 861, 862, 5, 86, 0, 0, 862, 864, 3, 118, 59, 0, 863, 861, 1,
    0, 0, 0, 864, 867, 1, 0, 0, 0, 865, 863, 1, 0, 0, 0, 865, 866, 1, 0, 0, 0,
    866, 869, 1, 0, 0, 0, 867, 865, 1, 0, 0, 0, 868, 860, 1, 0, 0, 0, 868, 869,
    1, 0, 0, 0, 869, 870, 1, 0, 0, 0, 870, 871, 5, 80, 0, 0, 871, 117, 1, 0, 0,
    0, 872, 873, 4, 59, 0, 0, 873, 879, 3, 120, 60, 0, 874, 875, 3, 164, 82, 0,
    875, 876, 5, 88, 0, 0, 876, 877, 3, 120, 60, 0, 877, 879, 1, 0, 0, 0, 878,
    872, 1, 0, 0, 0, 878, 874, 1, 0, 0, 0, 879, 119, 1, 0, 0, 0, 880, 898, 3,
    198, 99, 0, 881, 898, 3, 114, 57, 0, 882, 891, 5, 81, 0, 0, 883, 888, 3,
    120, 60, 0, 884, 885, 5, 86, 0, 0, 885, 887, 3, 120, 60, 0, 886, 884, 1, 0,
    0, 0, 887, 890, 1, 0, 0, 0, 888, 886, 1, 0, 0, 0, 888, 889, 1, 0, 0, 0, 889,
    892, 1, 0, 0, 0, 890, 888, 1, 0, 0, 0, 891, 883, 1, 0, 0, 0, 891, 892, 1, 0,
    0, 0, 892, 894, 1, 0, 0, 0, 893, 895, 5, 86, 0, 0, 894, 893, 1, 0, 0, 0,
    894, 895, 1, 0, 0, 0, 895, 896, 1, 0, 0, 0, 896, 898, 5, 82, 0, 0, 897, 880,
    1, 0, 0, 0, 897, 881, 1, 0, 0, 0, 897, 882, 1, 0, 0, 0, 898, 121, 1, 0, 0,
    0, 899, 903, 3, 198, 99, 0, 900, 903, 3, 114, 57, 0, 901, 903, 3, 124, 62,
    0, 902, 899, 1, 0, 0, 0, 902, 900, 1, 0, 0, 0, 902, 901, 1, 0, 0, 0, 903,
    123, 1, 0, 0, 0, 904, 913, 5, 81, 0, 0, 905, 910, 3, 122, 61, 0, 906, 907,
    5, 86, 0, 0, 907, 909, 3, 122, 61, 0, 908, 906, 1, 0, 0, 0, 909, 912, 1, 0,
    0, 0, 910, 908, 1, 0, 0, 0, 910, 911, 1, 0, 0, 0, 911, 914, 1, 0, 0, 0, 912,
    910, 1, 0, 0, 0, 913, 905, 1, 0, 0, 0, 913, 914, 1, 0, 0, 0, 914, 916, 1, 0,
    0, 0, 915, 917, 5, 86, 0, 0, 916, 915, 1, 0, 0, 0, 916, 917, 1, 0, 0, 0,
    917, 918, 1, 0, 0, 0, 918, 919, 5, 82, 0, 0, 919, 125, 1, 0, 0, 0, 920, 921,
    5, 124, 0, 0, 921, 922, 5, 29, 0, 0, 922, 923, 3, 164, 82, 0, 923, 924, 3,
    128, 64, 0, 924, 127, 1, 0, 0, 0, 925, 929, 5, 81, 0, 0, 926, 928, 3, 130,
    65, 0, 927, 926, 1, 0, 0, 0, 928, 931, 1, 0, 0, 0, 929, 927, 1, 0, 0, 0,
    929, 930, 1, 0, 0, 0, 930, 932, 1, 0, 0, 0, 931, 929, 1, 0, 0, 0, 932, 933,
    5, 82, 0, 0, 933, 129, 1, 0, 0, 0, 934, 936, 3, 10, 5, 0, 935, 934, 1, 0, 0,
    0, 936, 939, 1, 0, 0, 0, 937, 935, 1, 0, 0, 0, 937, 938, 1, 0, 0, 0, 938,
    940, 1, 0, 0, 0, 939, 937, 1, 0, 0, 0, 940, 943, 3, 132, 66, 0, 941, 943, 5,
    85, 0, 0, 942, 937, 1, 0, 0, 0, 942, 941, 1, 0, 0, 0, 943, 131, 1, 0, 0, 0,
    944, 945, 3, 246, 123, 0, 945, 946, 3, 134, 67, 0, 946, 947, 5, 85, 0, 0,
    947, 969, 1, 0, 0, 0, 948, 950, 3, 16, 8, 0, 949, 951, 5, 85, 0, 0, 950,
    949, 1, 0, 0, 0, 950, 951, 1, 0, 0, 0, 951, 969, 1, 0, 0, 0, 952, 954, 3,
    32, 16, 0, 953, 955, 5, 85, 0, 0, 954, 953, 1, 0, 0, 0, 954, 955, 1, 0, 0,
    0, 955, 969, 1, 0, 0, 0, 956, 958, 3, 24, 12, 0, 957, 959, 5, 85, 0, 0, 958,
    957, 1, 0, 0, 0, 958, 959, 1, 0, 0, 0, 959, 969, 1, 0, 0, 0, 960, 962, 3,
    126, 63, 0, 961, 963, 5, 85, 0, 0, 962, 961, 1, 0, 0, 0, 962, 963, 1, 0, 0,
    0, 963, 969, 1, 0, 0, 0, 964, 966, 3, 148, 74, 0, 965, 967, 5, 85, 0, 0,
    966, 965, 1, 0, 0, 0, 966, 967, 1, 0, 0, 0, 967, 969, 1, 0, 0, 0, 968, 944,
    1, 0, 0, 0, 968, 948, 1, 0, 0, 0, 968, 952, 1, 0, 0, 0, 968, 956, 1, 0, 0,
    0, 968, 960, 1, 0, 0, 0, 968, 964, 1, 0, 0, 0, 969, 133, 1, 0, 0, 0, 970,
    973, 3, 136, 68, 0, 971, 973, 3, 138, 69, 0, 972, 970, 1, 0, 0, 0, 972, 971,
    1, 0, 0, 0, 973, 135, 1, 0, 0, 0, 974, 975, 3, 164, 82, 0, 975, 976, 5, 79,
    0, 0, 976, 978, 5, 80, 0, 0, 977, 979, 3, 140, 70, 0, 978, 977, 1, 0, 0, 0,
    978, 979, 1, 0, 0, 0, 979, 137, 1, 0, 0, 0, 980, 981, 3, 74, 37, 0, 981,
    139, 1, 0, 0, 0, 982, 983, 5, 12, 0, 0, 983, 984, 3, 122, 61, 0, 984, 141,
    1, 0, 0, 0, 985, 987, 3, 114, 57, 0, 986, 985, 1, 0, 0, 0, 987, 990, 1, 0,
    0, 0, 988, 986, 1, 0, 0, 0, 988, 989, 1, 0, 0, 0, 989, 992, 1, 0, 0, 0, 990,
    988, 1, 0, 0, 0, 991, 993, 5, 35, 0, 0, 992, 991, 1, 0, 0, 0, 992, 993, 1,
    0, 0, 0, 993, 994, 1, 0, 0, 0, 994, 995, 5, 31, 0, 0, 995, 996, 3, 104, 52,
    0, 996, 1000, 5, 81, 0, 0, 997, 999, 3, 144, 72, 0, 998, 997, 1, 0, 0, 0,
    999, 1002, 1, 0, 0, 0, 1000, 998, 1, 0, 0, 0, 1000, 1001, 1, 0, 0, 0, 1001,
    1003, 1, 0, 0, 0, 1002, 1000, 1, 0, 0, 0, 1003, 1004, 5, 82, 0, 0, 1004,
    143, 1, 0, 0, 0, 1005, 1009, 5, 44, 0, 0, 1006, 1008, 3, 146, 73, 0, 1007,
    1006, 1, 0, 0, 0, 1008, 1011, 1, 0, 0, 0, 1009, 1007, 1, 0, 0, 0, 1009,
    1010, 1, 0, 0, 0, 1010, 1012, 1, 0, 0, 0, 1011, 1009, 1, 0, 0, 0, 1012,
    1013, 3, 104, 52, 0, 1013, 1014, 5, 85, 0, 0, 1014, 1063, 1, 0, 0, 0, 1015,
    1016, 5, 17, 0, 0, 1016, 1026, 3, 104, 52, 0, 1017, 1018, 5, 56, 0, 0, 1018,
    1023, 3, 104, 52, 0, 1019, 1020, 5, 86, 0, 0, 1020, 1022, 3, 104, 52, 0,
    1021, 1019, 1, 0, 0, 0, 1022, 1025, 1, 0, 0, 0, 1023, 1021, 1, 0, 0, 0,
    1023, 1024, 1, 0, 0, 0, 1024, 1027, 1, 0, 0, 0, 1025, 1023, 1, 0, 0, 0,
    1026, 1017, 1, 0, 0, 0, 1026, 1027, 1, 0, 0, 0, 1027, 1028, 1, 0, 0, 0,
    1028, 1029, 5, 85, 0, 0, 1029, 1063, 1, 0, 0, 0, 1030, 1031, 5, 36, 0, 0,
    1031, 1041, 3, 104, 52, 0, 1032, 1033, 5, 56, 0, 0, 1033, 1038, 3, 104, 52,
    0, 1034, 1035, 5, 86, 0, 0, 1035, 1037, 3, 104, 52, 0, 1036, 1034, 1, 0, 0,
    0, 1037, 1040, 1, 0, 0, 0, 1038, 1036, 1, 0, 0, 0, 1038, 1039, 1, 0, 0, 0,
    1039, 1042, 1, 0, 0, 0, 1040, 1038, 1, 0, 0, 0, 1041, 1032, 1, 0, 0, 0,
    1041, 1042, 1, 0, 0, 0, 1042, 1043, 1, 0, 0, 0, 1043, 1044, 5, 85, 0, 0,
    1044, 1063, 1, 0, 0, 0, 1045, 1046, 5, 60, 0, 0, 1046, 1047, 3, 104, 52, 0,
    1047, 1048, 5, 85, 0, 0, 1048, 1063, 1, 0, 0, 0, 1049, 1050, 5, 41, 0, 0,
    1050, 1051, 3, 104, 52, 0, 1051, 1052, 5, 66, 0, 0, 1052, 1057, 3, 104, 52,
    0, 1053, 1054, 5, 86, 0, 0, 1054, 1056, 3, 104, 52, 0, 1055, 1053, 1, 0, 0,
    0, 1056, 1059, 1, 0, 0, 0, 1057, 1055, 1, 0, 0, 0, 1057, 1058, 1, 0, 0, 0,
    1058, 1060, 1, 0, 0, 0, 1059, 1057, 1, 0, 0, 0, 1060, 1061, 5, 85, 0, 0,
    1061, 1063, 1, 0, 0, 0, 1062, 1005, 1, 0, 0, 0, 1062, 1015, 1, 0, 0, 0,
    1062, 1030, 1, 0, 0, 0, 1062, 1045, 1, 0, 0, 0, 1062, 1049, 1, 0, 0, 0,
    1063, 145, 1, 0, 0, 0, 1064, 1065, 7, 3, 0, 0, 1065, 147, 1, 0, 0, 0, 1066,
    1067, 5, 43, 0, 0, 1067, 1069, 3, 164, 82, 0, 1068, 1070, 3, 18, 9, 0, 1069,
    1068, 1, 0, 0, 0, 1069, 1070, 1, 0, 0, 0, 1070, 1071, 1, 0, 0, 0, 1071,
    1074, 3, 150, 75, 0, 1072, 1073, 5, 25, 0, 0, 1073, 1075, 3, 244, 122, 0,
    1074, 1072, 1, 0, 0, 0, 1074, 1075, 1, 0, 0, 0, 1075, 1076, 1, 0, 0, 0,
    1076, 1077, 3, 156, 78, 0, 1077, 149, 1, 0, 0, 0, 1078, 1080, 5, 79, 0, 0,
    1079, 1081, 3, 152, 76, 0, 1080, 1079, 1, 0, 0, 0, 1080, 1081, 1, 0, 0, 0,
    1081, 1082, 1, 0, 0, 0, 1082, 1083, 5, 80, 0, 0, 1083, 151, 1, 0, 0, 0,
    1084, 1089, 3, 154, 77, 0, 1085, 1086, 5, 86, 0, 0, 1086, 1088, 3, 154, 77,
    0, 1087, 1085, 1, 0, 0, 0, 1088, 1091, 1, 0, 0, 0, 1089, 1087, 1, 0, 0, 0,
    1089, 1090, 1, 0, 0, 0, 1090, 1092, 1, 0, 0, 0, 1091, 1089, 1, 0, 0, 0,
    1092, 1093, 4, 76, 1, 0, 1093, 153, 1, 0, 0, 0, 1094, 1096, 3, 114, 57, 0,
    1095, 1094, 1, 0, 0, 0, 1096, 1099, 1, 0, 0, 0, 1097, 1095, 1, 0, 0, 0,
    1097, 1098, 1, 0, 0, 0, 1098, 1100, 1, 0, 0, 0, 1099, 1097, 1, 0, 0, 0,
    1100, 1108, 3, 246, 123, 0, 1101, 1103, 3, 114, 57, 0, 1102, 1101, 1, 0, 0,
    0, 1103, 1106, 1, 0, 0, 0, 1104, 1102, 1, 0, 0, 0, 1104, 1105, 1, 0, 0, 0,
    1105, 1107, 1, 0, 0, 0, 1106, 1104, 1, 0, 0, 0, 1107, 1109, 5, 125, 0, 0,
    1108, 1104, 1, 0, 0, 0, 1108, 1109, 1, 0, 0, 0, 1109, 1110, 1, 0, 0, 0,
    1110, 1111, 3, 164, 82, 0, 1111, 155, 1, 0, 0, 0, 1112, 1117, 5, 81, 0, 0,
    1113, 1116, 3, 38, 19, 0, 1114, 1116, 3, 54, 27, 0, 1115, 1113, 1, 0, 0, 0,
    1115, 1114, 1, 0, 0, 0, 1116, 1119, 1, 0, 0, 0, 1117, 1115, 1, 0, 0, 0,
    1117, 1118, 1, 0, 0, 0, 1118, 1120, 1, 0, 0, 0, 1119, 1117, 1, 0, 0, 0,
    1120, 1121, 5, 82, 0, 0, 1121, 157, 1, 0, 0, 0, 1122, 1126, 5, 81, 0, 0,
    1123, 1125, 3, 160, 80, 0, 1124, 1123, 1, 0, 0, 0, 1125, 1128, 1, 0, 0, 0,
    1126, 1124, 1, 0, 0, 0, 1126, 1127, 1, 0, 0, 0, 1127, 1129, 1, 0, 0, 0,
    1128, 1126, 1, 0, 0, 0, 1129, 1130, 5, 82, 0, 0, 1130, 159, 1, 0, 0, 0,
    1131, 1132, 3, 162, 81, 0, 1132, 1133, 5, 85, 0, 0, 1133, 1137, 1, 0, 0, 0,
    1134, 1137, 3, 168, 84, 0, 1135, 1137, 3, 170, 85, 0, 1136, 1131, 1, 0, 0,
    0, 1136, 1134, 1, 0, 0, 0, 1136, 1135, 1, 0, 0, 0, 1137, 161, 1, 0, 0, 0,
    1138, 1140, 3, 14, 7, 0, 1139, 1138, 1, 0, 0, 0, 1140, 1143, 1, 0, 0, 0,
    1141, 1139, 1, 0, 0, 0, 1141, 1142, 1, 0, 0, 0, 1142, 1152, 1, 0, 0, 0,
    1143, 1141, 1, 0, 0, 0, 1144, 1145, 5, 61, 0, 0, 1145, 1146, 3, 164, 82, 0,
    1146, 1147, 5, 88, 0, 0, 1147, 1148, 3, 198, 99, 0, 1148, 1153, 1, 0, 0, 0,
    1149, 1150, 3, 246, 123, 0, 1150, 1151, 3, 74, 37, 0, 1151, 1153, 1, 0, 0,
    0, 1152, 1144, 1, 0, 0, 0, 1152, 1149, 1, 0, 0, 0, 1153, 163, 1, 0, 0, 0,
    1154, 1155, 7, 4, 0, 0, 1155, 165, 1, 0, 0, 0, 1156, 1157, 7, 5, 0, 0, 1157,
    167, 1, 0, 0, 0, 1158, 1160, 3, 12, 6, 0, 1159, 1158, 1, 0, 0, 0, 1160,
    1163, 1, 0, 0, 0, 1161, 1159, 1, 0, 0, 0, 1161, 1162, 1, 0, 0, 0, 1162,
    1168, 1, 0, 0, 0, 1163, 1161, 1, 0, 0, 0, 1164, 1169, 3, 16, 8, 0, 1165,
    1169, 3, 32, 16, 0, 1166, 1169, 3, 148, 74, 0, 1167, 1169, 3, 24, 12, 0,
    1168, 1164, 1, 0, 0, 0, 1168, 1165, 1, 0, 0, 0, 1168, 1166, 1, 0, 0, 0,
    1168, 1167, 1, 0, 0, 0, 1169, 169, 1, 0, 0, 0, 1170, 1294, 3, 158, 79, 0,
    1171, 1172, 5, 2, 0, 0, 1172, 1175, 3, 198, 99, 0, 1173, 1174, 5, 94, 0, 0,
    1174, 1176, 3, 198, 99, 0, 1175, 1173, 1, 0, 0, 0, 1175, 1176, 1, 0, 0, 0,
    1176, 1177, 1, 0, 0, 0, 1177, 1178, 5, 85, 0, 0, 1178, 1294, 1, 0, 0, 0,
    1179, 1180, 5, 24, 0, 0, 1180, 1181, 5, 79, 0, 0, 1181, 1182, 3, 198, 99, 0,
    1182, 1183, 5, 80, 0, 0, 1183, 1186, 3, 170, 85, 0, 1184, 1185, 5, 15, 0, 0,
    1185, 1187, 3, 170, 85, 0, 1186, 1184, 1, 0, 0, 0, 1186, 1187, 1, 0, 0, 0,
    1187, 1294, 1, 0, 0, 0, 1188, 1189, 5, 22, 0, 0, 1189, 1190, 5, 79, 0, 0,
    1190, 1191, 3, 188, 94, 0, 1191, 1192, 5, 80, 0, 0, 1192, 1193, 3, 170, 85,
    0, 1193, 1294, 1, 0, 0, 0, 1194, 1195, 5, 65, 0, 0, 1195, 1196, 5, 79, 0, 0,
    1196, 1197, 3, 198, 99, 0, 1197, 1198, 5, 80, 0, 0, 1198, 1199, 3, 170, 85,
    0, 1199, 1294, 1, 0, 0, 0, 1200, 1201, 5, 13, 0, 0, 1201, 1202, 3, 170, 85,
    0, 1202, 1203, 5, 65, 0, 0, 1203, 1204, 5, 79, 0, 0, 1204, 1205, 3, 198, 99,
    0, 1205, 1206, 5, 80, 0, 0, 1206, 1207, 5, 85, 0, 0, 1207, 1294, 1, 0, 0, 0,
    1208, 1209, 5, 59, 0, 0, 1209, 1219, 3, 158, 79, 0, 1210, 1212, 3, 172, 86,
    0, 1211, 1210, 1, 0, 0, 0, 1212, 1213, 1, 0, 0, 0, 1213, 1211, 1, 0, 0, 0,
    1213, 1214, 1, 0, 0, 0, 1214, 1216, 1, 0, 0, 0, 1215, 1217, 3, 176, 88, 0,
    1216, 1215, 1, 0, 0, 0, 1216, 1217, 1, 0, 0, 0, 1217, 1220, 1, 0, 0, 0,
    1218, 1220, 3, 176, 88, 0, 1219, 1211, 1, 0, 0, 0, 1219, 1218, 1, 0, 0, 0,
    1220, 1294, 1, 0, 0, 0, 1221, 1222, 5, 59, 0, 0, 1222, 1223, 3, 178, 89, 0,
    1223, 1227, 3, 158, 79, 0, 1224, 1226, 3, 172, 86, 0, 1225, 1224, 1, 0, 0,
    0, 1226, 1229, 1, 0, 0, 0, 1227, 1225, 1, 0, 0, 0, 1227, 1228, 1, 0, 0, 0,
    1228, 1231, 1, 0, 0, 0, 1229, 1227, 1, 0, 0, 0, 1230, 1232, 3, 176, 88, 0,
    1231, 1230, 1, 0, 0, 0, 1231, 1232, 1, 0, 0, 0, 1232, 1294, 1, 0, 0, 0,
    1233, 1234, 5, 51, 0, 0, 1234, 1235, 5, 79, 0, 0, 1235, 1236, 3, 198, 99, 0,
    1236, 1237, 5, 80, 0, 0, 1237, 1241, 5, 81, 0, 0, 1238, 1240, 3, 184, 92, 0,
    1239, 1238, 1, 0, 0, 0, 1240, 1243, 1, 0, 0, 0, 1241, 1239, 1, 0, 0, 0,
    1241, 1242, 1, 0, 0, 0, 1242, 1247, 1, 0, 0, 0, 1243, 1241, 1, 0, 0, 0,
    1244, 1246, 3, 186, 93, 0, 1245, 1244, 1, 0, 0, 0, 1246, 1249, 1, 0, 0, 0,
    1247, 1245, 1, 0, 0, 0, 1247, 1248, 1, 0, 0, 0, 1248, 1250, 1, 0, 0, 0,
    1249, 1247, 1, 0, 0, 0, 1250, 1251, 5, 82, 0, 0, 1251, 1294, 1, 0, 0, 0,
    1252, 1253, 5, 52, 0, 0, 1253, 1254, 5, 79, 0, 0, 1254, 1255, 3, 198, 99, 0,
    1255, 1256, 5, 80, 0, 0, 1256, 1257, 3, 158, 79, 0, 1257, 1294, 1, 0, 0, 0,
    1258, 1260, 5, 45, 0, 0, 1259, 1261, 3, 198, 99, 0, 1260, 1259, 1, 0, 0, 0,
    1260, 1261, 1, 0, 0, 0, 1261, 1262, 1, 0, 0, 0, 1262, 1294, 5, 85, 0, 0,
    1263, 1264, 5, 54, 0, 0, 1264, 1265, 3, 198, 99, 0, 1265, 1266, 5, 85, 0, 0,
    1266, 1294, 1, 0, 0, 0, 1267, 1269, 5, 4, 0, 0, 1268, 1270, 3, 164, 82, 0,
    1269, 1268, 1, 0, 0, 0, 1269, 1270, 1, 0, 0, 0, 1270, 1271, 1, 0, 0, 0,
    1271, 1294, 5, 85, 0, 0, 1272, 1274, 5, 11, 0, 0, 1273, 1275, 3, 164, 82, 0,
    1274, 1273, 1, 0, 0, 0, 1274, 1275, 1, 0, 0, 0, 1275, 1276, 1, 0, 0, 0,
    1276, 1294, 5, 85, 0, 0, 1277, 1278, 5, 67, 0, 0, 1278, 1279, 3, 198, 99, 0,
    1279, 1280, 5, 85, 0, 0, 1280, 1294, 1, 0, 0, 0, 1281, 1294, 5, 85, 0, 0,
    1282, 1283, 3, 198, 99, 0, 1283, 1284, 5, 85, 0, 0, 1284, 1294, 1, 0, 0, 0,
    1285, 1287, 3, 214, 107, 0, 1286, 1288, 5, 85, 0, 0, 1287, 1286, 1, 0, 0, 0,
    1287, 1288, 1, 0, 0, 0, 1288, 1294, 1, 0, 0, 0, 1289, 1290, 3, 164, 82, 0,
    1290, 1291, 5, 94, 0, 0, 1291, 1292, 3, 170, 85, 0, 1292, 1294, 1, 0, 0, 0,
    1293, 1170, 1, 0, 0, 0, 1293, 1171, 1, 0, 0, 0, 1293, 1179, 1, 0, 0, 0,
    1293, 1188, 1, 0, 0, 0, 1293, 1194, 1, 0, 0, 0, 1293, 1200, 1, 0, 0, 0,
    1293, 1208, 1, 0, 0, 0, 1293, 1221, 1, 0, 0, 0, 1293, 1233, 1, 0, 0, 0,
    1293, 1252, 1, 0, 0, 0, 1293, 1258, 1, 0, 0, 0, 1293, 1263, 1, 0, 0, 0,
    1293, 1267, 1, 0, 0, 0, 1293, 1272, 1, 0, 0, 0, 1293, 1277, 1, 0, 0, 0,
    1293, 1281, 1, 0, 0, 0, 1293, 1282, 1, 0, 0, 0, 1293, 1285, 1, 0, 0, 0,
    1293, 1289, 1, 0, 0, 0, 1294, 171, 1, 0, 0, 0, 1295, 1296, 5, 7, 0, 0, 1296,
    1300, 5, 79, 0, 0, 1297, 1299, 3, 14, 7, 0, 1298, 1297, 1, 0, 0, 0, 1299,
    1302, 1, 0, 0, 0, 1300, 1298, 1, 0, 0, 0, 1300, 1301, 1, 0, 0, 0, 1301,
    1303, 1, 0, 0, 0, 1302, 1300, 1, 0, 0, 0, 1303, 1304, 3, 174, 87, 0, 1304,
    1305, 3, 164, 82, 0, 1305, 1306, 5, 80, 0, 0, 1306, 1307, 3, 158, 79, 0,
    1307, 173, 1, 0, 0, 0, 1308, 1313, 3, 104, 52, 0, 1309, 1310, 5, 108, 0, 0,
    1310, 1312, 3, 104, 52, 0, 1311, 1309, 1, 0, 0, 0, 1312, 1315, 1, 0, 0, 0,
    1313, 1311, 1, 0, 0, 0, 1313, 1314, 1, 0, 0, 0, 1314, 175, 1, 0, 0, 0, 1315,
    1313, 1, 0, 0, 0, 1316, 1317, 5, 20, 0, 0, 1317, 1318, 3, 158, 79, 0, 1318,
    177, 1, 0, 0, 0, 1319, 1320, 5, 79, 0, 0, 1320, 1322, 3, 180, 90, 0, 1321,
    1323, 5, 85, 0, 0, 1322, 1321, 1, 0, 0, 0, 1322, 1323, 1, 0, 0, 0, 1323,
    1324, 1, 0, 0, 0, 1324, 1325, 5, 80, 0, 0, 1325, 179, 1, 0, 0, 0, 1326,
    1331, 3, 182, 91, 0, 1327, 1328, 5, 85, 0, 0, 1328, 1330, 3, 182, 91, 0,
    1329, 1327, 1, 0, 0, 0, 1330, 1333, 1, 0, 0, 0, 1331, 1329, 1, 0, 0, 0,
    1331, 1332, 1, 0, 0, 0, 1332, 181, 1, 0, 0, 0, 1333, 1331, 1, 0, 0, 0, 1334,
    1336, 3, 14, 7, 0, 1335, 1334, 1, 0, 0, 0, 1336, 1339, 1, 0, 0, 0, 1337,
    1335, 1, 0, 0, 0, 1337, 1338, 1, 0, 0, 0, 1338, 1345, 1, 0, 0, 0, 1339,
    1337, 1, 0, 0, 0, 1340, 1341, 3, 224, 112, 0, 1341, 1342, 3, 78, 39, 0,
    1342, 1346, 1, 0, 0, 0, 1343, 1344, 5, 61, 0, 0, 1344, 1346, 3, 164, 82, 0,
    1345, 1340, 1, 0, 0, 0, 1345, 1343, 1, 0, 0, 0, 1346, 1347, 1, 0, 0, 0,
    1347, 1348, 5, 88, 0, 0, 1348, 1349, 3, 198, 99, 0, 1349, 1352, 1, 0, 0, 0,
    1350, 1352, 3, 104, 52, 0, 1351, 1337, 1, 0, 0, 0, 1351, 1350, 1, 0, 0, 0,
    1352, 183, 1, 0, 0, 0, 1353, 1354, 3, 186, 93, 0, 1354, 1355, 5, 94, 0, 0,
    1355, 1357, 1, 0, 0, 0, 1356, 1353, 1, 0, 0, 0, 1357, 1358, 1, 0, 0, 0,
    1358, 1356, 1, 0, 0, 0, 1358, 1359, 1, 0, 0, 0, 1359, 1361, 1, 0, 0, 0,
    1360, 1362, 3, 160, 80, 0, 1361, 1360, 1, 0, 0, 0, 1362, 1363, 1, 0, 0, 0,
    1363, 1361, 1, 0, 0, 0, 1363, 1364, 1, 0, 0, 0, 1364, 185, 1, 0, 0, 0, 1365,
    1371, 5, 6, 0, 0, 1366, 1372, 3, 198, 99, 0, 1367, 1372, 5, 129, 0, 0, 1368,
    1369, 3, 246, 123, 0, 1369, 1370, 3, 164, 82, 0, 1370, 1372, 1, 0, 0, 0,
    1371, 1366, 1, 0, 0, 0, 1371, 1367, 1, 0, 0, 0, 1371, 1368, 1, 0, 0, 0,
    1372, 1375, 1, 0, 0, 0, 1373, 1375, 5, 12, 0, 0, 1374, 1365, 1, 0, 0, 0,
    1374, 1373, 1, 0, 0, 0, 1375, 187, 1, 0, 0, 0, 1376, 1389, 3, 192, 96, 0,
    1377, 1379, 3, 190, 95, 0, 1378, 1377, 1, 0, 0, 0, 1378, 1379, 1, 0, 0, 0,
    1379, 1380, 1, 0, 0, 0, 1380, 1382, 5, 85, 0, 0, 1381, 1383, 3, 198, 99, 0,
    1382, 1381, 1, 0, 0, 0, 1382, 1383, 1, 0, 0, 0, 1383, 1384, 1, 0, 0, 0,
    1384, 1386, 5, 85, 0, 0, 1385, 1387, 3, 194, 97, 0, 1386, 1385, 1, 0, 0, 0,
    1386, 1387, 1, 0, 0, 0, 1387, 1389, 1, 0, 0, 0, 1388, 1376, 1, 0, 0, 0,
    1388, 1378, 1, 0, 0, 0, 1389, 189, 1, 0, 0, 0, 1390, 1393, 3, 162, 81, 0,
    1391, 1393, 3, 194, 97, 0, 1392, 1390, 1, 0, 0, 0, 1392, 1391, 1, 0, 0, 0,
    1393, 191, 1, 0, 0, 0, 1394, 1396, 3, 14, 7, 0, 1395, 1394, 1, 0, 0, 0,
    1396, 1399, 1, 0, 0, 0, 1397, 1395, 1, 0, 0, 0, 1397, 1398, 1, 0, 0, 0,
    1398, 1402, 1, 0, 0, 0, 1399, 1397, 1, 0, 0, 0, 1400, 1403, 3, 246, 123, 0,
    1401, 1403, 5, 61, 0, 0, 1402, 1400, 1, 0, 0, 0, 1402, 1401, 1, 0, 0, 0,
    1403, 1404, 1, 0, 0, 0, 1404, 1405, 3, 78, 39, 0, 1405, 1406, 5, 94, 0, 0,
    1406, 1407, 3, 198, 99, 0, 1407, 193, 1, 0, 0, 0, 1408, 1413, 3, 198, 99, 0,
    1409, 1410, 5, 86, 0, 0, 1410, 1412, 3, 198, 99, 0, 1411, 1409, 1, 0, 0, 0,
    1412, 1415, 1, 0, 0, 0, 1413, 1411, 1, 0, 0, 0, 1413, 1414, 1, 0, 0, 0,
    1414, 195, 1, 0, 0, 0, 1415, 1413, 1, 0, 0, 0, 1416, 1420, 3, 164, 82, 0,
    1417, 1420, 5, 53, 0, 0, 1418, 1420, 5, 50, 0, 0, 1419, 1416, 1, 0, 0, 0,
    1419, 1417, 1, 0, 0, 0, 1419, 1418, 1, 0, 0, 0, 1420, 1421, 1, 0, 0, 0,
    1421, 1422, 3, 256, 128, 0, 1422, 197, 1, 0, 0, 0, 1423, 1424, 6, 99, -1, 0,
    1424, 1467, 3, 212, 106, 0, 1425, 1467, 3, 196, 98, 0, 1426, 1427, 3, 246,
    123, 0, 1427, 1433, 5, 123, 0, 0, 1428, 1430, 3, 250, 125, 0, 1429, 1428, 1,
    0, 0, 0, 1429, 1430, 1, 0, 0, 0, 1430, 1431, 1, 0, 0, 0, 1431, 1434, 3, 164,
    82, 0, 1432, 1434, 5, 33, 0, 0, 1433, 1429, 1, 0, 0, 0, 1433, 1432, 1, 0, 0,
    0, 1434, 1467, 1, 0, 0, 0, 1435, 1436, 3, 84, 42, 0, 1436, 1438, 5, 123, 0,
    0, 1437, 1439, 3, 250, 125, 0, 1438, 1437, 1, 0, 0, 0, 1438, 1439, 1, 0, 0,
    0, 1439, 1440, 1, 0, 0, 0, 1440, 1441, 5, 33, 0, 0, 1441, 1467, 1, 0, 0, 0,
    1442, 1467, 3, 214, 107, 0, 1443, 1444, 7, 6, 0, 0, 1444, 1467, 3, 198, 99,
    17, 1445, 1449, 5, 79, 0, 0, 1446, 1448, 3, 114, 57, 0, 1447, 1446, 1, 0, 0,
    0, 1448, 1451, 1, 0, 0, 0, 1449, 1447, 1, 0, 0, 0, 1449, 1450, 1, 0, 0, 0,
    1450, 1452, 1, 0, 0, 0, 1451, 1449, 1, 0, 0, 0, 1452, 1457, 3, 246, 123, 0,
    1453, 1454, 5, 107, 0, 0, 1454, 1456, 3, 246, 123, 0, 1455, 1453, 1, 0, 0,
    0, 1456, 1459, 1, 0, 0, 0, 1457, 1455, 1, 0, 0, 0, 1457, 1458, 1, 0, 0, 0,
    1458, 1460, 1, 0, 0, 0, 1459, 1457, 1, 0, 0, 0, 1460, 1461, 5, 80, 0, 0,
    1461, 1462, 3, 198, 99, 16, 1462, 1467, 1, 0, 0, 0, 1463, 1464, 5, 33, 0, 0,
    1464, 1467, 3, 226, 113, 0, 1465, 1467, 3, 206, 103, 0, 1466, 1423, 1, 0, 0,
    0, 1466, 1425, 1, 0, 0, 0, 1466, 1426, 1, 0, 0, 0, 1466, 1435, 1, 0, 0, 0,
    1466, 1442, 1, 0, 0, 0, 1466, 1443, 1, 0, 0, 0, 1466, 1445, 1, 0, 0, 0,
    1466, 1463, 1, 0, 0, 0, 1466, 1465, 1, 0, 0, 0, 1467, 1551, 1, 0, 0, 0,
    1468, 1469, 10, 14, 0, 0, 1469, 1470, 7, 7, 0, 0, 1470, 1550, 3, 198, 99,
    15, 1471, 1472, 10, 13, 0, 0, 1472, 1473, 7, 8, 0, 0, 1473, 1550, 3, 198,
    99, 14, 1474, 1482, 10, 12, 0, 0, 1475, 1476, 5, 90, 0, 0, 1476, 1483, 5,
    90, 0, 0, 1477, 1478, 5, 89, 0, 0, 1478, 1479, 5, 89, 0, 0, 1479, 1483, 5,
    89, 0, 0, 1480, 1481, 5, 89, 0, 0, 1481, 1483, 5, 89, 0, 0, 1482, 1475, 1,
    0, 0, 0, 1482, 1477, 1, 0, 0, 0, 1482, 1480, 1, 0, 0, 0, 1483, 1484, 1, 0,
    0, 0, 1484, 1550, 3, 198, 99, 13, 1485, 1486, 10, 11, 0, 0, 1486, 1487, 7,
    9, 0, 0, 1487, 1550, 3, 198, 99, 12, 1488, 1489, 10, 9, 0, 0, 1489, 1490, 7,
    10, 0, 0, 1490, 1550, 3, 198, 99, 10, 1491, 1492, 10, 8, 0, 0, 1492, 1493,
    5, 107, 0, 0, 1493, 1550, 3, 198, 99, 9, 1494, 1495, 10, 7, 0, 0, 1495,
    1496, 5, 109, 0, 0, 1496, 1550, 3, 198, 99, 8, 1497, 1498, 10, 6, 0, 0,
    1498, 1499, 5, 108, 0, 0, 1499, 1550, 3, 198, 99, 7, 1500, 1501, 10, 5, 0,
    0, 1501, 1502, 5, 99, 0, 0, 1502, 1550, 3, 198, 99, 6, 1503, 1504, 10, 4, 0,
    0, 1504, 1505, 5, 100, 0, 0, 1505, 1550, 3, 198, 99, 5, 1506, 1507, 10, 3,
    0, 0, 1507, 1508, 5, 93, 0, 0, 1508, 1509, 3, 198, 99, 0, 1509, 1510, 5, 94,
    0, 0, 1510, 1511, 3, 198, 99, 3, 1511, 1550, 1, 0, 0, 0, 1512, 1513, 10, 2,
    0, 0, 1513, 1514, 7, 11, 0, 0, 1514, 1550, 3, 198, 99, 2, 1515, 1516, 10,
    25, 0, 0, 1516, 1517, 5, 83, 0, 0, 1517, 1518, 3, 198, 99, 0, 1518, 1519, 5,
    84, 0, 0, 1519, 1550, 1, 0, 0, 0, 1520, 1521, 10, 24, 0, 0, 1521, 1533, 5,
    87, 0, 0, 1522, 1534, 3, 164, 82, 0, 1523, 1534, 3, 196, 98, 0, 1524, 1534,
    5, 53, 0, 0, 1525, 1527, 5, 33, 0, 0, 1526, 1528, 3, 242, 121, 0, 1527,
    1526, 1, 0, 0, 0, 1527, 1528, 1, 0, 0, 0, 1528, 1529, 1, 0, 0, 0, 1529,
    1534, 3, 230, 115, 0, 1530, 1531, 5, 50, 0, 0, 1531, 1534, 3, 252, 126, 0,
    1532, 1534, 3, 236, 118, 0, 1533, 1522, 1, 0, 0, 0, 1533, 1523, 1, 0, 0, 0,
    1533, 1524, 1, 0, 0, 0, 1533, 1525, 1, 0, 0, 0, 1533, 1530, 1, 0, 0, 0,
    1533, 1532, 1, 0, 0, 0, 1534, 1550, 1, 0, 0, 0, 1535, 1536, 10, 22, 0, 0,
    1536, 1538, 5, 123, 0, 0, 1537, 1539, 3, 250, 125, 0, 1538, 1537, 1, 0, 0,
    0, 1538, 1539, 1, 0, 0, 0, 1539, 1540, 1, 0, 0, 0, 1540, 1550, 3, 164, 82,
    0, 1541, 1542, 10, 18, 0, 0, 1542, 1550, 7, 12, 0, 0, 1543, 1544, 10, 10, 0,
    0, 1544, 1547, 5, 27, 0, 0, 1545, 1548, 3, 246, 123, 0, 1546, 1548, 3, 200,
    100, 0, 1547, 1545, 1, 0, 0, 0, 1547, 1546, 1, 0, 0, 0, 1548, 1550, 1, 0, 0,
    0, 1549, 1468, 1, 0, 0, 0, 1549, 1471, 1, 0, 0, 0, 1549, 1474, 1, 0, 0, 0,
    1549, 1485, 1, 0, 0, 0, 1549, 1488, 1, 0, 0, 0, 1549, 1491, 1, 0, 0, 0,
    1549, 1494, 1, 0, 0, 0, 1549, 1497, 1, 0, 0, 0, 1549, 1500, 1, 0, 0, 0,
    1549, 1503, 1, 0, 0, 0, 1549, 1506, 1, 0, 0, 0, 1549, 1512, 1, 0, 0, 0,
    1549, 1515, 1, 0, 0, 0, 1549, 1520, 1, 0, 0, 0, 1549, 1535, 1, 0, 0, 0,
    1549, 1541, 1, 0, 0, 0, 1549, 1543, 1, 0, 0, 0, 1550, 1553, 1, 0, 0, 0,
    1551, 1549, 1, 0, 0, 0, 1551, 1552, 1, 0, 0, 0, 1552, 199, 1, 0, 0, 0, 1553,
    1551, 1, 0, 0, 0, 1554, 1556, 3, 14, 7, 0, 1555, 1554, 1, 0, 0, 0, 1556,
    1559, 1, 0, 0, 0, 1557, 1555, 1, 0, 0, 0, 1557, 1558, 1, 0, 0, 0, 1558,
    1560, 1, 0, 0, 0, 1559, 1557, 1, 0, 0, 0, 1560, 1564, 3, 246, 123, 0, 1561,
    1563, 3, 114, 57, 0, 1562, 1561, 1, 0, 0, 0, 1563, 1566, 1, 0, 0, 0, 1564,
    1562, 1, 0, 0, 0, 1564, 1565, 1, 0, 0, 0, 1565, 1567, 1, 0, 0, 0, 1566,
    1564, 1, 0, 0, 0, 1567, 1568, 3, 74, 37, 0, 1568, 1577, 1, 0, 0, 0, 1569,
    1570, 3, 246, 123, 0, 1570, 1572, 5, 79, 0, 0, 1571, 1573, 3, 202, 101, 0,
    1572, 1571, 1, 0, 0, 0, 1572, 1573, 1, 0, 0, 0, 1573, 1574, 1, 0, 0, 0,
    1574, 1575, 5, 80, 0, 0, 1575, 1577, 1, 0, 0, 0, 1576, 1557, 1, 0, 0, 0,
    1576, 1569, 1, 0, 0, 0, 1577, 201, 1, 0, 0, 0, 1578, 1583, 3, 204, 102, 0,
    1579, 1580, 5, 86, 0, 0, 1580, 1582, 3, 204, 102, 0, 1581, 1579, 1, 0, 0, 0,
    1582, 1585, 1, 0, 0, 0, 1583, 1581, 1, 0, 0, 0, 1583, 1584, 1, 0, 0, 0,
    1584, 203, 1, 0, 0, 0, 1585, 1583, 1, 0, 0, 0, 1586, 1587, 3, 200, 100, 0,
    1587, 205, 1, 0, 0, 0, 1588, 1589, 3, 208, 104, 0, 1589, 1590, 5, 122, 0, 0,
    1590, 1591, 3, 210, 105, 0, 1591, 207, 1, 0, 0, 0, 1592, 1615, 3, 164, 82,
    0, 1593, 1595, 5, 79, 0, 0, 1594, 1596, 3, 96, 48, 0, 1595, 1594, 1, 0, 0,
    0, 1595, 1596, 1, 0, 0, 0, 1596, 1597, 1, 0, 0, 0, 1597, 1615, 5, 80, 0, 0,
    1598, 1599, 5, 79, 0, 0, 1599, 1604, 3, 164, 82, 0, 1600, 1601, 5, 86, 0, 0,
    1601, 1603, 3, 164, 82, 0, 1602, 1600, 1, 0, 0, 0, 1603, 1606, 1, 0, 0, 0,
    1604, 1602, 1, 0, 0, 0, 1604, 1605, 1, 0, 0, 0, 1605, 1607, 1, 0, 0, 0,
    1606, 1604, 1, 0, 0, 0, 1607, 1608, 5, 80, 0, 0, 1608, 1615, 1, 0, 0, 0,
    1609, 1611, 5, 79, 0, 0, 1610, 1612, 3, 100, 50, 0, 1611, 1610, 1, 0, 0, 0,
    1611, 1612, 1, 0, 0, 0, 1612, 1613, 1, 0, 0, 0, 1613, 1615, 5, 80, 0, 0,
    1614, 1592, 1, 0, 0, 0, 1614, 1593, 1, 0, 0, 0, 1614, 1598, 1, 0, 0, 0,
    1614, 1609, 1, 0, 0, 0, 1615, 209, 1, 0, 0, 0, 1616, 1619, 3, 198, 99, 0,
    1617, 1619, 3, 158, 79, 0, 1618, 1616, 1, 0, 0, 0, 1618, 1617, 1, 0, 0, 0,
    1619, 211, 1, 0, 0, 0, 1620, 1621, 5, 79, 0, 0, 1621, 1622, 3, 198, 99, 0,
    1622, 1623, 5, 80, 0, 0, 1623, 1639, 1, 0, 0, 0, 1624, 1639, 5, 53, 0, 0,
    1625, 1639, 5, 50, 0, 0, 1626, 1639, 3, 106, 53, 0, 1627, 1639, 3, 164, 82,
    0, 1628, 1629, 3, 46, 23, 0, 1629, 1630, 5, 87, 0, 0, 1630, 1631, 5, 9, 0,
    0, 1631, 1639, 1, 0, 0, 0, 1632, 1636, 3, 242, 121, 0, 1633, 1637, 3, 254,
    127, 0, 1634, 1635, 5, 53, 0, 0, 1635, 1637, 3, 256, 128, 0, 1636, 1633, 1,
    0, 0, 0, 1636, 1634, 1, 0, 0, 0, 1637, 1639, 1, 0, 0, 0, 1638, 1620, 1, 0,
    0, 0, 1638, 1624, 1, 0, 0, 0, 1638, 1625, 1, 0, 0, 0, 1638, 1626, 1, 0, 0,
    0, 1638, 1627, 1, 0, 0, 0, 1638, 1628, 1, 0, 0, 0, 1638, 1632, 1, 0, 0, 0,
    1639, 213, 1, 0, 0, 0, 1640, 1641, 5, 51, 0, 0, 1641, 1642, 5, 79, 0, 0,
    1642, 1643, 3, 198, 99, 0, 1643, 1644, 5, 80, 0, 0, 1644, 1648, 5, 81, 0, 0,
    1645, 1647, 3, 216, 108, 0, 1646, 1645, 1, 0, 0, 0, 1647, 1650, 1, 0, 0, 0,
    1648, 1646, 1, 0, 0, 0, 1648, 1649, 1, 0, 0, 0, 1649, 1651, 1, 0, 0, 0,
    1650, 1648, 1, 0, 0, 0, 1651, 1652, 5, 82, 0, 0, 1652, 215, 1, 0, 0, 0,
    1653, 1671, 5, 6, 0, 0, 1654, 1672, 3, 194, 97, 0, 1655, 1658, 5, 78, 0, 0,
    1656, 1657, 5, 86, 0, 0, 1657, 1659, 5, 12, 0, 0, 1658, 1656, 1, 0, 0, 0,
    1658, 1659, 1, 0, 0, 0, 1659, 1672, 1, 0, 0, 0, 1660, 1665, 3, 220, 110, 0,
    1661, 1662, 5, 86, 0, 0, 1662, 1664, 3, 220, 110, 0, 1663, 1661, 1, 0, 0, 0,
    1664, 1667, 1, 0, 0, 0, 1665, 1663, 1, 0, 0, 0, 1665, 1666, 1, 0, 0, 0,
    1666, 1669, 1, 0, 0, 0, 1667, 1665, 1, 0, 0, 0, 1668, 1670, 3, 218, 109, 0,
    1669, 1668, 1, 0, 0, 0, 1669, 1670, 1, 0, 0, 0, 1670, 1672, 1, 0, 0, 0,
    1671, 1654, 1, 0, 0, 0, 1671, 1655, 1, 0, 0, 0, 1671, 1660, 1, 0, 0, 0,
    1672, 1673, 1, 0, 0, 0, 1673, 1674, 7, 13, 0, 0, 1674, 1679, 3, 222, 111, 0,
    1675, 1676, 5, 12, 0, 0, 1676, 1677, 7, 13, 0, 0, 1677, 1679, 3, 222, 111,
    0, 1678, 1653, 1, 0, 0, 0, 1678, 1675, 1, 0, 0, 0, 1679, 217, 1, 0, 0, 0,
    1680, 1681, 5, 64, 0, 0, 1681, 1682, 3, 198, 99, 0, 1682, 219, 1, 0, 0, 0,
    1683, 1684, 3, 200, 100, 0, 1684, 221, 1, 0, 0, 0, 1685, 1693, 3, 158, 79,
    0, 1686, 1688, 3, 160, 80, 0, 1687, 1686, 1, 0, 0, 0, 1688, 1691, 1, 0, 0,
    0, 1689, 1687, 1, 0, 0, 0, 1689, 1690, 1, 0, 0, 0, 1690, 1693, 1, 0, 0, 0,
    1691, 1689, 1, 0, 0, 0, 1692, 1685, 1, 0, 0, 0, 1692, 1689, 1, 0, 0, 0,
    1693, 223, 1, 0, 0, 0, 1694, 1695, 3, 84, 42, 0, 1695, 225, 1, 0, 0, 0,
    1696, 1698, 3, 242, 121, 0, 1697, 1696, 1, 0, 0, 0, 1697, 1698, 1, 0, 0, 0,
    1698, 1699, 1, 0, 0, 0, 1699, 1700, 3, 228, 114, 0, 1700, 1701, 3, 234, 117,
    0, 1701, 1706, 1, 0, 0, 0, 1702, 1703, 3, 228, 114, 0, 1703, 1704, 3, 232,
    116, 0, 1704, 1706, 1, 0, 0, 0, 1705, 1697, 1, 0, 0, 0, 1705, 1702, 1, 0, 0,
    0, 1706, 227, 1, 0, 0, 0, 1707, 1709, 3, 164, 82, 0, 1708, 1710, 3, 238,
    119, 0, 1709, 1708, 1, 0, 0, 0, 1709, 1710, 1, 0, 0, 0, 1710, 1718, 1, 0, 0,
    0, 1711, 1712, 5, 87, 0, 0, 1712, 1714, 3, 164, 82, 0, 1713, 1715, 3, 238,
    119, 0, 1714, 1713, 1, 0, 0, 0, 1714, 1715, 1, 0, 0, 0, 1715, 1717, 1, 0, 0,
    0, 1716, 1711, 1, 0, 0, 0, 1717, 1720, 1, 0, 0, 0, 1718, 1716, 1, 0, 0, 0,
    1718, 1719, 1, 0, 0, 0, 1719, 1723, 1, 0, 0, 0, 1720, 1718, 1, 0, 0, 0,
    1721, 1723, 3, 248, 124, 0, 1722, 1707, 1, 0, 0, 0, 1722, 1721, 1, 0, 0, 0,
    1723, 229, 1, 0, 0, 0, 1724, 1726, 3, 164, 82, 0, 1725, 1727, 3, 240, 120,
    0, 1726, 1725, 1, 0, 0, 0, 1726, 1727, 1, 0, 0, 0, 1727, 1728, 1, 0, 0, 0,
    1728, 1729, 3, 234, 117, 0, 1729, 231, 1, 0, 0, 0, 1730, 1731, 5, 83, 0, 0,
    1731, 1733, 5, 84, 0, 0, 1732, 1730, 1, 0, 0, 0, 1733, 1734, 1, 0, 0, 0,
    1734, 1732, 1, 0, 0, 0, 1734, 1735, 1, 0, 0, 0, 1735, 1736, 1, 0, 0, 0,
    1736, 1753, 3, 82, 41, 0, 1737, 1738, 5, 83, 0, 0, 1738, 1739, 3, 198, 99,
    0, 1739, 1740, 5, 84, 0, 0, 1740, 1742, 1, 0, 0, 0, 1741, 1737, 1, 0, 0, 0,
    1742, 1743, 1, 0, 0, 0, 1743, 1741, 1, 0, 0, 0, 1743, 1744, 1, 0, 0, 0,
    1744, 1749, 1, 0, 0, 0, 1745, 1746, 5, 83, 0, 0, 1746, 1748, 5, 84, 0, 0,
    1747, 1745, 1, 0, 0, 0, 1748, 1751, 1, 0, 0, 0, 1749, 1747, 1, 0, 0, 0,
    1749, 1750, 1, 0, 0, 0, 1750, 1753, 1, 0, 0, 0, 1751, 1749, 1, 0, 0, 0,
    1752, 1732, 1, 0, 0, 0, 1752, 1741, 1, 0, 0, 0, 1753, 233, 1, 0, 0, 0, 1754,
    1756, 3, 256, 128, 0, 1755, 1757, 3, 34, 17, 0, 1756, 1755, 1, 0, 0, 0,
    1756, 1757, 1, 0, 0, 0, 1757, 235, 1, 0, 0, 0, 1758, 1759, 3, 242, 121, 0,
    1759, 1760, 3, 254, 127, 0, 1760, 237, 1, 0, 0, 0, 1761, 1762, 5, 90, 0, 0,
    1762, 1765, 5, 89, 0, 0, 1763, 1765, 3, 250, 125, 0, 1764, 1761, 1, 0, 0, 0,
    1764, 1763, 1, 0, 0, 0, 1765, 239, 1, 0, 0, 0, 1766, 1767, 5, 90, 0, 0,
    1767, 1770, 5, 89, 0, 0, 1768, 1770, 3, 242, 121, 0, 1769, 1766, 1, 0, 0, 0,
    1769, 1768, 1, 0, 0, 0, 1770, 241, 1, 0, 0, 0, 1771, 1772, 5, 90, 0, 0,
    1772, 1773, 3, 244, 122, 0, 1773, 1774, 5, 89, 0, 0, 1774, 243, 1, 0, 0, 0,
    1775, 1780, 3, 246, 123, 0, 1776, 1777, 5, 86, 0, 0, 1777, 1779, 3, 246,
    123, 0, 1778, 1776, 1, 0, 0, 0, 1779, 1782, 1, 0, 0, 0, 1780, 1778, 1, 0, 0,
    0, 1780, 1781, 1, 0, 0, 0, 1781, 245, 1, 0, 0, 0, 1782, 1780, 1, 0, 0, 0,
    1783, 1785, 3, 114, 57, 0, 1784, 1783, 1, 0, 0, 0, 1785, 1788, 1, 0, 0, 0,
    1786, 1784, 1, 0, 0, 0, 1786, 1787, 1, 0, 0, 0, 1787, 1791, 1, 0, 0, 0,
    1788, 1786, 1, 0, 0, 0, 1789, 1792, 3, 224, 112, 0, 1790, 1792, 3, 248, 124,
    0, 1791, 1789, 1, 0, 0, 0, 1791, 1790, 1, 0, 0, 0, 1792, 1803, 1, 0, 0, 0,
    1793, 1795, 3, 114, 57, 0, 1794, 1793, 1, 0, 0, 0, 1795, 1798, 1, 0, 0, 0,
    1796, 1794, 1, 0, 0, 0, 1796, 1797, 1, 0, 0, 0, 1797, 1799, 1, 0, 0, 0,
    1798, 1796, 1, 0, 0, 0, 1799, 1800, 5, 83, 0, 0, 1800, 1802, 5, 84, 0, 0,
    1801, 1796, 1, 0, 0, 0, 1802, 1805, 1, 0, 0, 0, 1803, 1801, 1, 0, 0, 0,
    1803, 1804, 1, 0, 0, 0, 1804, 247, 1, 0, 0, 0, 1805, 1803, 1, 0, 0, 0, 1806,
    1807, 7, 14, 0, 0, 1807, 249, 1, 0, 0, 0, 1808, 1809, 5, 90, 0, 0, 1809,
    1814, 3, 88, 44, 0, 1810, 1811, 5, 86, 0, 0, 1811, 1813, 3, 88, 44, 0, 1812,
    1810, 1, 0, 0, 0, 1813, 1816, 1, 0, 0, 0, 1814, 1812, 1, 0, 0, 0, 1814,
    1815, 1, 0, 0, 0, 1815, 1817, 1, 0, 0, 0, 1816, 1814, 1, 0, 0, 0, 1817,
    1818, 5, 89, 0, 0, 1818, 251, 1, 0, 0, 0, 1819, 1829, 3, 256, 128, 0, 1820,
    1822, 5, 87, 0, 0, 1821, 1823, 3, 250, 125, 0, 1822, 1821, 1, 0, 0, 0, 1822,
    1823, 1, 0, 0, 0, 1823, 1824, 1, 0, 0, 0, 1824, 1826, 3, 164, 82, 0, 1825,
    1827, 3, 256, 128, 0, 1826, 1825, 1, 0, 0, 0, 1826, 1827, 1, 0, 0, 0, 1827,
    1829, 1, 0, 0, 0, 1828, 1819, 1, 0, 0, 0, 1828, 1820, 1, 0, 0, 0, 1829, 253,
    1, 0, 0, 0, 1830, 1831, 5, 50, 0, 0, 1831, 1836, 3, 252, 126, 0, 1832, 1833,
    3, 164, 82, 0, 1833, 1834, 3, 256, 128, 0, 1834, 1836, 1, 0, 0, 0, 1835,
    1830, 1, 0, 0, 0, 1835, 1832, 1, 0, 0, 0, 1836, 255, 1, 0, 0, 0, 1837, 1839,
    5, 79, 0, 0, 1838, 1840, 3, 194, 97, 0, 1839, 1838, 1, 0, 0, 0, 1839, 1840,
    1, 0, 0, 0, 1840, 1841, 1, 0, 0, 0, 1841, 1842, 5, 80, 0, 0, 1842, 257, 1,
    0, 0, 0, 231, 259, 263, 265, 270, 272, 279, 284, 292, 301, 306, 313, 321,
    328, 340, 344, 349, 353, 357, 361, 371, 379, 387, 391, 398, 405, 409, 412,
    415, 424, 430, 435, 438, 444, 450, 454, 458, 466, 475, 482, 488, 492, 504,
    513, 518, 524, 528, 540, 547, 560, 565, 575, 583, 593, 602, 613, 618, 627,
    637, 642, 651, 657, 664, 669, 677, 681, 683, 692, 695, 699, 703, 709, 714,
    718, 726, 733, 739, 741, 748, 754, 760, 763, 773, 783, 789, 796, 800, 809,
    815, 826, 836, 847, 857, 865, 868, 878, 888, 891, 894, 897, 902, 910, 913,
    916, 929, 937, 942, 950, 954, 958, 962, 966, 968, 972, 978, 988, 992, 1000,
    1009, 1023, 1026, 1038, 1041, 1057, 1062, 1069, 1074, 1080, 1089, 1097,
    1104, 1108, 1115, 1117, 1126, 1136, 1141, 1152, 1161, 1168, 1175, 1186,
    1213, 1216, 1219, 1227, 1231, 1241, 1247, 1260, 1269, 1274, 1287, 1293,
    1300, 1313, 1322, 1331, 1337, 1345, 1351, 1358, 1363, 1371, 1374, 1378,
    1382, 1386, 1388, 1392, 1397, 1402, 1413, 1419, 1429, 1433, 1438, 1449,
    1457, 1466, 1482, 1527, 1533, 1538, 1547, 1549, 1551, 1557, 1564, 1572,
    1576, 1583, 1595, 1604, 1611, 1614, 1618, 1636, 1638, 1648, 1658, 1665,
    1669, 1671, 1678, 1689, 1692, 1697, 1705, 1709, 1714, 1718, 1722, 1726,
    1734, 1743, 1749, 1752, 1756, 1764, 1769, 1780, 1786, 1791, 1796, 1803,
    1814, 1822, 1826, 1828, 1835, 1839,
  ];

  private static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!JavaParser.__ATN) {
      JavaParser.__ATN = new ATNDeserializer().deserialize(
        JavaParser._serializedATN,
      );
    }

    return JavaParser.__ATN;
  }

  static DecisionsToDFA = JavaParser._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index),
  );
}

export class CompilationUnitContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public EOF(): TerminalNode {
    return this.getToken(JavaParser.EOF, 0);
  }
  public packageDeclaration(): PackageDeclarationContext {
    return this.getTypedRuleContext(
      PackageDeclarationContext,
      0,
    ) as PackageDeclarationContext;
  }
  public importDeclaration_list(): ImportDeclarationContext[] {
    return this.getTypedRuleContexts(
      ImportDeclarationContext,
    ) as ImportDeclarationContext[];
  }
  public importDeclaration(i: number): ImportDeclarationContext {
    return this.getTypedRuleContext(
      ImportDeclarationContext,
      i,
    ) as ImportDeclarationContext;
  }
  public SEMI_list(): TerminalNode[] {
    return this.getTokens(JavaParser.SEMI);
  }
  public SEMI(i: number): TerminalNode {
    return this.getToken(JavaParser.SEMI, i);
  }
  public typeDeclaration_list(): TypeDeclarationContext[] {
    return this.getTypedRuleContexts(
      TypeDeclarationContext,
    ) as TypeDeclarationContext[];
  }
  public typeDeclaration(i: number): TypeDeclarationContext {
    return this.getTypedRuleContext(
      TypeDeclarationContext,
      i,
    ) as TypeDeclarationContext;
  }
  public modularCompulationUnit(): ModularCompulationUnitContext {
    return this.getTypedRuleContext(
      ModularCompulationUnitContext,
      0,
    ) as ModularCompulationUnitContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_compilationUnit;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCompilationUnit) {
      listener.enterCompilationUnit(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCompilationUnit) {
      listener.exitCompilationUnit(this);
    }
  }
}

export class ModularCompulationUnitContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public moduleDeclaration(): ModuleDeclarationContext {
    return this.getTypedRuleContext(
      ModuleDeclarationContext,
      0,
    ) as ModuleDeclarationContext;
  }
  public importDeclaration_list(): ImportDeclarationContext[] {
    return this.getTypedRuleContexts(
      ImportDeclarationContext,
    ) as ImportDeclarationContext[];
  }
  public importDeclaration(i: number): ImportDeclarationContext {
    return this.getTypedRuleContext(
      ImportDeclarationContext,
      i,
    ) as ImportDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_modularCompulationUnit;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterModularCompulationUnit) {
      listener.enterModularCompulationUnit(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitModularCompulationUnit) {
      listener.exitModularCompulationUnit(this);
    }
  }
}

export class PackageDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public PACKAGE(): TerminalNode {
    return this.getToken(JavaParser.PACKAGE, 0);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_packageDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterPackageDeclaration) {
      listener.enterPackageDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitPackageDeclaration) {
      listener.exitPackageDeclaration(this);
    }
  }
}

export class ImportDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IMPORT(): TerminalNode {
    return this.getToken(JavaParser.IMPORT, 0);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public STATIC(): TerminalNode {
    return this.getToken(JavaParser.STATIC, 0);
  }
  public DOT(): TerminalNode {
    return this.getToken(JavaParser.DOT, 0);
  }
  public MUL(): TerminalNode {
    return this.getToken(JavaParser.MUL, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_importDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterImportDeclaration) {
      listener.enterImportDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitImportDeclaration) {
      listener.exitImportDeclaration(this);
    }
  }
}

export class TypeDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public classDeclaration(): ClassDeclarationContext {
    return this.getTypedRuleContext(
      ClassDeclarationContext,
      0,
    ) as ClassDeclarationContext;
  }
  public enumDeclaration(): EnumDeclarationContext {
    return this.getTypedRuleContext(
      EnumDeclarationContext,
      0,
    ) as EnumDeclarationContext;
  }
  public interfaceDeclaration(): InterfaceDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceDeclarationContext,
      0,
    ) as InterfaceDeclarationContext;
  }
  public annotationTypeDeclaration(): AnnotationTypeDeclarationContext {
    return this.getTypedRuleContext(
      AnnotationTypeDeclarationContext,
      0,
    ) as AnnotationTypeDeclarationContext;
  }
  public recordDeclaration(): RecordDeclarationContext {
    return this.getTypedRuleContext(
      RecordDeclarationContext,
      0,
    ) as RecordDeclarationContext;
  }
  public classOrInterfaceModifier_list(): ClassOrInterfaceModifierContext[] {
    return this.getTypedRuleContexts(
      ClassOrInterfaceModifierContext,
    ) as ClassOrInterfaceModifierContext[];
  }
  public classOrInterfaceModifier(i: number): ClassOrInterfaceModifierContext {
    return this.getTypedRuleContext(
      ClassOrInterfaceModifierContext,
      i,
    ) as ClassOrInterfaceModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeDeclaration) {
      listener.enterTypeDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeDeclaration) {
      listener.exitTypeDeclaration(this);
    }
  }
}

export class ModifierContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public classOrInterfaceModifier(): ClassOrInterfaceModifierContext {
    return this.getTypedRuleContext(
      ClassOrInterfaceModifierContext,
      0,
    ) as ClassOrInterfaceModifierContext;
  }
  public NATIVE(): TerminalNode {
    return this.getToken(JavaParser.NATIVE, 0);
  }
  public SYNCHRONIZED(): TerminalNode {
    return this.getToken(JavaParser.SYNCHRONIZED, 0);
  }
  public TRANSIENT(): TerminalNode {
    return this.getToken(JavaParser.TRANSIENT, 0);
  }
  public VOLATILE(): TerminalNode {
    return this.getToken(JavaParser.VOLATILE, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_modifier;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterModifier) {
      listener.enterModifier(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitModifier) {
      listener.exitModifier(this);
    }
  }
}

export class ClassOrInterfaceModifierContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public annotation(): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, 0) as AnnotationContext;
  }
  public PUBLIC(): TerminalNode {
    return this.getToken(JavaParser.PUBLIC, 0);
  }
  public PROTECTED(): TerminalNode {
    return this.getToken(JavaParser.PROTECTED, 0);
  }
  public PRIVATE(): TerminalNode {
    return this.getToken(JavaParser.PRIVATE, 0);
  }
  public STATIC(): TerminalNode {
    return this.getToken(JavaParser.STATIC, 0);
  }
  public ABSTRACT(): TerminalNode {
    return this.getToken(JavaParser.ABSTRACT, 0);
  }
  public FINAL(): TerminalNode {
    return this.getToken(JavaParser.FINAL, 0);
  }
  public STRICTFP(): TerminalNode {
    return this.getToken(JavaParser.STRICTFP, 0);
  }
  public SEALED(): TerminalNode {
    return this.getToken(JavaParser.SEALED, 0);
  }
  public NON_SEALED(): TerminalNode {
    return this.getToken(JavaParser.NON_SEALED, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_classOrInterfaceModifier;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterClassOrInterfaceModifier) {
      listener.enterClassOrInterfaceModifier(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitClassOrInterfaceModifier) {
      listener.exitClassOrInterfaceModifier(this);
    }
  }
}

export class VariableModifierContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public FINAL(): TerminalNode {
    return this.getToken(JavaParser.FINAL, 0);
  }
  public annotation(): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, 0) as AnnotationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_variableModifier;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterVariableModifier) {
      listener.enterVariableModifier(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitVariableModifier) {
      listener.exitVariableModifier(this);
    }
  }
}

export class ClassDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public CLASS(): TerminalNode {
    return this.getToken(JavaParser.CLASS, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public classBody(): ClassBodyContext {
    return this.getTypedRuleContext(ClassBodyContext, 0) as ClassBodyContext;
  }
  public typeParameters(): TypeParametersContext {
    return this.getTypedRuleContext(
      TypeParametersContext,
      0,
    ) as TypeParametersContext;
  }
  public EXTENDS(): TerminalNode {
    return this.getToken(JavaParser.EXTENDS, 0);
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public IMPLEMENTS(): TerminalNode {
    return this.getToken(JavaParser.IMPLEMENTS, 0);
  }
  public typeList_list(): TypeListContext[] {
    return this.getTypedRuleContexts(TypeListContext) as TypeListContext[];
  }
  public typeList(i: number): TypeListContext {
    return this.getTypedRuleContext(TypeListContext, i) as TypeListContext;
  }
  public PERMITS(): TerminalNode {
    return this.getToken(JavaParser.PERMITS, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_classDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterClassDeclaration) {
      listener.enterClassDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitClassDeclaration) {
      listener.exitClassDeclaration(this);
    }
  }
}

export class TypeParametersContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LT(): TerminalNode {
    return this.getToken(JavaParser.LT, 0);
  }
  public typeParameter_list(): TypeParameterContext[] {
    return this.getTypedRuleContexts(
      TypeParameterContext,
    ) as TypeParameterContext[];
  }
  public typeParameter(i: number): TypeParameterContext {
    return this.getTypedRuleContext(
      TypeParameterContext,
      i,
    ) as TypeParameterContext;
  }
  public GT(): TerminalNode {
    return this.getToken(JavaParser.GT, 0);
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeParameters;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeParameters) {
      listener.enterTypeParameters(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeParameters) {
      listener.exitTypeParameters(this);
    }
  }
}

export class TypeParameterContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public EXTENDS(): TerminalNode {
    return this.getToken(JavaParser.EXTENDS, 0);
  }
  public typeBound(): TypeBoundContext {
    return this.getTypedRuleContext(TypeBoundContext, 0) as TypeBoundContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeParameter;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeParameter) {
      listener.enterTypeParameter(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeParameter) {
      listener.exitTypeParameter(this);
    }
  }
}

export class TypeBoundContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType_list(): TypeTypeContext[] {
    return this.getTypedRuleContexts(TypeTypeContext) as TypeTypeContext[];
  }
  public typeType(i: number): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, i) as TypeTypeContext;
  }
  public BITAND_list(): TerminalNode[] {
    return this.getTokens(JavaParser.BITAND);
  }
  public BITAND(i: number): TerminalNode {
    return this.getToken(JavaParser.BITAND, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeBound;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeBound) {
      listener.enterTypeBound(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeBound) {
      listener.exitTypeBound(this);
    }
  }
}

export class EnumDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public ENUM(): TerminalNode {
    return this.getToken(JavaParser.ENUM, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public IMPLEMENTS(): TerminalNode {
    return this.getToken(JavaParser.IMPLEMENTS, 0);
  }
  public typeList(): TypeListContext {
    return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
  }
  public enumConstants(): EnumConstantsContext {
    return this.getTypedRuleContext(
      EnumConstantsContext,
      0,
    ) as EnumConstantsContext;
  }
  public COMMA(): TerminalNode {
    return this.getToken(JavaParser.COMMA, 0);
  }
  public enumBodyDeclarations(): EnumBodyDeclarationsContext {
    return this.getTypedRuleContext(
      EnumBodyDeclarationsContext,
      0,
    ) as EnumBodyDeclarationsContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_enumDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterEnumDeclaration) {
      listener.enterEnumDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitEnumDeclaration) {
      listener.exitEnumDeclaration(this);
    }
  }
}

export class EnumConstantsContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public enumConstant_list(): EnumConstantContext[] {
    return this.getTypedRuleContexts(
      EnumConstantContext,
    ) as EnumConstantContext[];
  }
  public enumConstant(i: number): EnumConstantContext {
    return this.getTypedRuleContext(
      EnumConstantContext,
      i,
    ) as EnumConstantContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_enumConstants;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterEnumConstants) {
      listener.enterEnumConstants(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitEnumConstants) {
      listener.exitEnumConstants(this);
    }
  }
}

export class EnumConstantContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public arguments(): ArgumentsContext {
    return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
  }
  public classBody(): ClassBodyContext {
    return this.getTypedRuleContext(ClassBodyContext, 0) as ClassBodyContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_enumConstant;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterEnumConstant) {
      listener.enterEnumConstant(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitEnumConstant) {
      listener.exitEnumConstant(this);
    }
  }
}

export class EnumBodyDeclarationsContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public classBodyDeclaration_list(): ClassBodyDeclarationContext[] {
    return this.getTypedRuleContexts(
      ClassBodyDeclarationContext,
    ) as ClassBodyDeclarationContext[];
  }
  public classBodyDeclaration(i: number): ClassBodyDeclarationContext {
    return this.getTypedRuleContext(
      ClassBodyDeclarationContext,
      i,
    ) as ClassBodyDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_enumBodyDeclarations;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterEnumBodyDeclarations) {
      listener.enterEnumBodyDeclarations(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitEnumBodyDeclarations) {
      listener.exitEnumBodyDeclarations(this);
    }
  }
}

export class InterfaceDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public INTERFACE(): TerminalNode {
    return this.getToken(JavaParser.INTERFACE, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public interfaceBody(): InterfaceBodyContext {
    return this.getTypedRuleContext(
      InterfaceBodyContext,
      0,
    ) as InterfaceBodyContext;
  }
  public typeParameters(): TypeParametersContext {
    return this.getTypedRuleContext(
      TypeParametersContext,
      0,
    ) as TypeParametersContext;
  }
  public EXTENDS(): TerminalNode {
    return this.getToken(JavaParser.EXTENDS, 0);
  }
  public typeList_list(): TypeListContext[] {
    return this.getTypedRuleContexts(TypeListContext) as TypeListContext[];
  }
  public typeList(i: number): TypeListContext {
    return this.getTypedRuleContext(TypeListContext, i) as TypeListContext;
  }
  public PERMITS(): TerminalNode {
    return this.getToken(JavaParser.PERMITS, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_interfaceDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInterfaceDeclaration) {
      listener.enterInterfaceDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInterfaceDeclaration) {
      listener.exitInterfaceDeclaration(this);
    }
  }
}

export class ClassBodyContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public classBodyDeclaration_list(): ClassBodyDeclarationContext[] {
    return this.getTypedRuleContexts(
      ClassBodyDeclarationContext,
    ) as ClassBodyDeclarationContext[];
  }
  public classBodyDeclaration(i: number): ClassBodyDeclarationContext {
    return this.getTypedRuleContext(
      ClassBodyDeclarationContext,
      i,
    ) as ClassBodyDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_classBody;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterClassBody) {
      listener.enterClassBody(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitClassBody) {
      listener.exitClassBody(this);
    }
  }
}

export class InterfaceBodyContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public interfaceBodyDeclaration_list(): InterfaceBodyDeclarationContext[] {
    return this.getTypedRuleContexts(
      InterfaceBodyDeclarationContext,
    ) as InterfaceBodyDeclarationContext[];
  }
  public interfaceBodyDeclaration(i: number): InterfaceBodyDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceBodyDeclarationContext,
      i,
    ) as InterfaceBodyDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_interfaceBody;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInterfaceBody) {
      listener.enterInterfaceBody(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInterfaceBody) {
      listener.exitInterfaceBody(this);
    }
  }
}

export class ClassBodyDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public STATIC(): TerminalNode {
    return this.getToken(JavaParser.STATIC, 0);
  }
  public memberDeclaration(): MemberDeclarationContext {
    return this.getTypedRuleContext(
      MemberDeclarationContext,
      0,
    ) as MemberDeclarationContext;
  }
  public modifier_list(): ModifierContext[] {
    return this.getTypedRuleContexts(ModifierContext) as ModifierContext[];
  }
  public modifier(i: number): ModifierContext {
    return this.getTypedRuleContext(ModifierContext, i) as ModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_classBodyDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterClassBodyDeclaration) {
      listener.enterClassBodyDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitClassBodyDeclaration) {
      listener.exitClassBodyDeclaration(this);
    }
  }
}

export class MemberDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public recordDeclaration(): RecordDeclarationContext {
    return this.getTypedRuleContext(
      RecordDeclarationContext,
      0,
    ) as RecordDeclarationContext;
  }
  public methodDeclaration(): MethodDeclarationContext {
    return this.getTypedRuleContext(
      MethodDeclarationContext,
      0,
    ) as MethodDeclarationContext;
  }
  public genericMethodDeclaration(): GenericMethodDeclarationContext {
    return this.getTypedRuleContext(
      GenericMethodDeclarationContext,
      0,
    ) as GenericMethodDeclarationContext;
  }
  public fieldDeclaration(): FieldDeclarationContext {
    return this.getTypedRuleContext(
      FieldDeclarationContext,
      0,
    ) as FieldDeclarationContext;
  }
  public constructorDeclaration(): ConstructorDeclarationContext {
    return this.getTypedRuleContext(
      ConstructorDeclarationContext,
      0,
    ) as ConstructorDeclarationContext;
  }
  public genericConstructorDeclaration(): GenericConstructorDeclarationContext {
    return this.getTypedRuleContext(
      GenericConstructorDeclarationContext,
      0,
    ) as GenericConstructorDeclarationContext;
  }
  public interfaceDeclaration(): InterfaceDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceDeclarationContext,
      0,
    ) as InterfaceDeclarationContext;
  }
  public annotationTypeDeclaration(): AnnotationTypeDeclarationContext {
    return this.getTypedRuleContext(
      AnnotationTypeDeclarationContext,
      0,
    ) as AnnotationTypeDeclarationContext;
  }
  public classDeclaration(): ClassDeclarationContext {
    return this.getTypedRuleContext(
      ClassDeclarationContext,
      0,
    ) as ClassDeclarationContext;
  }
  public enumDeclaration(): EnumDeclarationContext {
    return this.getTypedRuleContext(
      EnumDeclarationContext,
      0,
    ) as EnumDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_memberDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterMemberDeclaration) {
      listener.enterMemberDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitMemberDeclaration) {
      listener.exitMemberDeclaration(this);
    }
  }
}

export class MethodDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeTypeOrVoid(): TypeTypeOrVoidContext {
    return this.getTypedRuleContext(
      TypeTypeOrVoidContext,
      0,
    ) as TypeTypeOrVoidContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public formalParameters(): FormalParametersContext {
    return this.getTypedRuleContext(
      FormalParametersContext,
      0,
    ) as FormalParametersContext;
  }
  public methodBody(): MethodBodyContext {
    return this.getTypedRuleContext(MethodBodyContext, 0) as MethodBodyContext;
  }
  public LBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.LBRACK);
  }
  public LBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.LBRACK, i);
  }
  public RBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.RBRACK);
  }
  public RBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.RBRACK, i);
  }
  public THROWS(): TerminalNode {
    return this.getToken(JavaParser.THROWS, 0);
  }
  public qualifiedNameList(): QualifiedNameListContext {
    return this.getTypedRuleContext(
      QualifiedNameListContext,
      0,
    ) as QualifiedNameListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_methodDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterMethodDeclaration) {
      listener.enterMethodDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitMethodDeclaration) {
      listener.exitMethodDeclaration(this);
    }
  }
}

export class MethodBodyContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_methodBody;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterMethodBody) {
      listener.enterMethodBody(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitMethodBody) {
      listener.exitMethodBody(this);
    }
  }
}

export class TypeTypeOrVoidContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public VOID(): TerminalNode {
    return this.getToken(JavaParser.VOID, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeTypeOrVoid;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeTypeOrVoid) {
      listener.enterTypeTypeOrVoid(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeTypeOrVoid) {
      listener.exitTypeTypeOrVoid(this);
    }
  }
}

export class GenericMethodDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeParameters(): TypeParametersContext {
    return this.getTypedRuleContext(
      TypeParametersContext,
      0,
    ) as TypeParametersContext;
  }
  public methodDeclaration(): MethodDeclarationContext {
    return this.getTypedRuleContext(
      MethodDeclarationContext,
      0,
    ) as MethodDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_genericMethodDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterGenericMethodDeclaration) {
      listener.enterGenericMethodDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitGenericMethodDeclaration) {
      listener.exitGenericMethodDeclaration(this);
    }
  }
}

export class GenericConstructorDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeParameters(): TypeParametersContext {
    return this.getTypedRuleContext(
      TypeParametersContext,
      0,
    ) as TypeParametersContext;
  }
  public constructorDeclaration(): ConstructorDeclarationContext {
    return this.getTypedRuleContext(
      ConstructorDeclarationContext,
      0,
    ) as ConstructorDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_genericConstructorDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterGenericConstructorDeclaration) {
      listener.enterGenericConstructorDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitGenericConstructorDeclaration) {
      listener.exitGenericConstructorDeclaration(this);
    }
  }
}

export class ConstructorDeclarationContext extends ParserRuleContext {
  public _constructorBody!: BlockContext;
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public formalParameters(): FormalParametersContext {
    return this.getTypedRuleContext(
      FormalParametersContext,
      0,
    ) as FormalParametersContext;
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public THROWS(): TerminalNode {
    return this.getToken(JavaParser.THROWS, 0);
  }
  public qualifiedNameList(): QualifiedNameListContext {
    return this.getTypedRuleContext(
      QualifiedNameListContext,
      0,
    ) as QualifiedNameListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_constructorDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterConstructorDeclaration) {
      listener.enterConstructorDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitConstructorDeclaration) {
      listener.exitConstructorDeclaration(this);
    }
  }
}

export class CompactConstructorDeclarationContext extends ParserRuleContext {
  public _constructorBody!: BlockContext;
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public modifier_list(): ModifierContext[] {
    return this.getTypedRuleContexts(ModifierContext) as ModifierContext[];
  }
  public modifier(i: number): ModifierContext {
    return this.getTypedRuleContext(ModifierContext, i) as ModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_compactConstructorDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCompactConstructorDeclaration) {
      listener.enterCompactConstructorDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCompactConstructorDeclaration) {
      listener.exitCompactConstructorDeclaration(this);
    }
  }
}

export class FieldDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public variableDeclarators(): VariableDeclaratorsContext {
    return this.getTypedRuleContext(
      VariableDeclaratorsContext,
      0,
    ) as VariableDeclaratorsContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_fieldDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterFieldDeclaration) {
      listener.enterFieldDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitFieldDeclaration) {
      listener.exitFieldDeclaration(this);
    }
  }
}

export class InterfaceBodyDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceMemberDeclarationContext,
      0,
    ) as InterfaceMemberDeclarationContext;
  }
  public modifier_list(): ModifierContext[] {
    return this.getTypedRuleContexts(ModifierContext) as ModifierContext[];
  }
  public modifier(i: number): ModifierContext {
    return this.getTypedRuleContext(ModifierContext, i) as ModifierContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_interfaceBodyDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInterfaceBodyDeclaration) {
      listener.enterInterfaceBodyDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInterfaceBodyDeclaration) {
      listener.exitInterfaceBodyDeclaration(this);
    }
  }
}

export class InterfaceMemberDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public recordDeclaration(): RecordDeclarationContext {
    return this.getTypedRuleContext(
      RecordDeclarationContext,
      0,
    ) as RecordDeclarationContext;
  }
  public constDeclaration(): ConstDeclarationContext {
    return this.getTypedRuleContext(
      ConstDeclarationContext,
      0,
    ) as ConstDeclarationContext;
  }
  public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceMethodDeclarationContext,
      0,
    ) as InterfaceMethodDeclarationContext;
  }
  public genericInterfaceMethodDeclaration(): GenericInterfaceMethodDeclarationContext {
    return this.getTypedRuleContext(
      GenericInterfaceMethodDeclarationContext,
      0,
    ) as GenericInterfaceMethodDeclarationContext;
  }
  public interfaceDeclaration(): InterfaceDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceDeclarationContext,
      0,
    ) as InterfaceDeclarationContext;
  }
  public annotationTypeDeclaration(): AnnotationTypeDeclarationContext {
    return this.getTypedRuleContext(
      AnnotationTypeDeclarationContext,
      0,
    ) as AnnotationTypeDeclarationContext;
  }
  public classDeclaration(): ClassDeclarationContext {
    return this.getTypedRuleContext(
      ClassDeclarationContext,
      0,
    ) as ClassDeclarationContext;
  }
  public enumDeclaration(): EnumDeclarationContext {
    return this.getTypedRuleContext(
      EnumDeclarationContext,
      0,
    ) as EnumDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_interfaceMemberDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInterfaceMemberDeclaration) {
      listener.enterInterfaceMemberDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInterfaceMemberDeclaration) {
      listener.exitInterfaceMemberDeclaration(this);
    }
  }
}

export class ConstDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public constantDeclarator_list(): ConstantDeclaratorContext[] {
    return this.getTypedRuleContexts(
      ConstantDeclaratorContext,
    ) as ConstantDeclaratorContext[];
  }
  public constantDeclarator(i: number): ConstantDeclaratorContext {
    return this.getTypedRuleContext(
      ConstantDeclaratorContext,
      i,
    ) as ConstantDeclaratorContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_constDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterConstDeclaration) {
      listener.enterConstDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitConstDeclaration) {
      listener.exitConstDeclaration(this);
    }
  }
}

export class ConstantDeclaratorContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.ASSIGN, 0);
  }
  public variableInitializer(): VariableInitializerContext {
    return this.getTypedRuleContext(
      VariableInitializerContext,
      0,
    ) as VariableInitializerContext;
  }
  public LBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.LBRACK);
  }
  public LBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.LBRACK, i);
  }
  public RBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.RBRACK);
  }
  public RBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.RBRACK, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_constantDeclarator;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterConstantDeclarator) {
      listener.enterConstantDeclarator(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitConstantDeclarator) {
      listener.exitConstantDeclarator(this);
    }
  }
}

export class InterfaceMethodDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public interfaceCommonBodyDeclaration(): InterfaceCommonBodyDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceCommonBodyDeclarationContext,
      0,
    ) as InterfaceCommonBodyDeclarationContext;
  }
  public interfaceMethodModifier_list(): InterfaceMethodModifierContext[] {
    return this.getTypedRuleContexts(
      InterfaceMethodModifierContext,
    ) as InterfaceMethodModifierContext[];
  }
  public interfaceMethodModifier(i: number): InterfaceMethodModifierContext {
    return this.getTypedRuleContext(
      InterfaceMethodModifierContext,
      i,
    ) as InterfaceMethodModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_interfaceMethodDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInterfaceMethodDeclaration) {
      listener.enterInterfaceMethodDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInterfaceMethodDeclaration) {
      listener.exitInterfaceMethodDeclaration(this);
    }
  }
}

export class InterfaceMethodModifierContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public annotation(): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, 0) as AnnotationContext;
  }
  public PUBLIC(): TerminalNode {
    return this.getToken(JavaParser.PUBLIC, 0);
  }
  public ABSTRACT(): TerminalNode {
    return this.getToken(JavaParser.ABSTRACT, 0);
  }
  public DEFAULT(): TerminalNode {
    return this.getToken(JavaParser.DEFAULT, 0);
  }
  public STATIC(): TerminalNode {
    return this.getToken(JavaParser.STATIC, 0);
  }
  public STRICTFP(): TerminalNode {
    return this.getToken(JavaParser.STRICTFP, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_interfaceMethodModifier;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInterfaceMethodModifier) {
      listener.enterInterfaceMethodModifier(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInterfaceMethodModifier) {
      listener.exitInterfaceMethodModifier(this);
    }
  }
}

export class GenericInterfaceMethodDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeParameters(): TypeParametersContext {
    return this.getTypedRuleContext(
      TypeParametersContext,
      0,
    ) as TypeParametersContext;
  }
  public interfaceCommonBodyDeclaration(): InterfaceCommonBodyDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceCommonBodyDeclarationContext,
      0,
    ) as InterfaceCommonBodyDeclarationContext;
  }
  public interfaceMethodModifier_list(): InterfaceMethodModifierContext[] {
    return this.getTypedRuleContexts(
      InterfaceMethodModifierContext,
    ) as InterfaceMethodModifierContext[];
  }
  public interfaceMethodModifier(i: number): InterfaceMethodModifierContext {
    return this.getTypedRuleContext(
      InterfaceMethodModifierContext,
      i,
    ) as InterfaceMethodModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_genericInterfaceMethodDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterGenericInterfaceMethodDeclaration) {
      listener.enterGenericInterfaceMethodDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitGenericInterfaceMethodDeclaration) {
      listener.exitGenericInterfaceMethodDeclaration(this);
    }
  }
}

export class InterfaceCommonBodyDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeTypeOrVoid(): TypeTypeOrVoidContext {
    return this.getTypedRuleContext(
      TypeTypeOrVoidContext,
      0,
    ) as TypeTypeOrVoidContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public formalParameters(): FormalParametersContext {
    return this.getTypedRuleContext(
      FormalParametersContext,
      0,
    ) as FormalParametersContext;
  }
  public methodBody(): MethodBodyContext {
    return this.getTypedRuleContext(MethodBodyContext, 0) as MethodBodyContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public LBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.LBRACK);
  }
  public LBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.LBRACK, i);
  }
  public RBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.RBRACK);
  }
  public RBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.RBRACK, i);
  }
  public THROWS(): TerminalNode {
    return this.getToken(JavaParser.THROWS, 0);
  }
  public qualifiedNameList(): QualifiedNameListContext {
    return this.getTypedRuleContext(
      QualifiedNameListContext,
      0,
    ) as QualifiedNameListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_interfaceCommonBodyDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInterfaceCommonBodyDeclaration) {
      listener.enterInterfaceCommonBodyDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInterfaceCommonBodyDeclaration) {
      listener.exitInterfaceCommonBodyDeclaration(this);
    }
  }
}

export class VariableDeclaratorsContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public variableDeclarator_list(): VariableDeclaratorContext[] {
    return this.getTypedRuleContexts(
      VariableDeclaratorContext,
    ) as VariableDeclaratorContext[];
  }
  public variableDeclarator(i: number): VariableDeclaratorContext {
    return this.getTypedRuleContext(
      VariableDeclaratorContext,
      i,
    ) as VariableDeclaratorContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_variableDeclarators;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterVariableDeclarators) {
      listener.enterVariableDeclarators(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitVariableDeclarators) {
      listener.exitVariableDeclarators(this);
    }
  }
}

export class VariableDeclaratorContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public variableDeclaratorId(): VariableDeclaratorIdContext {
    return this.getTypedRuleContext(
      VariableDeclaratorIdContext,
      0,
    ) as VariableDeclaratorIdContext;
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.ASSIGN, 0);
  }
  public variableInitializer(): VariableInitializerContext {
    return this.getTypedRuleContext(
      VariableInitializerContext,
      0,
    ) as VariableInitializerContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_variableDeclarator;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterVariableDeclarator) {
      listener.enterVariableDeclarator(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitVariableDeclarator) {
      listener.exitVariableDeclarator(this);
    }
  }
}

export class VariableDeclaratorIdContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public LBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.LBRACK);
  }
  public LBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.LBRACK, i);
  }
  public RBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.RBRACK);
  }
  public RBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.RBRACK, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_variableDeclaratorId;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterVariableDeclaratorId) {
      listener.enterVariableDeclaratorId(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitVariableDeclaratorId) {
      listener.exitVariableDeclaratorId(this);
    }
  }
}

export class VariableInitializerContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public arrayInitializer(): ArrayInitializerContext {
    return this.getTypedRuleContext(
      ArrayInitializerContext,
      0,
    ) as ArrayInitializerContext;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_variableInitializer;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterVariableInitializer) {
      listener.enterVariableInitializer(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitVariableInitializer) {
      listener.exitVariableInitializer(this);
    }
  }
}

export class ArrayInitializerContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public variableInitializer_list(): VariableInitializerContext[] {
    return this.getTypedRuleContexts(
      VariableInitializerContext,
    ) as VariableInitializerContext[];
  }
  public variableInitializer(i: number): VariableInitializerContext {
    return this.getTypedRuleContext(
      VariableInitializerContext,
      i,
    ) as VariableInitializerContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_arrayInitializer;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterArrayInitializer) {
      listener.enterArrayInitializer(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitArrayInitializer) {
      listener.exitArrayInitializer(this);
    }
  }
}

export class ClassTypeContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeIdentifier_list(): TypeIdentifierContext[] {
    return this.getTypedRuleContexts(
      TypeIdentifierContext,
    ) as TypeIdentifierContext[];
  }
  public typeIdentifier(i: number): TypeIdentifierContext {
    return this.getTypedRuleContext(
      TypeIdentifierContext,
      i,
    ) as TypeIdentifierContext;
  }
  public DOT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.DOT);
  }
  public DOT(i: number): TerminalNode {
    return this.getToken(JavaParser.DOT, i);
  }
  public packageName_list(): PackageNameContext[] {
    return this.getTypedRuleContexts(
      PackageNameContext,
    ) as PackageNameContext[];
  }
  public packageName(i: number): PackageNameContext {
    return this.getTypedRuleContext(
      PackageNameContext,
      i,
    ) as PackageNameContext;
  }
  public typeArguments_list(): TypeArgumentsContext[] {
    return this.getTypedRuleContexts(
      TypeArgumentsContext,
    ) as TypeArgumentsContext[];
  }
  public typeArguments(i: number): TypeArgumentsContext {
    return this.getTypedRuleContext(
      TypeArgumentsContext,
      i,
    ) as TypeArgumentsContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_classType;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterClassType) {
      listener.enterClassType(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitClassType) {
      listener.exitClassType(this);
    }
  }
}

export class PackageNameContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier_list(): IdentifierContext[] {
    return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
  }
  public identifier(i: number): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
  }
  public DOT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.DOT);
  }
  public DOT(i: number): TerminalNode {
    return this.getToken(JavaParser.DOT, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_packageName;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterPackageName) {
      listener.enterPackageName(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitPackageName) {
      listener.exitPackageName(this);
    }
  }
}

export class TypeArgumentContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public QUESTION(): TerminalNode {
    return this.getToken(JavaParser.QUESTION, 0);
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public EXTENDS(): TerminalNode {
    return this.getToken(JavaParser.EXTENDS, 0);
  }
  public SUPER(): TerminalNode {
    return this.getToken(JavaParser.SUPER, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeArgument;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeArgument) {
      listener.enterTypeArgument(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeArgument) {
      listener.exitTypeArgument(this);
    }
  }
}

export class QualifiedNameListContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public qualifiedName_list(): QualifiedNameContext[] {
    return this.getTypedRuleContexts(
      QualifiedNameContext,
    ) as QualifiedNameContext[];
  }
  public qualifiedName(i: number): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      i,
    ) as QualifiedNameContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_qualifiedNameList;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterQualifiedNameList) {
      listener.enterQualifiedNameList(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitQualifiedNameList) {
      listener.exitQualifiedNameList(this);
    }
  }
}

export class FormalParametersContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public receiverParameter(): ReceiverParameterContext {
    return this.getTypedRuleContext(
      ReceiverParameterContext,
      0,
    ) as ReceiverParameterContext;
  }
  public formalParameter(): FormalParameterContext {
    return this.getTypedRuleContext(
      FormalParameterContext,
      0,
    ) as FormalParameterContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public formalParameterList_list(): FormalParameterListContext[] {
    return this.getTypedRuleContexts(
      FormalParameterListContext,
    ) as FormalParameterListContext[];
  }
  public formalParameterList(i: number): FormalParameterListContext {
    return this.getTypedRuleContext(
      FormalParameterListContext,
      i,
    ) as FormalParameterListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_formalParameters;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterFormalParameters) {
      listener.enterFormalParameters(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitFormalParameters) {
      listener.exitFormalParameters(this);
    }
  }
}

export class ReceiverParameterContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public THIS(): TerminalNode {
    return this.getToken(JavaParser.THIS, 0);
  }
  public identifier_list(): IdentifierContext[] {
    return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
  }
  public identifier(i: number): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
  }
  public DOT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.DOT);
  }
  public DOT(i: number): TerminalNode {
    return this.getToken(JavaParser.DOT, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_receiverParameter;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterReceiverParameter) {
      listener.enterReceiverParameter(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitReceiverParameter) {
      listener.exitReceiverParameter(this);
    }
  }
}

export class FormalParameterListContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public formalParameter_list(): FormalParameterContext[] {
    return this.getTypedRuleContexts(
      FormalParameterContext,
    ) as FormalParameterContext[];
  }
  public formalParameter(i: number): FormalParameterContext {
    return this.getTypedRuleContext(
      FormalParameterContext,
      i,
    ) as FormalParameterContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_formalParameterList;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterFormalParameterList) {
      listener.enterFormalParameterList(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitFormalParameterList) {
      listener.exitFormalParameterList(this);
    }
  }
}

export class FormalParameterContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public variableDeclaratorId(): VariableDeclaratorIdContext {
    return this.getTypedRuleContext(
      VariableDeclaratorIdContext,
      0,
    ) as VariableDeclaratorIdContext;
  }
  public variableModifier_list(): VariableModifierContext[] {
    return this.getTypedRuleContexts(
      VariableModifierContext,
    ) as VariableModifierContext[];
  }
  public variableModifier(i: number): VariableModifierContext {
    return this.getTypedRuleContext(
      VariableModifierContext,
      i,
    ) as VariableModifierContext;
  }
  public ELLIPSIS(): TerminalNode {
    return this.getToken(JavaParser.ELLIPSIS, 0);
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_formalParameter;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterFormalParameter) {
      listener.enterFormalParameter(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitFormalParameter) {
      listener.exitFormalParameter(this);
    }
  }
}

export class LambdaLVTIListContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public lambdaLVTIParameter_list(): LambdaLVTIParameterContext[] {
    return this.getTypedRuleContexts(
      LambdaLVTIParameterContext,
    ) as LambdaLVTIParameterContext[];
  }
  public lambdaLVTIParameter(i: number): LambdaLVTIParameterContext {
    return this.getTypedRuleContext(
      LambdaLVTIParameterContext,
      i,
    ) as LambdaLVTIParameterContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_lambdaLVTIList;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLambdaLVTIList) {
      listener.enterLambdaLVTIList(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLambdaLVTIList) {
      listener.exitLambdaLVTIList(this);
    }
  }
}

export class LambdaLVTIParameterContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public VAR(): TerminalNode {
    return this.getToken(JavaParser.VAR, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public variableModifier_list(): VariableModifierContext[] {
    return this.getTypedRuleContexts(
      VariableModifierContext,
    ) as VariableModifierContext[];
  }
  public variableModifier(i: number): VariableModifierContext {
    return this.getTypedRuleContext(
      VariableModifierContext,
      i,
    ) as VariableModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_lambdaLVTIParameter;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLambdaLVTIParameter) {
      listener.enterLambdaLVTIParameter(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLambdaLVTIParameter) {
      listener.exitLambdaLVTIParameter(this);
    }
  }
}

export class QualifiedNameContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier_list(): IdentifierContext[] {
    return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
  }
  public identifier(i: number): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
  }
  public DOT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.DOT);
  }
  public DOT(i: number): TerminalNode {
    return this.getToken(JavaParser.DOT, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_qualifiedName;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterQualifiedName) {
      listener.enterQualifiedName(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitQualifiedName) {
      listener.exitQualifiedName(this);
    }
  }
}

export class LiteralContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public integerLiteral(): IntegerLiteralContext {
    return this.getTypedRuleContext(
      IntegerLiteralContext,
      0,
    ) as IntegerLiteralContext;
  }
  public floatLiteral(): FloatLiteralContext {
    return this.getTypedRuleContext(
      FloatLiteralContext,
      0,
    ) as FloatLiteralContext;
  }
  public CHAR_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.CHAR_LITERAL, 0);
  }
  public STRING_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.STRING_LITERAL, 0);
  }
  public BOOL_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.BOOL_LITERAL, 0);
  }
  public NULL_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.NULL_LITERAL, 0);
  }
  public TEXT_BLOCK(): TerminalNode {
    return this.getToken(JavaParser.TEXT_BLOCK, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_literal;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLiteral) {
      listener.enterLiteral(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLiteral) {
      listener.exitLiteral(this);
    }
  }
}

export class IntegerLiteralContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public DECIMAL_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.DECIMAL_LITERAL, 0);
  }
  public HEX_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.HEX_LITERAL, 0);
  }
  public OCT_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.OCT_LITERAL, 0);
  }
  public BINARY_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.BINARY_LITERAL, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_integerLiteral;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterIntegerLiteral) {
      listener.enterIntegerLiteral(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitIntegerLiteral) {
      listener.exitIntegerLiteral(this);
    }
  }
}

export class FloatLiteralContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public FLOAT_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.FLOAT_LITERAL, 0);
  }
  public HEX_FLOAT_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.HEX_FLOAT_LITERAL, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_floatLiteral;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterFloatLiteral) {
      listener.enterFloatLiteral(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitFloatLiteral) {
      listener.exitFloatLiteral(this);
    }
  }
}

export class AltAnnotationQualifiedNameContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public AT(): TerminalNode {
    return this.getToken(JavaParser.AT, 0);
  }
  public identifier_list(): IdentifierContext[] {
    return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
  }
  public identifier(i: number): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
  }
  public DOT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.DOT);
  }
  public DOT(i: number): TerminalNode {
    return this.getToken(JavaParser.DOT, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_altAnnotationQualifiedName;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAltAnnotationQualifiedName) {
      listener.enterAltAnnotationQualifiedName(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAltAnnotationQualifiedName) {
      listener.exitAltAnnotationQualifiedName(this);
    }
  }
}

export class AnnotationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public AT(): TerminalNode {
    return this.getToken(JavaParser.AT, 0);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public annotationFieldValues(): AnnotationFieldValuesContext {
    return this.getTypedRuleContext(
      AnnotationFieldValuesContext,
      0,
    ) as AnnotationFieldValuesContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotation;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotation) {
      listener.enterAnnotation(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotation) {
      listener.exitAnnotation(this);
    }
  }
}

export class AnnotationFieldValuesContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public annotationFieldValue_list(): AnnotationFieldValueContext[] {
    return this.getTypedRuleContexts(
      AnnotationFieldValueContext,
    ) as AnnotationFieldValueContext[];
  }
  public annotationFieldValue(i: number): AnnotationFieldValueContext {
    return this.getTypedRuleContext(
      AnnotationFieldValueContext,
      i,
    ) as AnnotationFieldValueContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationFieldValues;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationFieldValues) {
      listener.enterAnnotationFieldValues(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationFieldValues) {
      listener.exitAnnotationFieldValues(this);
    }
  }
}

export class AnnotationFieldValueContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public annotationValue(): AnnotationValueContext {
    return this.getTypedRuleContext(
      AnnotationValueContext,
      0,
    ) as AnnotationValueContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.ASSIGN, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationFieldValue;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationFieldValue) {
      listener.enterAnnotationFieldValue(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationFieldValue) {
      listener.exitAnnotationFieldValue(this);
    }
  }
}

export class AnnotationValueContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public annotation(): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, 0) as AnnotationContext;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public annotationValue_list(): AnnotationValueContext[] {
    return this.getTypedRuleContexts(
      AnnotationValueContext,
    ) as AnnotationValueContext[];
  }
  public annotationValue(i: number): AnnotationValueContext {
    return this.getTypedRuleContext(
      AnnotationValueContext,
      i,
    ) as AnnotationValueContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationValue;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationValue) {
      listener.enterAnnotationValue(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationValue) {
      listener.exitAnnotationValue(this);
    }
  }
}

export class ElementValueContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public annotation(): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, 0) as AnnotationContext;
  }
  public elementValueArrayInitializer(): ElementValueArrayInitializerContext {
    return this.getTypedRuleContext(
      ElementValueArrayInitializerContext,
      0,
    ) as ElementValueArrayInitializerContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_elementValue;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterElementValue) {
      listener.enterElementValue(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitElementValue) {
      listener.exitElementValue(this);
    }
  }
}

export class ElementValueArrayInitializerContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public elementValue_list(): ElementValueContext[] {
    return this.getTypedRuleContexts(
      ElementValueContext,
    ) as ElementValueContext[];
  }
  public elementValue(i: number): ElementValueContext {
    return this.getTypedRuleContext(
      ElementValueContext,
      i,
    ) as ElementValueContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_elementValueArrayInitializer;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterElementValueArrayInitializer) {
      listener.enterElementValueArrayInitializer(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitElementValueArrayInitializer) {
      listener.exitElementValueArrayInitializer(this);
    }
  }
}

export class AnnotationTypeDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public AT(): TerminalNode {
    return this.getToken(JavaParser.AT, 0);
  }
  public INTERFACE(): TerminalNode {
    return this.getToken(JavaParser.INTERFACE, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public annotationTypeBody(): AnnotationTypeBodyContext {
    return this.getTypedRuleContext(
      AnnotationTypeBodyContext,
      0,
    ) as AnnotationTypeBodyContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationTypeDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationTypeDeclaration) {
      listener.enterAnnotationTypeDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationTypeDeclaration) {
      listener.exitAnnotationTypeDeclaration(this);
    }
  }
}

export class AnnotationTypeBodyContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public annotationTypeElementDeclaration_list(): AnnotationTypeElementDeclarationContext[] {
    return this.getTypedRuleContexts(
      AnnotationTypeElementDeclarationContext,
    ) as AnnotationTypeElementDeclarationContext[];
  }
  public annotationTypeElementDeclaration(
    i: number,
  ): AnnotationTypeElementDeclarationContext {
    return this.getTypedRuleContext(
      AnnotationTypeElementDeclarationContext,
      i,
    ) as AnnotationTypeElementDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationTypeBody;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationTypeBody) {
      listener.enterAnnotationTypeBody(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationTypeBody) {
      listener.exitAnnotationTypeBody(this);
    }
  }
}

export class AnnotationTypeElementDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public annotationTypeElementRest(): AnnotationTypeElementRestContext {
    return this.getTypedRuleContext(
      AnnotationTypeElementRestContext,
      0,
    ) as AnnotationTypeElementRestContext;
  }
  public modifier_list(): ModifierContext[] {
    return this.getTypedRuleContexts(ModifierContext) as ModifierContext[];
  }
  public modifier(i: number): ModifierContext {
    return this.getTypedRuleContext(ModifierContext, i) as ModifierContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationTypeElementDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationTypeElementDeclaration) {
      listener.enterAnnotationTypeElementDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationTypeElementDeclaration) {
      listener.exitAnnotationTypeElementDeclaration(this);
    }
  }
}

export class AnnotationTypeElementRestContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public annotationMethodOrConstantRest(): AnnotationMethodOrConstantRestContext {
    return this.getTypedRuleContext(
      AnnotationMethodOrConstantRestContext,
      0,
    ) as AnnotationMethodOrConstantRestContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public classDeclaration(): ClassDeclarationContext {
    return this.getTypedRuleContext(
      ClassDeclarationContext,
      0,
    ) as ClassDeclarationContext;
  }
  public interfaceDeclaration(): InterfaceDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceDeclarationContext,
      0,
    ) as InterfaceDeclarationContext;
  }
  public enumDeclaration(): EnumDeclarationContext {
    return this.getTypedRuleContext(
      EnumDeclarationContext,
      0,
    ) as EnumDeclarationContext;
  }
  public annotationTypeDeclaration(): AnnotationTypeDeclarationContext {
    return this.getTypedRuleContext(
      AnnotationTypeDeclarationContext,
      0,
    ) as AnnotationTypeDeclarationContext;
  }
  public recordDeclaration(): RecordDeclarationContext {
    return this.getTypedRuleContext(
      RecordDeclarationContext,
      0,
    ) as RecordDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationTypeElementRest;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationTypeElementRest) {
      listener.enterAnnotationTypeElementRest(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationTypeElementRest) {
      listener.exitAnnotationTypeElementRest(this);
    }
  }
}

export class AnnotationMethodOrConstantRestContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public annotationMethodRest(): AnnotationMethodRestContext {
    return this.getTypedRuleContext(
      AnnotationMethodRestContext,
      0,
    ) as AnnotationMethodRestContext;
  }
  public annotationConstantRest(): AnnotationConstantRestContext {
    return this.getTypedRuleContext(
      AnnotationConstantRestContext,
      0,
    ) as AnnotationConstantRestContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationMethodOrConstantRest;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationMethodOrConstantRest) {
      listener.enterAnnotationMethodOrConstantRest(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationMethodOrConstantRest) {
      listener.exitAnnotationMethodOrConstantRest(this);
    }
  }
}

export class AnnotationMethodRestContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public defaultValue(): DefaultValueContext {
    return this.getTypedRuleContext(
      DefaultValueContext,
      0,
    ) as DefaultValueContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationMethodRest;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationMethodRest) {
      listener.enterAnnotationMethodRest(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationMethodRest) {
      listener.exitAnnotationMethodRest(this);
    }
  }
}

export class AnnotationConstantRestContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public variableDeclarators(): VariableDeclaratorsContext {
    return this.getTypedRuleContext(
      VariableDeclaratorsContext,
      0,
    ) as VariableDeclaratorsContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_annotationConstantRest;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterAnnotationConstantRest) {
      listener.enterAnnotationConstantRest(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitAnnotationConstantRest) {
      listener.exitAnnotationConstantRest(this);
    }
  }
}

export class DefaultValueContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public DEFAULT(): TerminalNode {
    return this.getToken(JavaParser.DEFAULT, 0);
  }
  public elementValue(): ElementValueContext {
    return this.getTypedRuleContext(
      ElementValueContext,
      0,
    ) as ElementValueContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_defaultValue;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterDefaultValue) {
      listener.enterDefaultValue(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitDefaultValue) {
      listener.exitDefaultValue(this);
    }
  }
}

export class ModuleDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public MODULE(): TerminalNode {
    return this.getToken(JavaParser.MODULE, 0);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public OPEN(): TerminalNode {
    return this.getToken(JavaParser.OPEN, 0);
  }
  public moduleDirective_list(): ModuleDirectiveContext[] {
    return this.getTypedRuleContexts(
      ModuleDirectiveContext,
    ) as ModuleDirectiveContext[];
  }
  public moduleDirective(i: number): ModuleDirectiveContext {
    return this.getTypedRuleContext(
      ModuleDirectiveContext,
      i,
    ) as ModuleDirectiveContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_moduleDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterModuleDeclaration) {
      listener.enterModuleDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitModuleDeclaration) {
      listener.exitModuleDeclaration(this);
    }
  }
}

export class ModuleDirectiveContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public REQUIRES(): TerminalNode {
    return this.getToken(JavaParser.REQUIRES, 0);
  }
  public qualifiedName_list(): QualifiedNameContext[] {
    return this.getTypedRuleContexts(
      QualifiedNameContext,
    ) as QualifiedNameContext[];
  }
  public qualifiedName(i: number): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      i,
    ) as QualifiedNameContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public requiresModifier_list(): RequiresModifierContext[] {
    return this.getTypedRuleContexts(
      RequiresModifierContext,
    ) as RequiresModifierContext[];
  }
  public requiresModifier(i: number): RequiresModifierContext {
    return this.getTypedRuleContext(
      RequiresModifierContext,
      i,
    ) as RequiresModifierContext;
  }
  public EXPORTS(): TerminalNode {
    return this.getToken(JavaParser.EXPORTS, 0);
  }
  public TO(): TerminalNode {
    return this.getToken(JavaParser.TO, 0);
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public OPENS(): TerminalNode {
    return this.getToken(JavaParser.OPENS, 0);
  }
  public USES(): TerminalNode {
    return this.getToken(JavaParser.USES, 0);
  }
  public PROVIDES(): TerminalNode {
    return this.getToken(JavaParser.PROVIDES, 0);
  }
  public WITH(): TerminalNode {
    return this.getToken(JavaParser.WITH, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_moduleDirective;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterModuleDirective) {
      listener.enterModuleDirective(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitModuleDirective) {
      listener.exitModuleDirective(this);
    }
  }
}

export class RequiresModifierContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public TRANSITIVE(): TerminalNode {
    return this.getToken(JavaParser.TRANSITIVE, 0);
  }
  public STATIC(): TerminalNode {
    return this.getToken(JavaParser.STATIC, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_requiresModifier;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterRequiresModifier) {
      listener.enterRequiresModifier(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitRequiresModifier) {
      listener.exitRequiresModifier(this);
    }
  }
}

export class RecordDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public RECORD(): TerminalNode {
    return this.getToken(JavaParser.RECORD, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public recordHeader(): RecordHeaderContext {
    return this.getTypedRuleContext(
      RecordHeaderContext,
      0,
    ) as RecordHeaderContext;
  }
  public recordBody(): RecordBodyContext {
    return this.getTypedRuleContext(RecordBodyContext, 0) as RecordBodyContext;
  }
  public typeParameters(): TypeParametersContext {
    return this.getTypedRuleContext(
      TypeParametersContext,
      0,
    ) as TypeParametersContext;
  }
  public IMPLEMENTS(): TerminalNode {
    return this.getToken(JavaParser.IMPLEMENTS, 0);
  }
  public typeList(): TypeListContext {
    return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_recordDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterRecordDeclaration) {
      listener.enterRecordDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitRecordDeclaration) {
      listener.exitRecordDeclaration(this);
    }
  }
}

export class RecordHeaderContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public recordComponentList(): RecordComponentListContext {
    return this.getTypedRuleContext(
      RecordComponentListContext,
      0,
    ) as RecordComponentListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_recordHeader;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterRecordHeader) {
      listener.enterRecordHeader(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitRecordHeader) {
      listener.exitRecordHeader(this);
    }
  }
}

export class RecordComponentListContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public recordComponent_list(): RecordComponentContext[] {
    return this.getTypedRuleContexts(
      RecordComponentContext,
    ) as RecordComponentContext[];
  }
  public recordComponent(i: number): RecordComponentContext {
    return this.getTypedRuleContext(
      RecordComponentContext,
      i,
    ) as RecordComponentContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_recordComponentList;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterRecordComponentList) {
      listener.enterRecordComponentList(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitRecordComponentList) {
      listener.exitRecordComponentList(this);
    }
  }
}

export class RecordComponentContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public ELLIPSIS(): TerminalNode {
    return this.getToken(JavaParser.ELLIPSIS, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_recordComponent;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterRecordComponent) {
      listener.enterRecordComponent(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitRecordComponent) {
      listener.exitRecordComponent(this);
    }
  }
}

export class RecordBodyContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public classBodyDeclaration_list(): ClassBodyDeclarationContext[] {
    return this.getTypedRuleContexts(
      ClassBodyDeclarationContext,
    ) as ClassBodyDeclarationContext[];
  }
  public classBodyDeclaration(i: number): ClassBodyDeclarationContext {
    return this.getTypedRuleContext(
      ClassBodyDeclarationContext,
      i,
    ) as ClassBodyDeclarationContext;
  }
  public compactConstructorDeclaration_list(): CompactConstructorDeclarationContext[] {
    return this.getTypedRuleContexts(
      CompactConstructorDeclarationContext,
    ) as CompactConstructorDeclarationContext[];
  }
  public compactConstructorDeclaration(
    i: number,
  ): CompactConstructorDeclarationContext {
    return this.getTypedRuleContext(
      CompactConstructorDeclarationContext,
      i,
    ) as CompactConstructorDeclarationContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_recordBody;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterRecordBody) {
      listener.enterRecordBody(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitRecordBody) {
      listener.exitRecordBody(this);
    }
  }
}

export class BlockContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public blockStatement_list(): BlockStatementContext[] {
    return this.getTypedRuleContexts(
      BlockStatementContext,
    ) as BlockStatementContext[];
  }
  public blockStatement(i: number): BlockStatementContext {
    return this.getTypedRuleContext(
      BlockStatementContext,
      i,
    ) as BlockStatementContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_block;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterBlock) {
      listener.enterBlock(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitBlock) {
      listener.exitBlock(this);
    }
  }
}

export class BlockStatementContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public localVariableDeclaration(): LocalVariableDeclarationContext {
    return this.getTypedRuleContext(
      LocalVariableDeclarationContext,
      0,
    ) as LocalVariableDeclarationContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public localTypeDeclaration(): LocalTypeDeclarationContext {
    return this.getTypedRuleContext(
      LocalTypeDeclarationContext,
      0,
    ) as LocalTypeDeclarationContext;
  }
  public statement(): StatementContext {
    return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_blockStatement;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterBlockStatement) {
      listener.enterBlockStatement(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitBlockStatement) {
      listener.exitBlockStatement(this);
    }
  }
}

export class LocalVariableDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public VAR(): TerminalNode {
    return this.getToken(JavaParser.VAR, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.ASSIGN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public variableDeclarators(): VariableDeclaratorsContext {
    return this.getTypedRuleContext(
      VariableDeclaratorsContext,
      0,
    ) as VariableDeclaratorsContext;
  }
  public variableModifier_list(): VariableModifierContext[] {
    return this.getTypedRuleContexts(
      VariableModifierContext,
    ) as VariableModifierContext[];
  }
  public variableModifier(i: number): VariableModifierContext {
    return this.getTypedRuleContext(
      VariableModifierContext,
      i,
    ) as VariableModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_localVariableDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLocalVariableDeclaration) {
      listener.enterLocalVariableDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLocalVariableDeclaration) {
      listener.exitLocalVariableDeclaration(this);
    }
  }
}

export class IdentifierContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(JavaParser.IDENTIFIER, 0);
  }
  public MODULE(): TerminalNode {
    return this.getToken(JavaParser.MODULE, 0);
  }
  public OPEN(): TerminalNode {
    return this.getToken(JavaParser.OPEN, 0);
  }
  public REQUIRES(): TerminalNode {
    return this.getToken(JavaParser.REQUIRES, 0);
  }
  public EXPORTS(): TerminalNode {
    return this.getToken(JavaParser.EXPORTS, 0);
  }
  public OPENS(): TerminalNode {
    return this.getToken(JavaParser.OPENS, 0);
  }
  public TO(): TerminalNode {
    return this.getToken(JavaParser.TO, 0);
  }
  public USES(): TerminalNode {
    return this.getToken(JavaParser.USES, 0);
  }
  public PROVIDES(): TerminalNode {
    return this.getToken(JavaParser.PROVIDES, 0);
  }
  public WHEN(): TerminalNode {
    return this.getToken(JavaParser.WHEN, 0);
  }
  public WITH(): TerminalNode {
    return this.getToken(JavaParser.WITH, 0);
  }
  public TRANSITIVE(): TerminalNode {
    return this.getToken(JavaParser.TRANSITIVE, 0);
  }
  public YIELD(): TerminalNode {
    return this.getToken(JavaParser.YIELD, 0);
  }
  public SEALED(): TerminalNode {
    return this.getToken(JavaParser.SEALED, 0);
  }
  public PERMITS(): TerminalNode {
    return this.getToken(JavaParser.PERMITS, 0);
  }
  public RECORD(): TerminalNode {
    return this.getToken(JavaParser.RECORD, 0);
  }
  public VAR(): TerminalNode {
    return this.getToken(JavaParser.VAR, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_identifier;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterIdentifier) {
      listener.enterIdentifier(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitIdentifier) {
      listener.exitIdentifier(this);
    }
  }
}

export class TypeIdentifierContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(JavaParser.IDENTIFIER, 0);
  }
  public MODULE(): TerminalNode {
    return this.getToken(JavaParser.MODULE, 0);
  }
  public OPEN(): TerminalNode {
    return this.getToken(JavaParser.OPEN, 0);
  }
  public REQUIRES(): TerminalNode {
    return this.getToken(JavaParser.REQUIRES, 0);
  }
  public EXPORTS(): TerminalNode {
    return this.getToken(JavaParser.EXPORTS, 0);
  }
  public OPENS(): TerminalNode {
    return this.getToken(JavaParser.OPENS, 0);
  }
  public TO(): TerminalNode {
    return this.getToken(JavaParser.TO, 0);
  }
  public USES(): TerminalNode {
    return this.getToken(JavaParser.USES, 0);
  }
  public PROVIDES(): TerminalNode {
    return this.getToken(JavaParser.PROVIDES, 0);
  }
  public WITH(): TerminalNode {
    return this.getToken(JavaParser.WITH, 0);
  }
  public TRANSITIVE(): TerminalNode {
    return this.getToken(JavaParser.TRANSITIVE, 0);
  }
  public SEALED(): TerminalNode {
    return this.getToken(JavaParser.SEALED, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeIdentifier;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeIdentifier) {
      listener.enterTypeIdentifier(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeIdentifier) {
      listener.exitTypeIdentifier(this);
    }
  }
}

export class LocalTypeDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public classDeclaration(): ClassDeclarationContext {
    return this.getTypedRuleContext(
      ClassDeclarationContext,
      0,
    ) as ClassDeclarationContext;
  }
  public interfaceDeclaration(): InterfaceDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceDeclarationContext,
      0,
    ) as InterfaceDeclarationContext;
  }
  public recordDeclaration(): RecordDeclarationContext {
    return this.getTypedRuleContext(
      RecordDeclarationContext,
      0,
    ) as RecordDeclarationContext;
  }
  public enumDeclaration(): EnumDeclarationContext {
    return this.getTypedRuleContext(
      EnumDeclarationContext,
      0,
    ) as EnumDeclarationContext;
  }
  public classOrInterfaceModifier_list(): ClassOrInterfaceModifierContext[] {
    return this.getTypedRuleContexts(
      ClassOrInterfaceModifierContext,
    ) as ClassOrInterfaceModifierContext[];
  }
  public classOrInterfaceModifier(i: number): ClassOrInterfaceModifierContext {
    return this.getTypedRuleContext(
      ClassOrInterfaceModifierContext,
      i,
    ) as ClassOrInterfaceModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_localTypeDeclaration;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLocalTypeDeclaration) {
      listener.enterLocalTypeDeclaration(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLocalTypeDeclaration) {
      listener.exitLocalTypeDeclaration(this);
    }
  }
}

export class StatementContext extends ParserRuleContext {
  public _blockLabel!: BlockContext;
  public _statementExpression!: ExpressionContext;
  public _identifierLabel!: IdentifierContext;
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public ASSERT(): TerminalNode {
    return this.getToken(JavaParser.ASSERT, 0);
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public COLON(): TerminalNode {
    return this.getToken(JavaParser.COLON, 0);
  }
  public IF(): TerminalNode {
    return this.getToken(JavaParser.IF, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public statement_list(): StatementContext[] {
    return this.getTypedRuleContexts(StatementContext) as StatementContext[];
  }
  public statement(i: number): StatementContext {
    return this.getTypedRuleContext(StatementContext, i) as StatementContext;
  }
  public ELSE(): TerminalNode {
    return this.getToken(JavaParser.ELSE, 0);
  }
  public FOR(): TerminalNode {
    return this.getToken(JavaParser.FOR, 0);
  }
  public forControl(): ForControlContext {
    return this.getTypedRuleContext(ForControlContext, 0) as ForControlContext;
  }
  public WHILE(): TerminalNode {
    return this.getToken(JavaParser.WHILE, 0);
  }
  public DO(): TerminalNode {
    return this.getToken(JavaParser.DO, 0);
  }
  public TRY(): TerminalNode {
    return this.getToken(JavaParser.TRY, 0);
  }
  public finallyBlock(): FinallyBlockContext {
    return this.getTypedRuleContext(
      FinallyBlockContext,
      0,
    ) as FinallyBlockContext;
  }
  public catchClause_list(): CatchClauseContext[] {
    return this.getTypedRuleContexts(
      CatchClauseContext,
    ) as CatchClauseContext[];
  }
  public catchClause(i: number): CatchClauseContext {
    return this.getTypedRuleContext(
      CatchClauseContext,
      i,
    ) as CatchClauseContext;
  }
  public resourceSpecification(): ResourceSpecificationContext {
    return this.getTypedRuleContext(
      ResourceSpecificationContext,
      0,
    ) as ResourceSpecificationContext;
  }
  public SWITCH(): TerminalNode {
    return this.getToken(JavaParser.SWITCH, 0);
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public switchBlockStatementGroup_list(): SwitchBlockStatementGroupContext[] {
    return this.getTypedRuleContexts(
      SwitchBlockStatementGroupContext,
    ) as SwitchBlockStatementGroupContext[];
  }
  public switchBlockStatementGroup(
    i: number,
  ): SwitchBlockStatementGroupContext {
    return this.getTypedRuleContext(
      SwitchBlockStatementGroupContext,
      i,
    ) as SwitchBlockStatementGroupContext;
  }
  public switchLabel_list(): SwitchLabelContext[] {
    return this.getTypedRuleContexts(
      SwitchLabelContext,
    ) as SwitchLabelContext[];
  }
  public switchLabel(i: number): SwitchLabelContext {
    return this.getTypedRuleContext(
      SwitchLabelContext,
      i,
    ) as SwitchLabelContext;
  }
  public SYNCHRONIZED(): TerminalNode {
    return this.getToken(JavaParser.SYNCHRONIZED, 0);
  }
  public RETURN(): TerminalNode {
    return this.getToken(JavaParser.RETURN, 0);
  }
  public THROW(): TerminalNode {
    return this.getToken(JavaParser.THROW, 0);
  }
  public BREAK(): TerminalNode {
    return this.getToken(JavaParser.BREAK, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public CONTINUE(): TerminalNode {
    return this.getToken(JavaParser.CONTINUE, 0);
  }
  public YIELD(): TerminalNode {
    return this.getToken(JavaParser.YIELD, 0);
  }
  public switchExpression(): SwitchExpressionContext {
    return this.getTypedRuleContext(
      SwitchExpressionContext,
      0,
    ) as SwitchExpressionContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_statement;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterStatement) {
      listener.enterStatement(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitStatement) {
      listener.exitStatement(this);
    }
  }
}

export class CatchClauseContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public CATCH(): TerminalNode {
    return this.getToken(JavaParser.CATCH, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public catchType(): CatchTypeContext {
    return this.getTypedRuleContext(CatchTypeContext, 0) as CatchTypeContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public variableModifier_list(): VariableModifierContext[] {
    return this.getTypedRuleContexts(
      VariableModifierContext,
    ) as VariableModifierContext[];
  }
  public variableModifier(i: number): VariableModifierContext {
    return this.getTypedRuleContext(
      VariableModifierContext,
      i,
    ) as VariableModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_catchClause;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCatchClause) {
      listener.enterCatchClause(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCatchClause) {
      listener.exitCatchClause(this);
    }
  }
}

export class CatchTypeContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public qualifiedName_list(): QualifiedNameContext[] {
    return this.getTypedRuleContexts(
      QualifiedNameContext,
    ) as QualifiedNameContext[];
  }
  public qualifiedName(i: number): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      i,
    ) as QualifiedNameContext;
  }
  public BITOR_list(): TerminalNode[] {
    return this.getTokens(JavaParser.BITOR);
  }
  public BITOR(i: number): TerminalNode {
    return this.getToken(JavaParser.BITOR, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_catchType;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCatchType) {
      listener.enterCatchType(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCatchType) {
      listener.exitCatchType(this);
    }
  }
}

export class FinallyBlockContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public FINALLY(): TerminalNode {
    return this.getToken(JavaParser.FINALLY, 0);
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_finallyBlock;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterFinallyBlock) {
      listener.enterFinallyBlock(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitFinallyBlock) {
      listener.exitFinallyBlock(this);
    }
  }
}

export class ResourceSpecificationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public resources(): ResourcesContext {
    return this.getTypedRuleContext(ResourcesContext, 0) as ResourcesContext;
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public SEMI(): TerminalNode {
    return this.getToken(JavaParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_resourceSpecification;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterResourceSpecification) {
      listener.enterResourceSpecification(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitResourceSpecification) {
      listener.exitResourceSpecification(this);
    }
  }
}

export class ResourcesContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public resource_list(): ResourceContext[] {
    return this.getTypedRuleContexts(ResourceContext) as ResourceContext[];
  }
  public resource(i: number): ResourceContext {
    return this.getTypedRuleContext(ResourceContext, i) as ResourceContext;
  }
  public SEMI_list(): TerminalNode[] {
    return this.getTokens(JavaParser.SEMI);
  }
  public SEMI(i: number): TerminalNode {
    return this.getToken(JavaParser.SEMI, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_resources;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterResources) {
      listener.enterResources(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitResources) {
      listener.exitResources(this);
    }
  }
}

export class ResourceContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.ASSIGN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public classOrInterfaceType(): ClassOrInterfaceTypeContext {
    return this.getTypedRuleContext(
      ClassOrInterfaceTypeContext,
      0,
    ) as ClassOrInterfaceTypeContext;
  }
  public variableDeclaratorId(): VariableDeclaratorIdContext {
    return this.getTypedRuleContext(
      VariableDeclaratorIdContext,
      0,
    ) as VariableDeclaratorIdContext;
  }
  public VAR(): TerminalNode {
    return this.getToken(JavaParser.VAR, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public variableModifier_list(): VariableModifierContext[] {
    return this.getTypedRuleContexts(
      VariableModifierContext,
    ) as VariableModifierContext[];
  }
  public variableModifier(i: number): VariableModifierContext {
    return this.getTypedRuleContext(
      VariableModifierContext,
      i,
    ) as VariableModifierContext;
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_resource;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterResource) {
      listener.enterResource(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitResource) {
      listener.exitResource(this);
    }
  }
}

export class SwitchBlockStatementGroupContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public switchLabel_list(): SwitchLabelContext[] {
    return this.getTypedRuleContexts(
      SwitchLabelContext,
    ) as SwitchLabelContext[];
  }
  public switchLabel(i: number): SwitchLabelContext {
    return this.getTypedRuleContext(
      SwitchLabelContext,
      i,
    ) as SwitchLabelContext;
  }
  public COLON_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COLON);
  }
  public COLON(i: number): TerminalNode {
    return this.getToken(JavaParser.COLON, i);
  }
  public blockStatement_list(): BlockStatementContext[] {
    return this.getTypedRuleContexts(
      BlockStatementContext,
    ) as BlockStatementContext[];
  }
  public blockStatement(i: number): BlockStatementContext {
    return this.getTypedRuleContext(
      BlockStatementContext,
      i,
    ) as BlockStatementContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_switchBlockStatementGroup;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterSwitchBlockStatementGroup) {
      listener.enterSwitchBlockStatementGroup(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitSwitchBlockStatementGroup) {
      listener.exitSwitchBlockStatementGroup(this);
    }
  }
}

export class SwitchLabelContext extends ParserRuleContext {
  public _constantExpression!: ExpressionContext;
  public _enumConstantName!: Token;
  public _varName!: IdentifierContext;
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public CASE(): TerminalNode {
    return this.getToken(JavaParser.CASE, 0);
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(JavaParser.IDENTIFIER, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public DEFAULT(): TerminalNode {
    return this.getToken(JavaParser.DEFAULT, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_switchLabel;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterSwitchLabel) {
      listener.enterSwitchLabel(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitSwitchLabel) {
      listener.exitSwitchLabel(this);
    }
  }
}

export class ForControlContext extends ParserRuleContext {
  public _forUpdate!: ExpressionListContext;
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public enhancedForControl(): EnhancedForControlContext {
    return this.getTypedRuleContext(
      EnhancedForControlContext,
      0,
    ) as EnhancedForControlContext;
  }
  public SEMI_list(): TerminalNode[] {
    return this.getTokens(JavaParser.SEMI);
  }
  public SEMI(i: number): TerminalNode {
    return this.getToken(JavaParser.SEMI, i);
  }
  public forInit(): ForInitContext {
    return this.getTypedRuleContext(ForInitContext, 0) as ForInitContext;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(
      ExpressionListContext,
      0,
    ) as ExpressionListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_forControl;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterForControl) {
      listener.enterForControl(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitForControl) {
      listener.exitForControl(this);
    }
  }
}

export class ForInitContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public localVariableDeclaration(): LocalVariableDeclarationContext {
    return this.getTypedRuleContext(
      LocalVariableDeclarationContext,
      0,
    ) as LocalVariableDeclarationContext;
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(
      ExpressionListContext,
      0,
    ) as ExpressionListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_forInit;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterForInit) {
      listener.enterForInit(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitForInit) {
      listener.exitForInit(this);
    }
  }
}

export class EnhancedForControlContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public variableDeclaratorId(): VariableDeclaratorIdContext {
    return this.getTypedRuleContext(
      VariableDeclaratorIdContext,
      0,
    ) as VariableDeclaratorIdContext;
  }
  public COLON(): TerminalNode {
    return this.getToken(JavaParser.COLON, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public VAR(): TerminalNode {
    return this.getToken(JavaParser.VAR, 0);
  }
  public variableModifier_list(): VariableModifierContext[] {
    return this.getTypedRuleContexts(
      VariableModifierContext,
    ) as VariableModifierContext[];
  }
  public variableModifier(i: number): VariableModifierContext {
    return this.getTypedRuleContext(
      VariableModifierContext,
      i,
    ) as VariableModifierContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_enhancedForControl;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterEnhancedForControl) {
      listener.enterEnhancedForControl(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitEnhancedForControl) {
      listener.exitEnhancedForControl(this);
    }
  }
}

export class ExpressionListContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_expressionList;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterExpressionList) {
      listener.enterExpressionList(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitExpressionList) {
      listener.exitExpressionList(this);
    }
  }
}

export class MethodCallContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public arguments(): ArgumentsContext {
    return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public THIS(): TerminalNode {
    return this.getToken(JavaParser.THIS, 0);
  }
  public SUPER(): TerminalNode {
    return this.getToken(JavaParser.SUPER, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_methodCall;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterMethodCall) {
      listener.enterMethodCall(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitMethodCall) {
      listener.exitMethodCall(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_expression;
  }
  public override copyFrom(ctx: ExpressionContext): void {
    super.copyFrom(ctx);
  }
}
export class TernaryExpressionContext extends ExpressionContext {
  public _bop!: Token;
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
  }
  public COLON(): TerminalNode {
    return this.getToken(JavaParser.COLON, 0);
  }
  public QUESTION(): TerminalNode {
    return this.getToken(JavaParser.QUESTION, 0);
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTernaryExpression) {
      listener.enterTernaryExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTernaryExpression) {
      listener.exitTernaryExpression(this);
    }
  }
}
export class InstanceOfOperatorExpressionContext extends ExpressionContext {
  public _bop!: Token;
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public INSTANCEOF(): TerminalNode {
    return this.getToken(JavaParser.INSTANCEOF, 0);
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public pattern(): PatternContext {
    return this.getTypedRuleContext(PatternContext, 0) as PatternContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInstanceOfOperatorExpression) {
      listener.enterInstanceOfOperatorExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInstanceOfOperatorExpression) {
      listener.exitInstanceOfOperatorExpression(this);
    }
  }
}
export class UnaryOperatorExpressionContext extends ExpressionContext {
  public _prefix!: Token;
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public ADD(): TerminalNode {
    return this.getToken(JavaParser.ADD, 0);
  }
  public SUB(): TerminalNode {
    return this.getToken(JavaParser.SUB, 0);
  }
  public INC(): TerminalNode {
    return this.getToken(JavaParser.INC, 0);
  }
  public DEC(): TerminalNode {
    return this.getToken(JavaParser.DEC, 0);
  }
  public TILDE(): TerminalNode {
    return this.getToken(JavaParser.TILDE, 0);
  }
  public BANG(): TerminalNode {
    return this.getToken(JavaParser.BANG, 0);
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterUnaryOperatorExpression) {
      listener.enterUnaryOperatorExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitUnaryOperatorExpression) {
      listener.exitUnaryOperatorExpression(this);
    }
  }
}
export class PrimaryExpressionContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public primary(): PrimaryContext {
    return this.getTypedRuleContext(PrimaryContext, 0) as PrimaryContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterPrimaryExpression) {
      listener.enterPrimaryExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitPrimaryExpression) {
      listener.exitPrimaryExpression(this);
    }
  }
}
export class ObjectCreationExpressionContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public NEW(): TerminalNode {
    return this.getToken(JavaParser.NEW, 0);
  }
  public creator(): CreatorContext {
    return this.getTypedRuleContext(CreatorContext, 0) as CreatorContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterObjectCreationExpression) {
      listener.enterObjectCreationExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitObjectCreationExpression) {
      listener.exitObjectCreationExpression(this);
    }
  }
}
export class ExpressionLambdaContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public lambdaExpression(): LambdaExpressionContext {
    return this.getTypedRuleContext(
      LambdaExpressionContext,
      0,
    ) as LambdaExpressionContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterExpressionLambda) {
      listener.enterExpressionLambda(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitExpressionLambda) {
      listener.exitExpressionLambda(this);
    }
  }
}
export class PostIncrementDecrementOperatorExpressionContext extends ExpressionContext {
  public _postfix!: Token;
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public INC(): TerminalNode {
    return this.getToken(JavaParser.INC, 0);
  }
  public DEC(): TerminalNode {
    return this.getToken(JavaParser.DEC, 0);
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterPostIncrementDecrementOperatorExpression) {
      listener.enterPostIncrementDecrementOperatorExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitPostIncrementDecrementOperatorExpression) {
      listener.exitPostIncrementDecrementOperatorExpression(this);
    }
  }
}
export class MemberReferenceExpressionContext extends ExpressionContext {
  public _bop!: Token;
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public DOT(): TerminalNode {
    return this.getToken(JavaParser.DOT, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public methodCall(): MethodCallContext {
    return this.getTypedRuleContext(MethodCallContext, 0) as MethodCallContext;
  }
  public THIS(): TerminalNode {
    return this.getToken(JavaParser.THIS, 0);
  }
  public NEW(): TerminalNode {
    return this.getToken(JavaParser.NEW, 0);
  }
  public innerCreator(): InnerCreatorContext {
    return this.getTypedRuleContext(
      InnerCreatorContext,
      0,
    ) as InnerCreatorContext;
  }
  public SUPER(): TerminalNode {
    return this.getToken(JavaParser.SUPER, 0);
  }
  public superSuffix(): SuperSuffixContext {
    return this.getTypedRuleContext(
      SuperSuffixContext,
      0,
    ) as SuperSuffixContext;
  }
  public explicitGenericInvocation(): ExplicitGenericInvocationContext {
    return this.getTypedRuleContext(
      ExplicitGenericInvocationContext,
      0,
    ) as ExplicitGenericInvocationContext;
  }
  public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
    return this.getTypedRuleContext(
      NonWildcardTypeArgumentsContext,
      0,
    ) as NonWildcardTypeArgumentsContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterMemberReferenceExpression) {
      listener.enterMemberReferenceExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitMemberReferenceExpression) {
      listener.exitMemberReferenceExpression(this);
    }
  }
}
export class ExpressionSwitchContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public switchExpression(): SwitchExpressionContext {
    return this.getTypedRuleContext(
      SwitchExpressionContext,
      0,
    ) as SwitchExpressionContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterExpressionSwitch) {
      listener.enterExpressionSwitch(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitExpressionSwitch) {
      listener.exitExpressionSwitch(this);
    }
  }
}
export class BinaryOperatorExpressionContext extends ExpressionContext {
  public _bop!: Token;
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
  }
  public MUL(): TerminalNode {
    return this.getToken(JavaParser.MUL, 0);
  }
  public DIV(): TerminalNode {
    return this.getToken(JavaParser.DIV, 0);
  }
  public MOD(): TerminalNode {
    return this.getToken(JavaParser.MOD, 0);
  }
  public ADD(): TerminalNode {
    return this.getToken(JavaParser.ADD, 0);
  }
  public SUB(): TerminalNode {
    return this.getToken(JavaParser.SUB, 0);
  }
  public LT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.LT);
  }
  public LT(i: number): TerminalNode {
    return this.getToken(JavaParser.LT, i);
  }
  public GT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.GT);
  }
  public GT(i: number): TerminalNode {
    return this.getToken(JavaParser.GT, i);
  }
  public LE(): TerminalNode {
    return this.getToken(JavaParser.LE, 0);
  }
  public GE(): TerminalNode {
    return this.getToken(JavaParser.GE, 0);
  }
  public EQUAL(): TerminalNode {
    return this.getToken(JavaParser.EQUAL, 0);
  }
  public NOTEQUAL(): TerminalNode {
    return this.getToken(JavaParser.NOTEQUAL, 0);
  }
  public BITAND(): TerminalNode {
    return this.getToken(JavaParser.BITAND, 0);
  }
  public CARET(): TerminalNode {
    return this.getToken(JavaParser.CARET, 0);
  }
  public BITOR(): TerminalNode {
    return this.getToken(JavaParser.BITOR, 0);
  }
  public AND(): TerminalNode {
    return this.getToken(JavaParser.AND, 0);
  }
  public OR(): TerminalNode {
    return this.getToken(JavaParser.OR, 0);
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.ASSIGN, 0);
  }
  public ADD_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.ADD_ASSIGN, 0);
  }
  public SUB_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.SUB_ASSIGN, 0);
  }
  public MUL_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.MUL_ASSIGN, 0);
  }
  public DIV_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.DIV_ASSIGN, 0);
  }
  public AND_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.AND_ASSIGN, 0);
  }
  public OR_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.OR_ASSIGN, 0);
  }
  public XOR_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.XOR_ASSIGN, 0);
  }
  public RSHIFT_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.RSHIFT_ASSIGN, 0);
  }
  public URSHIFT_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.URSHIFT_ASSIGN, 0);
  }
  public LSHIFT_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.LSHIFT_ASSIGN, 0);
  }
  public MOD_ASSIGN(): TerminalNode {
    return this.getToken(JavaParser.MOD_ASSIGN, 0);
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterBinaryOperatorExpression) {
      listener.enterBinaryOperatorExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitBinaryOperatorExpression) {
      listener.exitBinaryOperatorExpression(this);
    }
  }
}
export class MethodCallExpressionContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public methodCall(): MethodCallContext {
    return this.getTypedRuleContext(MethodCallContext, 0) as MethodCallContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterMethodCallExpression) {
      listener.enterMethodCallExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitMethodCallExpression) {
      listener.exitMethodCallExpression(this);
    }
  }
}
export class MethodReferenceExpressionContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public COLONCOLON(): TerminalNode {
    return this.getToken(JavaParser.COLONCOLON, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public NEW(): TerminalNode {
    return this.getToken(JavaParser.NEW, 0);
  }
  public typeArguments(): TypeArgumentsContext {
    return this.getTypedRuleContext(
      TypeArgumentsContext,
      0,
    ) as TypeArgumentsContext;
  }
  public classType(): ClassTypeContext {
    return this.getTypedRuleContext(ClassTypeContext, 0) as ClassTypeContext;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterMethodReferenceExpression) {
      listener.enterMethodReferenceExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitMethodReferenceExpression) {
      listener.exitMethodReferenceExpression(this);
    }
  }
}
export class SquareBracketExpressionContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
  }
  public LBRACK(): TerminalNode {
    return this.getToken(JavaParser.LBRACK, 0);
  }
  public RBRACK(): TerminalNode {
    return this.getToken(JavaParser.RBRACK, 0);
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterSquareBracketExpression) {
      listener.enterSquareBracketExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitSquareBracketExpression) {
      listener.exitSquareBracketExpression(this);
    }
  }
}
export class CastExpressionContext extends ExpressionContext {
  constructor(parser: JavaParser, ctx: ExpressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public typeType_list(): TypeTypeContext[] {
    return this.getTypedRuleContexts(TypeTypeContext) as TypeTypeContext[];
  }
  public typeType(i: number): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, i) as TypeTypeContext;
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public BITAND_list(): TerminalNode[] {
    return this.getTokens(JavaParser.BITAND);
  }
  public BITAND(i: number): TerminalNode {
    return this.getToken(JavaParser.BITAND, i);
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCastExpression) {
      listener.enterCastExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCastExpression) {
      listener.exitCastExpression(this);
    }
  }
}

export class PatternContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType(): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, 0) as TypeTypeContext;
  }
  public variableDeclarators(): VariableDeclaratorsContext {
    return this.getTypedRuleContext(
      VariableDeclaratorsContext,
      0,
    ) as VariableDeclaratorsContext;
  }
  public variableModifier_list(): VariableModifierContext[] {
    return this.getTypedRuleContexts(
      VariableModifierContext,
    ) as VariableModifierContext[];
  }
  public variableModifier(i: number): VariableModifierContext {
    return this.getTypedRuleContext(
      VariableModifierContext,
      i,
    ) as VariableModifierContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public componentPatternList(): ComponentPatternListContext {
    return this.getTypedRuleContext(
      ComponentPatternListContext,
      0,
    ) as ComponentPatternListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_pattern;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterPattern) {
      listener.enterPattern(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitPattern) {
      listener.exitPattern(this);
    }
  }
}

export class ComponentPatternListContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public componentPattern_list(): ComponentPatternContext[] {
    return this.getTypedRuleContexts(
      ComponentPatternContext,
    ) as ComponentPatternContext[];
  }
  public componentPattern(i: number): ComponentPatternContext {
    return this.getTypedRuleContext(
      ComponentPatternContext,
      i,
    ) as ComponentPatternContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_componentPatternList;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterComponentPatternList) {
      listener.enterComponentPatternList(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitComponentPatternList) {
      listener.exitComponentPatternList(this);
    }
  }
}

export class ComponentPatternContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public pattern(): PatternContext {
    return this.getTypedRuleContext(PatternContext, 0) as PatternContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_componentPattern;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterComponentPattern) {
      listener.enterComponentPattern(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitComponentPattern) {
      listener.exitComponentPattern(this);
    }
  }
}

export class LambdaExpressionContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public lambdaParameters(): LambdaParametersContext {
    return this.getTypedRuleContext(
      LambdaParametersContext,
      0,
    ) as LambdaParametersContext;
  }
  public ARROW(): TerminalNode {
    return this.getToken(JavaParser.ARROW, 0);
  }
  public lambdaBody(): LambdaBodyContext {
    return this.getTypedRuleContext(LambdaBodyContext, 0) as LambdaBodyContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_lambdaExpression;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLambdaExpression) {
      listener.enterLambdaExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLambdaExpression) {
      listener.exitLambdaExpression(this);
    }
  }
}

export class LambdaParametersContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier_list(): IdentifierContext[] {
    return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
  }
  public identifier(i: number): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public formalParameterList(): FormalParameterListContext {
    return this.getTypedRuleContext(
      FormalParameterListContext,
      0,
    ) as FormalParameterListContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public lambdaLVTIList(): LambdaLVTIListContext {
    return this.getTypedRuleContext(
      LambdaLVTIListContext,
      0,
    ) as LambdaLVTIListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_lambdaParameters;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLambdaParameters) {
      listener.enterLambdaParameters(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLambdaParameters) {
      listener.exitLambdaParameters(this);
    }
  }
}

export class LambdaBodyContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_lambdaBody;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterLambdaBody) {
      listener.enterLambdaBody(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitLambdaBody) {
      listener.exitLambdaBody(this);
    }
  }
}

export class PrimaryContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public THIS(): TerminalNode {
    return this.getToken(JavaParser.THIS, 0);
  }
  public SUPER(): TerminalNode {
    return this.getToken(JavaParser.SUPER, 0);
  }
  public literal(): LiteralContext {
    return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public typeTypeOrVoid(): TypeTypeOrVoidContext {
    return this.getTypedRuleContext(
      TypeTypeOrVoidContext,
      0,
    ) as TypeTypeOrVoidContext;
  }
  public DOT(): TerminalNode {
    return this.getToken(JavaParser.DOT, 0);
  }
  public CLASS(): TerminalNode {
    return this.getToken(JavaParser.CLASS, 0);
  }
  public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
    return this.getTypedRuleContext(
      NonWildcardTypeArgumentsContext,
      0,
    ) as NonWildcardTypeArgumentsContext;
  }
  public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext {
    return this.getTypedRuleContext(
      ExplicitGenericInvocationSuffixContext,
      0,
    ) as ExplicitGenericInvocationSuffixContext;
  }
  public arguments(): ArgumentsContext {
    return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_primary;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterPrimary) {
      listener.enterPrimary(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitPrimary) {
      listener.exitPrimary(this);
    }
  }
}

export class SwitchExpressionContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public SWITCH(): TerminalNode {
    return this.getToken(JavaParser.SWITCH, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public LBRACE(): TerminalNode {
    return this.getToken(JavaParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(JavaParser.RBRACE, 0);
  }
  public switchLabeledRule_list(): SwitchLabeledRuleContext[] {
    return this.getTypedRuleContexts(
      SwitchLabeledRuleContext,
    ) as SwitchLabeledRuleContext[];
  }
  public switchLabeledRule(i: number): SwitchLabeledRuleContext {
    return this.getTypedRuleContext(
      SwitchLabeledRuleContext,
      i,
    ) as SwitchLabeledRuleContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_switchExpression;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterSwitchExpression) {
      listener.enterSwitchExpression(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitSwitchExpression) {
      listener.exitSwitchExpression(this);
    }
  }
}

export class SwitchLabeledRuleContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public CASE(): TerminalNode {
    return this.getToken(JavaParser.CASE, 0);
  }
  public switchRuleOutcome(): SwitchRuleOutcomeContext {
    return this.getTypedRuleContext(
      SwitchRuleOutcomeContext,
      0,
    ) as SwitchRuleOutcomeContext;
  }
  public ARROW(): TerminalNode {
    return this.getToken(JavaParser.ARROW, 0);
  }
  public COLON(): TerminalNode {
    return this.getToken(JavaParser.COLON, 0);
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(
      ExpressionListContext,
      0,
    ) as ExpressionListContext;
  }
  public NULL_LITERAL(): TerminalNode {
    return this.getToken(JavaParser.NULL_LITERAL, 0);
  }
  public casePattern_list(): CasePatternContext[] {
    return this.getTypedRuleContexts(
      CasePatternContext,
    ) as CasePatternContext[];
  }
  public casePattern(i: number): CasePatternContext {
    return this.getTypedRuleContext(
      CasePatternContext,
      i,
    ) as CasePatternContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public DEFAULT(): TerminalNode {
    return this.getToken(JavaParser.DEFAULT, 0);
  }
  public guard(): GuardContext {
    return this.getTypedRuleContext(GuardContext, 0) as GuardContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_switchLabeledRule;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterSwitchLabeledRule) {
      listener.enterSwitchLabeledRule(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitSwitchLabeledRule) {
      listener.exitSwitchLabeledRule(this);
    }
  }
}

export class GuardContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public WHEN(): TerminalNode {
    return this.getToken(JavaParser.WHEN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_guard;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterGuard) {
      listener.enterGuard(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitGuard) {
      listener.exitGuard(this);
    }
  }
}

export class CasePatternContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public pattern(): PatternContext {
    return this.getTypedRuleContext(PatternContext, 0) as PatternContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_casePattern;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCasePattern) {
      listener.enterCasePattern(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCasePattern) {
      listener.exitCasePattern(this);
    }
  }
}

export class SwitchRuleOutcomeContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public block(): BlockContext {
    return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
  }
  public blockStatement_list(): BlockStatementContext[] {
    return this.getTypedRuleContexts(
      BlockStatementContext,
    ) as BlockStatementContext[];
  }
  public blockStatement(i: number): BlockStatementContext {
    return this.getTypedRuleContext(
      BlockStatementContext,
      i,
    ) as BlockStatementContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_switchRuleOutcome;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterSwitchRuleOutcome) {
      listener.enterSwitchRuleOutcome(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitSwitchRuleOutcome) {
      listener.exitSwitchRuleOutcome(this);
    }
  }
}

export class ClassOrInterfaceTypeContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public classType(): ClassTypeContext {
    return this.getTypedRuleContext(ClassTypeContext, 0) as ClassTypeContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_classOrInterfaceType;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterClassOrInterfaceType) {
      listener.enterClassOrInterfaceType(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitClassOrInterfaceType) {
      listener.exitClassOrInterfaceType(this);
    }
  }
}

export class CreatorContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public createdName(): CreatedNameContext {
    return this.getTypedRuleContext(
      CreatedNameContext,
      0,
    ) as CreatedNameContext;
  }
  public classCreatorRest(): ClassCreatorRestContext {
    return this.getTypedRuleContext(
      ClassCreatorRestContext,
      0,
    ) as ClassCreatorRestContext;
  }
  public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
    return this.getTypedRuleContext(
      NonWildcardTypeArgumentsContext,
      0,
    ) as NonWildcardTypeArgumentsContext;
  }
  public arrayCreatorRest(): ArrayCreatorRestContext {
    return this.getTypedRuleContext(
      ArrayCreatorRestContext,
      0,
    ) as ArrayCreatorRestContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_creator;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCreator) {
      listener.enterCreator(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCreator) {
      listener.exitCreator(this);
    }
  }
}

export class CreatedNameContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier_list(): IdentifierContext[] {
    return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
  }
  public identifier(i: number): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
  }
  public typeArgumentsOrDiamond_list(): TypeArgumentsOrDiamondContext[] {
    return this.getTypedRuleContexts(
      TypeArgumentsOrDiamondContext,
    ) as TypeArgumentsOrDiamondContext[];
  }
  public typeArgumentsOrDiamond(i: number): TypeArgumentsOrDiamondContext {
    return this.getTypedRuleContext(
      TypeArgumentsOrDiamondContext,
      i,
    ) as TypeArgumentsOrDiamondContext;
  }
  public DOT_list(): TerminalNode[] {
    return this.getTokens(JavaParser.DOT);
  }
  public DOT(i: number): TerminalNode {
    return this.getToken(JavaParser.DOT, i);
  }
  public primitiveType(): PrimitiveTypeContext {
    return this.getTypedRuleContext(
      PrimitiveTypeContext,
      0,
    ) as PrimitiveTypeContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_createdName;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterCreatedName) {
      listener.enterCreatedName(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitCreatedName) {
      listener.exitCreatedName(this);
    }
  }
}

export class InnerCreatorContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public classCreatorRest(): ClassCreatorRestContext {
    return this.getTypedRuleContext(
      ClassCreatorRestContext,
      0,
    ) as ClassCreatorRestContext;
  }
  public nonWildcardTypeArgumentsOrDiamond(): NonWildcardTypeArgumentsOrDiamondContext {
    return this.getTypedRuleContext(
      NonWildcardTypeArgumentsOrDiamondContext,
      0,
    ) as NonWildcardTypeArgumentsOrDiamondContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_innerCreator;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterInnerCreator) {
      listener.enterInnerCreator(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitInnerCreator) {
      listener.exitInnerCreator(this);
    }
  }
}

export class ArrayCreatorRestContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public arrayInitializer(): ArrayInitializerContext {
    return this.getTypedRuleContext(
      ArrayInitializerContext,
      0,
    ) as ArrayInitializerContext;
  }
  public LBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.LBRACK);
  }
  public LBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.LBRACK, i);
  }
  public RBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.RBRACK);
  }
  public RBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.RBRACK, i);
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_arrayCreatorRest;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterArrayCreatorRest) {
      listener.enterArrayCreatorRest(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitArrayCreatorRest) {
      listener.exitArrayCreatorRest(this);
    }
  }
}

export class ClassCreatorRestContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public arguments(): ArgumentsContext {
    return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
  }
  public classBody(): ClassBodyContext {
    return this.getTypedRuleContext(ClassBodyContext, 0) as ClassBodyContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_classCreatorRest;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterClassCreatorRest) {
      listener.enterClassCreatorRest(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitClassCreatorRest) {
      listener.exitClassCreatorRest(this);
    }
  }
}

export class ExplicitGenericInvocationContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
    return this.getTypedRuleContext(
      NonWildcardTypeArgumentsContext,
      0,
    ) as NonWildcardTypeArgumentsContext;
  }
  public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext {
    return this.getTypedRuleContext(
      ExplicitGenericInvocationSuffixContext,
      0,
    ) as ExplicitGenericInvocationSuffixContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_explicitGenericInvocation;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterExplicitGenericInvocation) {
      listener.enterExplicitGenericInvocation(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitExplicitGenericInvocation) {
      listener.exitExplicitGenericInvocation(this);
    }
  }
}

export class TypeArgumentsOrDiamondContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LT(): TerminalNode {
    return this.getToken(JavaParser.LT, 0);
  }
  public GT(): TerminalNode {
    return this.getToken(JavaParser.GT, 0);
  }
  public typeArguments(): TypeArgumentsContext {
    return this.getTypedRuleContext(
      TypeArgumentsContext,
      0,
    ) as TypeArgumentsContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeArgumentsOrDiamond;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeArgumentsOrDiamond) {
      listener.enterTypeArgumentsOrDiamond(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeArgumentsOrDiamond) {
      listener.exitTypeArgumentsOrDiamond(this);
    }
  }
}

export class NonWildcardTypeArgumentsOrDiamondContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LT(): TerminalNode {
    return this.getToken(JavaParser.LT, 0);
  }
  public GT(): TerminalNode {
    return this.getToken(JavaParser.GT, 0);
  }
  public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
    return this.getTypedRuleContext(
      NonWildcardTypeArgumentsContext,
      0,
    ) as NonWildcardTypeArgumentsContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_nonWildcardTypeArgumentsOrDiamond;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterNonWildcardTypeArgumentsOrDiamond) {
      listener.enterNonWildcardTypeArgumentsOrDiamond(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitNonWildcardTypeArgumentsOrDiamond) {
      listener.exitNonWildcardTypeArgumentsOrDiamond(this);
    }
  }
}

export class NonWildcardTypeArgumentsContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LT(): TerminalNode {
    return this.getToken(JavaParser.LT, 0);
  }
  public typeList(): TypeListContext {
    return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
  }
  public GT(): TerminalNode {
    return this.getToken(JavaParser.GT, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_nonWildcardTypeArguments;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterNonWildcardTypeArguments) {
      listener.enterNonWildcardTypeArguments(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitNonWildcardTypeArguments) {
      listener.exitNonWildcardTypeArguments(this);
    }
  }
}

export class TypeListContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public typeType_list(): TypeTypeContext[] {
    return this.getTypedRuleContexts(TypeTypeContext) as TypeTypeContext[];
  }
  public typeType(i: number): TypeTypeContext {
    return this.getTypedRuleContext(TypeTypeContext, i) as TypeTypeContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeList;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeList) {
      listener.enterTypeList(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeList) {
      listener.exitTypeList(this);
    }
  }
}

export class TypeTypeContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public classOrInterfaceType(): ClassOrInterfaceTypeContext {
    return this.getTypedRuleContext(
      ClassOrInterfaceTypeContext,
      0,
    ) as ClassOrInterfaceTypeContext;
  }
  public primitiveType(): PrimitiveTypeContext {
    return this.getTypedRuleContext(
      PrimitiveTypeContext,
      0,
    ) as PrimitiveTypeContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public LBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.LBRACK);
  }
  public LBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.LBRACK, i);
  }
  public RBRACK_list(): TerminalNode[] {
    return this.getTokens(JavaParser.RBRACK);
  }
  public RBRACK(i: number): TerminalNode {
    return this.getToken(JavaParser.RBRACK, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeType;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeType) {
      listener.enterTypeType(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeType) {
      listener.exitTypeType(this);
    }
  }
}

export class PrimitiveTypeContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public BOOLEAN(): TerminalNode {
    return this.getToken(JavaParser.BOOLEAN, 0);
  }
  public CHAR(): TerminalNode {
    return this.getToken(JavaParser.CHAR, 0);
  }
  public BYTE(): TerminalNode {
    return this.getToken(JavaParser.BYTE, 0);
  }
  public SHORT(): TerminalNode {
    return this.getToken(JavaParser.SHORT, 0);
  }
  public INT(): TerminalNode {
    return this.getToken(JavaParser.INT, 0);
  }
  public LONG(): TerminalNode {
    return this.getToken(JavaParser.LONG, 0);
  }
  public FLOAT(): TerminalNode {
    return this.getToken(JavaParser.FLOAT, 0);
  }
  public DOUBLE(): TerminalNode {
    return this.getToken(JavaParser.DOUBLE, 0);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_primitiveType;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterPrimitiveType) {
      listener.enterPrimitiveType(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitPrimitiveType) {
      listener.exitPrimitiveType(this);
    }
  }
}

export class TypeArgumentsContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LT(): TerminalNode {
    return this.getToken(JavaParser.LT, 0);
  }
  public typeArgument_list(): TypeArgumentContext[] {
    return this.getTypedRuleContexts(
      TypeArgumentContext,
    ) as TypeArgumentContext[];
  }
  public typeArgument(i: number): TypeArgumentContext {
    return this.getTypedRuleContext(
      TypeArgumentContext,
      i,
    ) as TypeArgumentContext;
  }
  public GT(): TerminalNode {
    return this.getToken(JavaParser.GT, 0);
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(JavaParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(JavaParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_typeArguments;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterTypeArguments) {
      listener.enterTypeArguments(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitTypeArguments) {
      listener.exitTypeArguments(this);
    }
  }
}

export class SuperSuffixContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public arguments(): ArgumentsContext {
    return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
  }
  public DOT(): TerminalNode {
    return this.getToken(JavaParser.DOT, 0);
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public typeArguments(): TypeArgumentsContext {
    return this.getTypedRuleContext(
      TypeArgumentsContext,
      0,
    ) as TypeArgumentsContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_superSuffix;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterSuperSuffix) {
      listener.enterSuperSuffix(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitSuperSuffix) {
      listener.exitSuperSuffix(this);
    }
  }
}

export class ExplicitGenericInvocationSuffixContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public SUPER(): TerminalNode {
    return this.getToken(JavaParser.SUPER, 0);
  }
  public superSuffix(): SuperSuffixContext {
    return this.getTypedRuleContext(
      SuperSuffixContext,
      0,
    ) as SuperSuffixContext;
  }
  public identifier(): IdentifierContext {
    return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
  }
  public arguments(): ArgumentsContext {
    return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_explicitGenericInvocationSuffix;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterExplicitGenericInvocationSuffix) {
      listener.enterExplicitGenericInvocationSuffix(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitExplicitGenericInvocationSuffix) {
      listener.exitExplicitGenericInvocationSuffix(this);
    }
  }
}

export class ArgumentsContext extends ParserRuleContext {
  constructor(
    parser?: JavaParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(JavaParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(JavaParser.RPAREN, 0);
  }
  public expressionList(): ExpressionListContext {
    return this.getTypedRuleContext(
      ExpressionListContext,
      0,
    ) as ExpressionListContext;
  }
  public get ruleIndex(): number {
    return JavaParser.RULE_arguments;
  }
  public enterRule(listener: JavaParserListener): void {
    if (listener.enterArguments) {
      listener.enterArguments(this);
    }
  }
  public exitRule(listener: JavaParserListener): void {
    if (listener.exitArguments) {
      listener.exitArguments(this);
    }
  }
}
