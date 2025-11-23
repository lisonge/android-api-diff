// Generated from ./src/grammar/AIDL.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
  ATN,
  ATNDeserializer,
  type DecisionState,
  DFA,
  FailedPredicateException,
  NoViableAltException,
  Parser,
  ParserATNSimulator,
  ParserRuleContext,
  PredictionContextCache,
  RecognitionException,
  TerminalNode,
  Token,
  type TokenStream,
} from 'antlr4';
import AIDLListener from './AIDLListener.js';
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class AIDLParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly PACKAGE = 3;
  public static readonly IMPORT = 4;
  public static readonly INTERFACE = 5;
  public static readonly EXTENDS = 6;
  public static readonly PARCELABLE = 7;
  public static readonly ENUM = 8;
  public static readonly ONEWAY = 9;
  public static readonly IN = 10;
  public static readonly OUT = 11;
  public static readonly INOUT = 12;
  public static readonly THROWS = 13;
  public static readonly CONST = 14;
  public static readonly CPP_HEADER = 15;
  public static readonly JAVA_HEADER = 16;
  public static readonly NDK_HEADER = 17;
  public static readonly RUST_HEADER = 18;
  public static readonly BYTE = 19;
  public static readonly SHORT = 20;
  public static readonly INT = 21;
  public static readonly LONG = 22;
  public static readonly CHAR = 23;
  public static readonly FLOAT = 24;
  public static readonly DOUBLE = 25;
  public static readonly BOOLEAN = 26;
  public static readonly STRING = 27;
  public static readonly BOOLEAN_LITERAL = 28;
  public static readonly NULL_LITERAL = 29;
  public static readonly IDENTIFIER = 30;
  public static readonly INTEGER_LITERAL = 31;
  public static readonly FLOATING_POINT_LITERAL = 32;
  public static readonly FLOAT_SUFFIX_LITERAL = 33;
  public static readonly CHARACTER_LITERAL = 34;
  public static readonly STRING_LITERAL = 35;
  public static readonly BLOCK_COMMENT = 36;
  public static readonly LINE_COMMENT = 37;
  public static readonly DOC_COMMENT = 38;
  public static readonly WS = 39;
  public static readonly BITWISE_OR = 40;
  public static readonly BITWISE_XOR = 41;
  public static readonly BITWISE_AND = 42;
  public static readonly EQUALS = 43;
  public static readonly NOT_EQUALS = 44;
  public static readonly LESS_EQUAL = 45;
  public static readonly GREATER_EQUAL = 46;
  public static readonly LEFT_SHIFT = 47;
  public static readonly RIGHT_SHIFT = 48;
  public static readonly UNSIGNED_RIGHT_SHIFT = 49;
  public static readonly PLUS = 50;
  public static readonly MINUS = 51;
  public static readonly MULTIPLY = 52;
  public static readonly DIVIDE = 53;
  public static readonly MODULO = 54;
  public static readonly LOGICAL_OR = 55;
  public static readonly LOGICAL_AND = 56;
  public static readonly LOGICAL_NOT = 57;
  public static readonly BITWISE_NOT = 58;
  public static readonly LESS = 59;
  public static readonly GREATER = 60;
  public static readonly LPAREN = 61;
  public static readonly RPAREN = 62;
  public static readonly LBRACE = 63;
  public static readonly RBRACE = 64;
  public static readonly LBRACKET = 65;
  public static readonly RBRACKET = 66;
  public static readonly SEMI = 67;
  public static readonly COMMA = 68;
  public static readonly DOT = 69;
  public static readonly AT = 70;
  public static readonly ASSIGN = 71;
  public static readonly COLON = 72;
  public static override readonly EOF = Token.EOF;
  public static readonly RULE_compilationUnit = 0;
  public static readonly RULE_packageDeclaration = 1;
  public static readonly RULE_importDeclaration = 2;
  public static readonly RULE_typeDeclaration = 3;
  public static readonly RULE_interfaceDeclaration = 4;
  public static readonly RULE_interfaceBody = 5;
  public static readonly RULE_nestedTypeDeclaration = 6;
  public static readonly RULE_parcelableDeclaration = 7;
  public static readonly RULE_parcelableBody = 8;
  public static readonly RULE_languageHeaders = 9;
  public static readonly RULE_languageHeader = 10;
  public static readonly RULE_fieldDeclaration = 11;
  public static readonly RULE_variableDeclarators = 12;
  public static readonly RULE_variableDeclarator = 13;
  public static readonly RULE_enumDeclaration = 14;
  public static readonly RULE_enumConstant = 15;
  public static readonly RULE_constDeclaration = 16;
  public static readonly RULE_constantDeclaration = 17;
  public static readonly RULE_methodDeclaration = 18;
  public static readonly RULE_parameterList = 19;
  public static readonly RULE_parameter = 20;
  public static readonly RULE_direction = 21;
  public static readonly RULE_annotation = 22;
  public static readonly RULE_annotationValues = 23;
  public static readonly RULE_annotationValue = 24;
  public static readonly RULE_annotationArray = 25;
  public static readonly RULE_type = 26;
  public static readonly RULE_primitiveType = 27;
  public static readonly RULE_genericType = 28;
  public static readonly RULE_typeArgument = 29;
  public static readonly RULE_typeList = 30;
  public static readonly RULE_qualifiedName = 31;
  public static readonly RULE_expression = 32;
  public static readonly RULE_logicalOrExpression = 33;
  public static readonly RULE_logicalAndExpression = 34;
  public static readonly RULE_bitwiseOrExpression = 35;
  public static readonly RULE_bitwiseXorExpression = 36;
  public static readonly RULE_bitwiseAndExpression = 37;
  public static readonly RULE_equalityExpression = 38;
  public static readonly RULE_relationalExpression = 39;
  public static readonly RULE_shiftExpression = 40;
  public static readonly RULE_additiveExpression = 41;
  public static readonly RULE_multiplicativeExpression = 42;
  public static readonly RULE_unaryExpression = 43;
  public static readonly RULE_primaryExpression = 44;
  public static readonly RULE_literal = 45;
  public static readonly RULE_attributes = 46;
  public static readonly literalNames: (string | null)[] = [
    null,
    "'?'",
    "'super'",
    "'package'",
    "'import'",
    "'interface'",
    "'extends'",
    "'parcelable'",
    "'enum'",
    "'oneway'",
    "'in'",
    "'out'",
    "'inout'",
    "'throws'",
    "'const'",
    "'cpp_header'",
    "'java_header'",
    "'ndk_header'",
    "'rust_header'",
    "'byte'",
    "'short'",
    "'int'",
    "'long'",
    "'char'",
    "'float'",
    "'double'",
    "'boolean'",
    "'String'",
    null,
    "'null'",
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
    "'|'",
    "'^'",
    "'&'",
    "'=='",
    "'!='",
    "'<='",
    "'>='",
    "'<<'",
    "'>>'",
    "'>>>'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'%'",
    "'||'",
    "'&&'",
    "'!'",
    "'~'",
    "'<'",
    "'>'",
    "'('",
    "')'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "';'",
    "','",
    "'.'",
    "'@'",
    "'='",
    "':'",
  ];
  public static readonly symbolicNames: (string | null)[] = [
    null,
    null,
    null,
    'PACKAGE',
    'IMPORT',
    'INTERFACE',
    'EXTENDS',
    'PARCELABLE',
    'ENUM',
    'ONEWAY',
    'IN',
    'OUT',
    'INOUT',
    'THROWS',
    'CONST',
    'CPP_HEADER',
    'JAVA_HEADER',
    'NDK_HEADER',
    'RUST_HEADER',
    'BYTE',
    'SHORT',
    'INT',
    'LONG',
    'CHAR',
    'FLOAT',
    'DOUBLE',
    'BOOLEAN',
    'STRING',
    'BOOLEAN_LITERAL',
    'NULL_LITERAL',
    'IDENTIFIER',
    'INTEGER_LITERAL',
    'FLOATING_POINT_LITERAL',
    'FLOAT_SUFFIX_LITERAL',
    'CHARACTER_LITERAL',
    'STRING_LITERAL',
    'BLOCK_COMMENT',
    'LINE_COMMENT',
    'DOC_COMMENT',
    'WS',
    'BITWISE_OR',
    'BITWISE_XOR',
    'BITWISE_AND',
    'EQUALS',
    'NOT_EQUALS',
    'LESS_EQUAL',
    'GREATER_EQUAL',
    'LEFT_SHIFT',
    'RIGHT_SHIFT',
    'UNSIGNED_RIGHT_SHIFT',
    'PLUS',
    'MINUS',
    'MULTIPLY',
    'DIVIDE',
    'MODULO',
    'LOGICAL_OR',
    'LOGICAL_AND',
    'LOGICAL_NOT',
    'BITWISE_NOT',
    'LESS',
    'GREATER',
    'LPAREN',
    'RPAREN',
    'LBRACE',
    'RBRACE',
    'LBRACKET',
    'RBRACKET',
    'SEMI',
    'COMMA',
    'DOT',
    'AT',
    'ASSIGN',
    'COLON',
  ];
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'compilationUnit',
    'packageDeclaration',
    'importDeclaration',
    'typeDeclaration',
    'interfaceDeclaration',
    'interfaceBody',
    'nestedTypeDeclaration',
    'parcelableDeclaration',
    'parcelableBody',
    'languageHeaders',
    'languageHeader',
    'fieldDeclaration',
    'variableDeclarators',
    'variableDeclarator',
    'enumDeclaration',
    'enumConstant',
    'constDeclaration',
    'constantDeclaration',
    'methodDeclaration',
    'parameterList',
    'parameter',
    'direction',
    'annotation',
    'annotationValues',
    'annotationValue',
    'annotationArray',
    'type',
    'primitiveType',
    'genericType',
    'typeArgument',
    'typeList',
    'qualifiedName',
    'expression',
    'logicalOrExpression',
    'logicalAndExpression',
    'bitwiseOrExpression',
    'bitwiseXorExpression',
    'bitwiseAndExpression',
    'equalityExpression',
    'relationalExpression',
    'shiftExpression',
    'additiveExpression',
    'multiplicativeExpression',
    'unaryExpression',
    'primaryExpression',
    'literal',
    'attributes',
  ];
  public get grammarFileName(): string {
    return 'AIDL.g4';
  }
  public get literalNames(): (string | null)[] {
    return AIDLParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return AIDLParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return AIDLParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return AIDLParser._serializedATN;
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
      AIDLParser._ATN,
      AIDLParser.DecisionsToDFA,
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
    this.enterRule(localctx, 0, AIDLParser.RULE_compilationUnit);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 95;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 3) {
          {
            this.state = 94;
            this.packageDeclaration();
          }
        }

        this.state = 100;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 4) {
          {
            {
              this.state = 97;
              this.importDeclaration();
            }
          }
          this.state = 102;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 104;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 103;
              this.typeDeclaration();
            }
          }
          this.state = 106;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 17312) !== 0) ||
          _la === 70
        );
        this.state = 108;
        this.match(AIDLParser.EOF);
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
    this.enterRule(localctx, 2, AIDLParser.RULE_packageDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 110;
        this.match(AIDLParser.PACKAGE);
        this.state = 111;
        this.qualifiedName();
        this.state = 112;
        this.match(AIDLParser.SEMI);
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
    this.enterRule(localctx, 4, AIDLParser.RULE_importDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 114;
        this.match(AIDLParser.IMPORT);
        this.state = 115;
        this.qualifiedName();
        this.state = 116;
        this.match(AIDLParser.SEMI);
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
    this.enterRule(localctx, 6, AIDLParser.RULE_typeDeclaration);
    try {
      this.state = 122;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 3, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 118;
            this.interfaceDeclaration();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 119;
            this.parcelableDeclaration();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 120;
            this.enumDeclaration();
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 121;
            this.constDeclaration();
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
  public interfaceDeclaration(): InterfaceDeclarationContext {
    let localctx: InterfaceDeclarationContext = new InterfaceDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 8, AIDLParser.RULE_interfaceDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 125;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 70) {
          {
            this.state = 124;
            this.attributes();
          }
        }

        this.state = 128;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 9) {
          {
            this.state = 127;
            localctx._oneway = this.match(AIDLParser.ONEWAY);
          }
        }

        this.state = 130;
        this.match(AIDLParser.INTERFACE);
        this.state = 131;
        localctx._name = this.match(AIDLParser.IDENTIFIER);
        this.state = 134;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 6) {
          {
            this.state = 132;
            this.match(AIDLParser.EXTENDS);
            this.state = 133;
            localctx._extendedInterfaces = this.typeList();
          }
        }

        this.state = 136;
        this.match(AIDLParser.LBRACE);
        this.state = 137;
        this.interfaceBody();
        this.state = 138;
        this.match(AIDLParser.RBRACE);
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
    this.enterRule(localctx, 10, AIDLParser.RULE_interfaceBody);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 145;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1341670272) !== 0) ||
          _la === 70
        ) {
          {
            this.state = 143;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 7, this._ctx)) {
              case 1:
                {
                  this.state = 140;
                  this.constantDeclaration();
                }
                break;
              case 2:
                {
                  this.state = 141;
                  this.methodDeclaration();
                }
                break;
              case 3:
                {
                  this.state = 142;
                  this.nestedTypeDeclaration();
                }
                break;
            }
          }
          this.state = 147;
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
  public nestedTypeDeclaration(): NestedTypeDeclarationContext {
    let localctx: NestedTypeDeclarationContext =
      new NestedTypeDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, AIDLParser.RULE_nestedTypeDeclaration);
    try {
      this.state = 151;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 9, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 148;
            this.parcelableDeclaration();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 149;
            this.enumDeclaration();
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 150;
            this.constDeclaration();
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
  public parcelableDeclaration(): ParcelableDeclarationContext {
    let localctx: ParcelableDeclarationContext =
      new ParcelableDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, AIDLParser.RULE_parcelableDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 154;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 70) {
          {
            this.state = 153;
            this.attributes();
          }
        }

        this.state = 156;
        this.match(AIDLParser.PARCELABLE);
        this.state = 157;
        localctx._name = this.qualifiedName();
        this.state = 167;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 63:
            {
              this.state = 158;
              this.parcelableBody();
            }
            break;
          case 6:
          case 15:
          case 16:
          case 17:
          case 18:
          case 67:
            {
              {
                this.state = 160;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((_la & ~0x1f) === 0 && ((1 << _la) & 491520) !== 0) {
                  {
                    this.state = 159;
                    this.languageHeaders();
                  }
                }

                this.state = 164;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 6) {
                  {
                    this.state = 162;
                    this.match(AIDLParser.EXTENDS);
                    this.state = 163;
                    localctx._superType = this.qualifiedName();
                  }
                }

                this.state = 166;
                this.match(AIDLParser.SEMI);
              }
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
  public parcelableBody(): ParcelableBodyContext {
    let localctx: ParcelableBodyContext = new ParcelableBodyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 16, AIDLParser.RULE_parcelableBody);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 169;
        this.match(AIDLParser.LBRACE);
        this.state = 174;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1341669760) !== 0) ||
          _la === 70
        ) {
          {
            this.state = 172;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 14, this._ctx)) {
              case 1:
                {
                  this.state = 170;
                  this.fieldDeclaration();
                }
                break;
              case 2:
                {
                  this.state = 171;
                  this.nestedTypeDeclaration();
                }
                break;
            }
          }
          this.state = 176;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 177;
        this.match(AIDLParser.RBRACE);
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
  public languageHeaders(): LanguageHeadersContext {
    let localctx: LanguageHeadersContext = new LanguageHeadersContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 18, AIDLParser.RULE_languageHeaders);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 180;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 179;
              this.languageHeader();
            }
          }
          this.state = 182;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while ((_la & ~0x1f) === 0 && ((1 << _la) & 491520) !== 0);
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
  public languageHeader(): LanguageHeaderContext {
    let localctx: LanguageHeaderContext = new LanguageHeaderContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 20, AIDLParser.RULE_languageHeader);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 184;
        localctx._headerType = this._input.LT(1);
        _la = this._input.LA(1);
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 491520) !== 0)) {
          localctx._headerType = this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
        this.state = 185;
        localctx._headerValue = this.match(AIDLParser.STRING_LITERAL);
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
    this.enterRule(localctx, 22, AIDLParser.RULE_fieldDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 188;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 70) {
          {
            this.state = 187;
            this.attributes();
          }
        }

        this.state = 190;
        this.type_();
        this.state = 191;
        this.variableDeclarators();
        this.state = 192;
        this.match(AIDLParser.SEMI);
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
    this.enterRule(localctx, 24, AIDLParser.RULE_variableDeclarators);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 194;
        this.variableDeclarator();
        this.state = 199;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 68) {
          {
            {
              this.state = 195;
              this.match(AIDLParser.COMMA);
              this.state = 196;
              this.variableDeclarator();
            }
          }
          this.state = 201;
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
  public variableDeclarator(): VariableDeclaratorContext {
    let localctx: VariableDeclaratorContext = new VariableDeclaratorContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 26, AIDLParser.RULE_variableDeclarator);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 202;
        localctx._name = this.match(AIDLParser.IDENTIFIER);
        this.state = 205;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 71) {
          {
            this.state = 203;
            this.match(AIDLParser.ASSIGN);
            this.state = 204;
            this.expression();
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
  public enumDeclaration(): EnumDeclarationContext {
    let localctx: EnumDeclarationContext = new EnumDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 28, AIDLParser.RULE_enumDeclaration);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 208;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 70) {
          {
            this.state = 207;
            this.attributes();
          }
        }

        this.state = 210;
        this.match(AIDLParser.ENUM);
        this.state = 211;
        localctx._name = this.match(AIDLParser.IDENTIFIER);
        this.state = 212;
        this.match(AIDLParser.LBRACE);
        this.state = 213;
        this.enumConstant();
        this.state = 218;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 214;
                this.match(AIDLParser.COMMA);
                this.state = 215;
                this.enumConstant();
              }
            }
          }
          this.state = 220;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
        }
        this.state = 222;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 68) {
          {
            this.state = 221;
            this.match(AIDLParser.COMMA);
          }
        }

        this.state = 224;
        this.match(AIDLParser.RBRACE);
        this.state = 226;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 67) {
          {
            this.state = 225;
            this.match(AIDLParser.SEMI);
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
  public enumConstant(): EnumConstantContext {
    let localctx: EnumConstantContext = new EnumConstantContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 30, AIDLParser.RULE_enumConstant);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 228;
        this.match(AIDLParser.IDENTIFIER);
        this.state = 231;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 71) {
          {
            this.state = 229;
            this.match(AIDLParser.ASSIGN);
            this.state = 230;
            this.expression();
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
  public constDeclaration(): ConstDeclarationContext {
    let localctx: ConstDeclarationContext = new ConstDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 32, AIDLParser.RULE_constDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 234;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 70) {
          {
            this.state = 233;
            this.attributes();
          }
        }

        this.state = 236;
        this.match(AIDLParser.CONST);
        this.state = 237;
        this.type_();
        this.state = 238;
        localctx._name = this.match(AIDLParser.IDENTIFIER);
        this.state = 239;
        this.match(AIDLParser.ASSIGN);
        this.state = 240;
        this.expression();
        this.state = 241;
        this.match(AIDLParser.SEMI);
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
  public constantDeclaration(): ConstantDeclarationContext {
    let localctx: ConstantDeclarationContext = new ConstantDeclarationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 34, AIDLParser.RULE_constantDeclaration);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 243;
        this.constDeclaration();
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
    this.enterRule(localctx, 36, AIDLParser.RULE_methodDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 246;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 70) {
          {
            this.state = 245;
            this.attributes();
          }
        }

        this.state = 249;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 9) {
          {
            this.state = 248;
            localctx._oneway = this.match(AIDLParser.ONEWAY);
          }
        }

        this.state = 251;
        this.type_();
        this.state = 252;
        localctx._name = this.match(AIDLParser.IDENTIFIER);
        this.state = 253;
        this.match(AIDLParser.LPAREN);
        this.state = 255;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 1341660160) !== 0) ||
          _la === 70
        ) {
          {
            this.state = 254;
            this.parameterList();
          }
        }

        this.state = 257;
        this.match(AIDLParser.RPAREN);
        this.state = 260;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 13) {
          {
            this.state = 258;
            this.match(AIDLParser.THROWS);
            this.state = 259;
            localctx._exceptionList = this.typeList();
          }
        }

        this.state = 262;
        this.match(AIDLParser.SEMI);
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
  public parameterList(): ParameterListContext {
    let localctx: ParameterListContext = new ParameterListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 38, AIDLParser.RULE_parameterList);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 264;
        this.parameter();
        this.state = 269;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 68) {
          {
            {
              this.state = 265;
              this.match(AIDLParser.COMMA);
              this.state = 266;
              this.parameter();
            }
          }
          this.state = 271;
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
  public parameter(): ParameterContext {
    let localctx: ParameterContext = new ParameterContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 40, AIDLParser.RULE_parameter);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 276;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 7168) !== 0) ||
          _la === 70
        ) {
          {
            this.state = 274;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case 10:
              case 11:
              case 12:
                {
                  this.state = 272;
                  this.direction();
                }
                break;
              case 70:
                {
                  this.state = 273;
                  this.annotation();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
          }
          this.state = 278;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 279;
        this.type_();
        this.state = 280;
        this.variableDeclarator();
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
  public direction(): DirectionContext {
    let localctx: DirectionContext = new DirectionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 42, AIDLParser.RULE_direction);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 282;
        _la = this._input.LA(1);
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 7168) !== 0)) {
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
  public annotation(): AnnotationContext {
    let localctx: AnnotationContext = new AnnotationContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 44, AIDLParser.RULE_annotation);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 284;
        this.match(AIDLParser.AT);
        this.state = 285;
        this.qualifiedName();
        this.state = 290;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 61) {
          {
            this.state = 286;
            this.match(AIDLParser.LPAREN);
            this.state = 287;
            this.annotationValues();
            this.state = 288;
            this.match(AIDLParser.RPAREN);
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
  public annotationValues(): AnnotationValuesContext {
    let localctx: AnnotationValuesContext = new AnnotationValuesContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 46, AIDLParser.RULE_annotationValues);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 292;
        this.annotationValue();
        this.state = 297;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 68) {
          {
            {
              this.state = 293;
              this.match(AIDLParser.COMMA);
              this.state = 294;
              this.annotationValue();
            }
          }
          this.state = 299;
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
  public annotationValue(): AnnotationValueContext {
    let localctx: AnnotationValueContext = new AnnotationValueContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 48, AIDLParser.RULE_annotationValue);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 303;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 35, this._ctx)) {
          case 1:
            {
              this.state = 300;
              this.qualifiedName();
              this.state = 301;
              this.match(AIDLParser.ASSIGN);
            }
            break;
        }
        this.state = 307;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 33:
          case 34:
          case 35:
          case 50:
          case 51:
          case 57:
          case 58:
          case 61:
            {
              this.state = 305;
              this.expression();
            }
            break;
          case 63:
            {
              this.state = 306;
              this.annotationArray();
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
  public annotationArray(): AnnotationArrayContext {
    let localctx: AnnotationArrayContext = new AnnotationArrayContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 50, AIDLParser.RULE_annotationArray);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 309;
        this.match(AIDLParser.LBRACE);
        this.state = 310;
        this.expression();
        this.state = 315;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 68) {
          {
            {
              this.state = 311;
              this.match(AIDLParser.COMMA);
              this.state = 312;
              this.expression();
            }
          }
          this.state = 317;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 318;
        this.match(AIDLParser.RBRACE);
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
  public type_(): TypeContext {
    let localctx: TypeContext = new TypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, AIDLParser.RULE_type);
    let _la: number;
    try {
      this.state = 344;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 41, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 320;
            this.primitiveType();
            this.state = 325;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 65) {
              {
                {
                  this.state = 321;
                  this.match(AIDLParser.LBRACKET);
                  this.state = 322;
                  this.match(AIDLParser.RBRACKET);
                }
              }
              this.state = 327;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 328;
            this.qualifiedName();
            this.state = 333;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 65) {
              {
                {
                  this.state = 329;
                  this.match(AIDLParser.LBRACKET);
                  this.state = 330;
                  this.match(AIDLParser.RBRACKET);
                }
              }
              this.state = 335;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 336;
            this.genericType();
            this.state = 341;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === 65) {
              {
                {
                  this.state = 337;
                  this.match(AIDLParser.LBRACKET);
                  this.state = 338;
                  this.match(AIDLParser.RBRACKET);
                }
              }
              this.state = 343;
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
  public primitiveType(): PrimitiveTypeContext {
    let localctx: PrimitiveTypeContext = new PrimitiveTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 54, AIDLParser.RULE_primitiveType);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 346;
        _la = this._input.LA(1);
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 267911168) !== 0)) {
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
  public genericType(): GenericTypeContext {
    let localctx: GenericTypeContext = new GenericTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 56, AIDLParser.RULE_genericType);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 348;
        this.qualifiedName();
        this.state = 349;
        this.match(AIDLParser.LESS);
        this.state = 350;
        this.typeArgument();
        this.state = 355;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 68) {
          {
            {
              this.state = 351;
              this.match(AIDLParser.COMMA);
              this.state = 352;
              this.typeArgument();
            }
          }
          this.state = 357;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 358;
        this.match(AIDLParser.GREATER);
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
    this.enterRule(localctx, 58, AIDLParser.RULE_typeArgument);
    let _la: number;
    try {
      this.state = 366;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 30:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 360;
            this.type_();
          }
          break;
        case 1:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 361;
            this.match(AIDLParser.T__0);
            this.state = 364;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 2 || _la === 6) {
              {
                this.state = 362;
                _la = this._input.LA(1);
                if (!(_la === 2 || _la === 6)) {
                  this._errHandler.recoverInline(this);
                } else {
                  this._errHandler.reportMatch(this);
                  this.consume();
                }
                this.state = 363;
                this.type_();
              }
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
  public typeList(): TypeListContext {
    let localctx: TypeListContext = new TypeListContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 60, AIDLParser.RULE_typeList);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 368;
        this.qualifiedName();
        this.state = 373;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 68) {
          {
            {
              this.state = 369;
              this.match(AIDLParser.COMMA);
              this.state = 370;
              this.qualifiedName();
            }
          }
          this.state = 375;
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
  public qualifiedName(): QualifiedNameContext {
    let localctx: QualifiedNameContext = new QualifiedNameContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 62, AIDLParser.RULE_qualifiedName);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 376;
        this.match(AIDLParser.IDENTIFIER);
        this.state = 381;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 69) {
          {
            {
              this.state = 377;
              this.match(AIDLParser.DOT);
              this.state = 378;
              this.match(AIDLParser.IDENTIFIER);
            }
          }
          this.state = 383;
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
  public expression(): ExpressionContext {
    let localctx: ExpressionContext = new ExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 64, AIDLParser.RULE_expression);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 384;
        this.logicalOrExpression();
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
  public logicalOrExpression(): LogicalOrExpressionContext {
    let localctx: LogicalOrExpressionContext = new LogicalOrExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 66, AIDLParser.RULE_logicalOrExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 386;
        this.logicalAndExpression();
        this.state = 391;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 55) {
          {
            {
              this.state = 387;
              this.match(AIDLParser.LOGICAL_OR);
              this.state = 388;
              this.logicalAndExpression();
            }
          }
          this.state = 393;
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
  public logicalAndExpression(): LogicalAndExpressionContext {
    let localctx: LogicalAndExpressionContext = new LogicalAndExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 68, AIDLParser.RULE_logicalAndExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 394;
        this.bitwiseOrExpression();
        this.state = 399;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 56) {
          {
            {
              this.state = 395;
              this.match(AIDLParser.LOGICAL_AND);
              this.state = 396;
              this.bitwiseOrExpression();
            }
          }
          this.state = 401;
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
  public bitwiseOrExpression(): BitwiseOrExpressionContext {
    let localctx: BitwiseOrExpressionContext = new BitwiseOrExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 70, AIDLParser.RULE_bitwiseOrExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 402;
        this.bitwiseXorExpression();
        this.state = 407;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 40) {
          {
            {
              this.state = 403;
              this.match(AIDLParser.BITWISE_OR);
              this.state = 404;
              this.bitwiseXorExpression();
            }
          }
          this.state = 409;
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
  public bitwiseXorExpression(): BitwiseXorExpressionContext {
    let localctx: BitwiseXorExpressionContext = new BitwiseXorExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 72, AIDLParser.RULE_bitwiseXorExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 410;
        this.bitwiseAndExpression();
        this.state = 415;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 41) {
          {
            {
              this.state = 411;
              this.match(AIDLParser.BITWISE_XOR);
              this.state = 412;
              this.bitwiseAndExpression();
            }
          }
          this.state = 417;
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
  public bitwiseAndExpression(): BitwiseAndExpressionContext {
    let localctx: BitwiseAndExpressionContext = new BitwiseAndExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 74, AIDLParser.RULE_bitwiseAndExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 418;
        this.equalityExpression();
        this.state = 423;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 42) {
          {
            {
              this.state = 419;
              this.match(AIDLParser.BITWISE_AND);
              this.state = 420;
              this.equalityExpression();
            }
          }
          this.state = 425;
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
  public equalityExpression(): EqualityExpressionContext {
    let localctx: EqualityExpressionContext = new EqualityExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 76, AIDLParser.RULE_equalityExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 426;
        this.relationalExpression();
        this.state = 431;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 43 || _la === 44) {
          {
            {
              this.state = 427;
              _la = this._input.LA(1);
              if (!(_la === 43 || _la === 44)) {
                this._errHandler.recoverInline(this);
              } else {
                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 428;
              this.relationalExpression();
            }
          }
          this.state = 433;
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
  public relationalExpression(): RelationalExpressionContext {
    let localctx: RelationalExpressionContext = new RelationalExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 78, AIDLParser.RULE_relationalExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 434;
        this.shiftExpression();
        this.state = 439;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la - 45) & ~0x1f) === 0 &&
          ((1 << (_la - 45)) & 49155) !== 0
        ) {
          {
            {
              this.state = 435;
              _la = this._input.LA(1);
              if (
                !(
                  ((_la - 45) & ~0x1f) === 0 &&
                  ((1 << (_la - 45)) & 49155) !== 0
                )
              ) {
                this._errHandler.recoverInline(this);
              } else {
                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 436;
              this.shiftExpression();
            }
          }
          this.state = 441;
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
  public shiftExpression(): ShiftExpressionContext {
    let localctx: ShiftExpressionContext = new ShiftExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 80, AIDLParser.RULE_shiftExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 442;
        this.additiveExpression();
        this.state = 447;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 7) !== 0) {
          {
            {
              this.state = 443;
              _la = this._input.LA(1);
              if (
                !(((_la - 47) & ~0x1f) === 0 && ((1 << (_la - 47)) & 7) !== 0)
              ) {
                this._errHandler.recoverInline(this);
              } else {
                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 444;
              this.additiveExpression();
            }
          }
          this.state = 449;
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
  public additiveExpression(): AdditiveExpressionContext {
    let localctx: AdditiveExpressionContext = new AdditiveExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 82, AIDLParser.RULE_additiveExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 450;
        this.multiplicativeExpression();
        this.state = 455;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 50 || _la === 51) {
          {
            {
              this.state = 451;
              _la = this._input.LA(1);
              if (!(_la === 50 || _la === 51)) {
                this._errHandler.recoverInline(this);
              } else {
                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 452;
              this.multiplicativeExpression();
            }
          }
          this.state = 457;
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
  public multiplicativeExpression(): MultiplicativeExpressionContext {
    let localctx: MultiplicativeExpressionContext =
      new MultiplicativeExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 84, AIDLParser.RULE_multiplicativeExpression);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 458;
        this.unaryExpression();
        this.state = 463;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 7) !== 0) {
          {
            {
              this.state = 459;
              _la = this._input.LA(1);
              if (
                !(((_la - 52) & ~0x1f) === 0 && ((1 << (_la - 52)) & 7) !== 0)
              ) {
                this._errHandler.recoverInline(this);
              } else {
                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 460;
              this.unaryExpression();
            }
          }
          this.state = 465;
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
  public unaryExpression(): UnaryExpressionContext {
    let localctx: UnaryExpressionContext = new UnaryExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 86, AIDLParser.RULE_unaryExpression);
    let _la: number;
    try {
      this.state = 469;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 50:
        case 51:
        case 57:
        case 58:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 466;
            _la = this._input.LA(1);
            if (
              !(((_la - 50) & ~0x1f) === 0 && ((1 << (_la - 50)) & 387) !== 0)
            ) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 467;
            this.unaryExpression();
          }
          break;
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 61:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 468;
            this.primaryExpression();
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
  public primaryExpression(): PrimaryExpressionContext {
    let localctx: PrimaryExpressionContext = new PrimaryExpressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 88, AIDLParser.RULE_primaryExpression);
    try {
      this.state = 477;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 28:
        case 29:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 471;
            this.literal();
          }
          break;
        case 30:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 472;
            this.qualifiedName();
          }
          break;
        case 61:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 473;
            this.match(AIDLParser.LPAREN);
            this.state = 474;
            this.expression();
            this.state = 475;
            this.match(AIDLParser.RPAREN);
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
  public literal(): LiteralContext {
    let localctx: LiteralContext = new LiteralContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 90, AIDLParser.RULE_literal);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 479;
        _la = this._input.LA(1);
        if (!(((_la - 28) & ~0x1f) === 0 && ((1 << (_la - 28)) & 251) !== 0)) {
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
  public attributes(): AttributesContext {
    let localctx: AttributesContext = new AttributesContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 92, AIDLParser.RULE_attributes);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 482;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 481;
              this.annotation();
            }
          }
          this.state = 484;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === 70);
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

  public static readonly _serializedATN: number[] = [
    4, 1, 72, 487, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4,
    2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2,
    11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7,
    16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7, 21, 2,
    22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2, 27, 7,
    27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7, 32, 2,
    33, 7, 33, 2, 34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7,
    38, 2, 39, 7, 39, 2, 40, 7, 40, 2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2,
    44, 7, 44, 2, 45, 7, 45, 2, 46, 7, 46, 1, 0, 3, 0, 96, 8, 0, 1, 0, 5, 0, 99,
    8, 0, 10, 0, 12, 0, 102, 9, 0, 1, 0, 4, 0, 105, 8, 0, 11, 0, 12, 0, 106, 1,
    0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3,
    1, 3, 3, 3, 123, 8, 3, 1, 4, 3, 4, 126, 8, 4, 1, 4, 3, 4, 129, 8, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 3, 4, 135, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1, 5,
    5, 5, 144, 8, 5, 10, 5, 12, 5, 147, 9, 5, 1, 6, 1, 6, 1, 6, 3, 6, 152, 8, 6,
    1, 7, 3, 7, 155, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 161, 8, 7, 1, 7, 1, 7,
    3, 7, 165, 8, 7, 1, 7, 3, 7, 168, 8, 7, 1, 8, 1, 8, 1, 8, 5, 8, 173, 8, 8,
    10, 8, 12, 8, 176, 9, 8, 1, 8, 1, 8, 1, 9, 4, 9, 181, 8, 9, 11, 9, 12, 9,
    182, 1, 10, 1, 10, 1, 10, 1, 11, 3, 11, 189, 8, 11, 1, 11, 1, 11, 1, 11, 1,
    11, 1, 12, 1, 12, 1, 12, 5, 12, 198, 8, 12, 10, 12, 12, 12, 201, 9, 12, 1,
    13, 1, 13, 1, 13, 3, 13, 206, 8, 13, 1, 14, 3, 14, 209, 8, 14, 1, 14, 1, 14,
    1, 14, 1, 14, 1, 14, 1, 14, 5, 14, 217, 8, 14, 10, 14, 12, 14, 220, 9, 14,
    1, 14, 3, 14, 223, 8, 14, 1, 14, 1, 14, 3, 14, 227, 8, 14, 1, 15, 1, 15, 1,
    15, 3, 15, 232, 8, 15, 1, 16, 3, 16, 235, 8, 16, 1, 16, 1, 16, 1, 16, 1, 16,
    1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 18, 3, 18, 247, 8, 18, 1, 18, 3, 18,
    250, 8, 18, 1, 18, 1, 18, 1, 18, 1, 18, 3, 18, 256, 8, 18, 1, 18, 1, 18, 1,
    18, 3, 18, 261, 8, 18, 1, 18, 1, 18, 1, 19, 1, 19, 1, 19, 5, 19, 268, 8, 19,
    10, 19, 12, 19, 271, 9, 19, 1, 20, 1, 20, 5, 20, 275, 8, 20, 10, 20, 12, 20,
    278, 9, 20, 1, 20, 1, 20, 1, 20, 1, 21, 1, 21, 1, 22, 1, 22, 1, 22, 1, 22,
    1, 22, 1, 22, 3, 22, 291, 8, 22, 1, 23, 1, 23, 1, 23, 5, 23, 296, 8, 23, 10,
    23, 12, 23, 299, 9, 23, 1, 24, 1, 24, 1, 24, 3, 24, 304, 8, 24, 1, 24, 1,
    24, 3, 24, 308, 8, 24, 1, 25, 1, 25, 1, 25, 1, 25, 5, 25, 314, 8, 25, 10,
    25, 12, 25, 317, 9, 25, 1, 25, 1, 25, 1, 26, 1, 26, 1, 26, 5, 26, 324, 8,
    26, 10, 26, 12, 26, 327, 9, 26, 1, 26, 1, 26, 1, 26, 5, 26, 332, 8, 26, 10,
    26, 12, 26, 335, 9, 26, 1, 26, 1, 26, 1, 26, 5, 26, 340, 8, 26, 10, 26, 12,
    26, 343, 9, 26, 3, 26, 345, 8, 26, 1, 27, 1, 27, 1, 28, 1, 28, 1, 28, 1, 28,
    1, 28, 5, 28, 354, 8, 28, 10, 28, 12, 28, 357, 9, 28, 1, 28, 1, 28, 1, 29,
    1, 29, 1, 29, 1, 29, 3, 29, 365, 8, 29, 3, 29, 367, 8, 29, 1, 30, 1, 30, 1,
    30, 5, 30, 372, 8, 30, 10, 30, 12, 30, 375, 9, 30, 1, 31, 1, 31, 1, 31, 5,
    31, 380, 8, 31, 10, 31, 12, 31, 383, 9, 31, 1, 32, 1, 32, 1, 33, 1, 33, 1,
    33, 5, 33, 390, 8, 33, 10, 33, 12, 33, 393, 9, 33, 1, 34, 1, 34, 1, 34, 5,
    34, 398, 8, 34, 10, 34, 12, 34, 401, 9, 34, 1, 35, 1, 35, 1, 35, 5, 35, 406,
    8, 35, 10, 35, 12, 35, 409, 9, 35, 1, 36, 1, 36, 1, 36, 5, 36, 414, 8, 36,
    10, 36, 12, 36, 417, 9, 36, 1, 37, 1, 37, 1, 37, 5, 37, 422, 8, 37, 10, 37,
    12, 37, 425, 9, 37, 1, 38, 1, 38, 1, 38, 5, 38, 430, 8, 38, 10, 38, 12, 38,
    433, 9, 38, 1, 39, 1, 39, 1, 39, 5, 39, 438, 8, 39, 10, 39, 12, 39, 441, 9,
    39, 1, 40, 1, 40, 1, 40, 5, 40, 446, 8, 40, 10, 40, 12, 40, 449, 9, 40, 1,
    41, 1, 41, 1, 41, 5, 41, 454, 8, 41, 10, 41, 12, 41, 457, 9, 41, 1, 42, 1,
    42, 1, 42, 5, 42, 462, 8, 42, 10, 42, 12, 42, 465, 9, 42, 1, 43, 1, 43, 1,
    43, 3, 43, 470, 8, 43, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 3, 44, 478,
    8, 44, 1, 45, 1, 45, 1, 46, 4, 46, 483, 8, 46, 11, 46, 12, 46, 484, 1, 46,
    0, 0, 47, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34,
    36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72,
    74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 0, 11, 1, 0, 15, 18, 1, 0, 10, 12,
    1, 0, 19, 27, 2, 0, 2, 2, 6, 6, 1, 0, 43, 44, 2, 0, 45, 46, 59, 60, 1, 0,
    47, 49, 1, 0, 50, 51, 1, 0, 52, 54, 2, 0, 50, 51, 57, 58, 2, 0, 28, 29, 31,
    35, 505, 0, 95, 1, 0, 0, 0, 2, 110, 1, 0, 0, 0, 4, 114, 1, 0, 0, 0, 6, 122,
    1, 0, 0, 0, 8, 125, 1, 0, 0, 0, 10, 145, 1, 0, 0, 0, 12, 151, 1, 0, 0, 0,
    14, 154, 1, 0, 0, 0, 16, 169, 1, 0, 0, 0, 18, 180, 1, 0, 0, 0, 20, 184, 1,
    0, 0, 0, 22, 188, 1, 0, 0, 0, 24, 194, 1, 0, 0, 0, 26, 202, 1, 0, 0, 0, 28,
    208, 1, 0, 0, 0, 30, 228, 1, 0, 0, 0, 32, 234, 1, 0, 0, 0, 34, 243, 1, 0, 0,
    0, 36, 246, 1, 0, 0, 0, 38, 264, 1, 0, 0, 0, 40, 276, 1, 0, 0, 0, 42, 282,
    1, 0, 0, 0, 44, 284, 1, 0, 0, 0, 46, 292, 1, 0, 0, 0, 48, 303, 1, 0, 0, 0,
    50, 309, 1, 0, 0, 0, 52, 344, 1, 0, 0, 0, 54, 346, 1, 0, 0, 0, 56, 348, 1,
    0, 0, 0, 58, 366, 1, 0, 0, 0, 60, 368, 1, 0, 0, 0, 62, 376, 1, 0, 0, 0, 64,
    384, 1, 0, 0, 0, 66, 386, 1, 0, 0, 0, 68, 394, 1, 0, 0, 0, 70, 402, 1, 0, 0,
    0, 72, 410, 1, 0, 0, 0, 74, 418, 1, 0, 0, 0, 76, 426, 1, 0, 0, 0, 78, 434,
    1, 0, 0, 0, 80, 442, 1, 0, 0, 0, 82, 450, 1, 0, 0, 0, 84, 458, 1, 0, 0, 0,
    86, 469, 1, 0, 0, 0, 88, 477, 1, 0, 0, 0, 90, 479, 1, 0, 0, 0, 92, 482, 1,
    0, 0, 0, 94, 96, 3, 2, 1, 0, 95, 94, 1, 0, 0, 0, 95, 96, 1, 0, 0, 0, 96,
    100, 1, 0, 0, 0, 97, 99, 3, 4, 2, 0, 98, 97, 1, 0, 0, 0, 99, 102, 1, 0, 0,
    0, 100, 98, 1, 0, 0, 0, 100, 101, 1, 0, 0, 0, 101, 104, 1, 0, 0, 0, 102,
    100, 1, 0, 0, 0, 103, 105, 3, 6, 3, 0, 104, 103, 1, 0, 0, 0, 105, 106, 1, 0,
    0, 0, 106, 104, 1, 0, 0, 0, 106, 107, 1, 0, 0, 0, 107, 108, 1, 0, 0, 0, 108,
    109, 5, 0, 0, 1, 109, 1, 1, 0, 0, 0, 110, 111, 5, 3, 0, 0, 111, 112, 3, 62,
    31, 0, 112, 113, 5, 67, 0, 0, 113, 3, 1, 0, 0, 0, 114, 115, 5, 4, 0, 0, 115,
    116, 3, 62, 31, 0, 116, 117, 5, 67, 0, 0, 117, 5, 1, 0, 0, 0, 118, 123, 3,
    8, 4, 0, 119, 123, 3, 14, 7, 0, 120, 123, 3, 28, 14, 0, 121, 123, 3, 32, 16,
    0, 122, 118, 1, 0, 0, 0, 122, 119, 1, 0, 0, 0, 122, 120, 1, 0, 0, 0, 122,
    121, 1, 0, 0, 0, 123, 7, 1, 0, 0, 0, 124, 126, 3, 92, 46, 0, 125, 124, 1, 0,
    0, 0, 125, 126, 1, 0, 0, 0, 126, 128, 1, 0, 0, 0, 127, 129, 5, 9, 0, 0, 128,
    127, 1, 0, 0, 0, 128, 129, 1, 0, 0, 0, 129, 130, 1, 0, 0, 0, 130, 131, 5, 5,
    0, 0, 131, 134, 5, 30, 0, 0, 132, 133, 5, 6, 0, 0, 133, 135, 3, 60, 30, 0,
    134, 132, 1, 0, 0, 0, 134, 135, 1, 0, 0, 0, 135, 136, 1, 0, 0, 0, 136, 137,
    5, 63, 0, 0, 137, 138, 3, 10, 5, 0, 138, 139, 5, 64, 0, 0, 139, 9, 1, 0, 0,
    0, 140, 144, 3, 34, 17, 0, 141, 144, 3, 36, 18, 0, 142, 144, 3, 12, 6, 0,
    143, 140, 1, 0, 0, 0, 143, 141, 1, 0, 0, 0, 143, 142, 1, 0, 0, 0, 144, 147,
    1, 0, 0, 0, 145, 143, 1, 0, 0, 0, 145, 146, 1, 0, 0, 0, 146, 11, 1, 0, 0, 0,
    147, 145, 1, 0, 0, 0, 148, 152, 3, 14, 7, 0, 149, 152, 3, 28, 14, 0, 150,
    152, 3, 32, 16, 0, 151, 148, 1, 0, 0, 0, 151, 149, 1, 0, 0, 0, 151, 150, 1,
    0, 0, 0, 152, 13, 1, 0, 0, 0, 153, 155, 3, 92, 46, 0, 154, 153, 1, 0, 0, 0,
    154, 155, 1, 0, 0, 0, 155, 156, 1, 0, 0, 0, 156, 157, 5, 7, 0, 0, 157, 167,
    3, 62, 31, 0, 158, 168, 3, 16, 8, 0, 159, 161, 3, 18, 9, 0, 160, 159, 1, 0,
    0, 0, 160, 161, 1, 0, 0, 0, 161, 164, 1, 0, 0, 0, 162, 163, 5, 6, 0, 0, 163,
    165, 3, 62, 31, 0, 164, 162, 1, 0, 0, 0, 164, 165, 1, 0, 0, 0, 165, 166, 1,
    0, 0, 0, 166, 168, 5, 67, 0, 0, 167, 158, 1, 0, 0, 0, 167, 160, 1, 0, 0, 0,
    168, 15, 1, 0, 0, 0, 169, 174, 5, 63, 0, 0, 170, 173, 3, 22, 11, 0, 171,
    173, 3, 12, 6, 0, 172, 170, 1, 0, 0, 0, 172, 171, 1, 0, 0, 0, 173, 176, 1,
    0, 0, 0, 174, 172, 1, 0, 0, 0, 174, 175, 1, 0, 0, 0, 175, 177, 1, 0, 0, 0,
    176, 174, 1, 0, 0, 0, 177, 178, 5, 64, 0, 0, 178, 17, 1, 0, 0, 0, 179, 181,
    3, 20, 10, 0, 180, 179, 1, 0, 0, 0, 181, 182, 1, 0, 0, 0, 182, 180, 1, 0, 0,
    0, 182, 183, 1, 0, 0, 0, 183, 19, 1, 0, 0, 0, 184, 185, 7, 0, 0, 0, 185,
    186, 5, 35, 0, 0, 186, 21, 1, 0, 0, 0, 187, 189, 3, 92, 46, 0, 188, 187, 1,
    0, 0, 0, 188, 189, 1, 0, 0, 0, 189, 190, 1, 0, 0, 0, 190, 191, 3, 52, 26, 0,
    191, 192, 3, 24, 12, 0, 192, 193, 5, 67, 0, 0, 193, 23, 1, 0, 0, 0, 194,
    199, 3, 26, 13, 0, 195, 196, 5, 68, 0, 0, 196, 198, 3, 26, 13, 0, 197, 195,
    1, 0, 0, 0, 198, 201, 1, 0, 0, 0, 199, 197, 1, 0, 0, 0, 199, 200, 1, 0, 0,
    0, 200, 25, 1, 0, 0, 0, 201, 199, 1, 0, 0, 0, 202, 205, 5, 30, 0, 0, 203,
    204, 5, 71, 0, 0, 204, 206, 3, 64, 32, 0, 205, 203, 1, 0, 0, 0, 205, 206, 1,
    0, 0, 0, 206, 27, 1, 0, 0, 0, 207, 209, 3, 92, 46, 0, 208, 207, 1, 0, 0, 0,
    208, 209, 1, 0, 0, 0, 209, 210, 1, 0, 0, 0, 210, 211, 5, 8, 0, 0, 211, 212,
    5, 30, 0, 0, 212, 213, 5, 63, 0, 0, 213, 218, 3, 30, 15, 0, 214, 215, 5, 68,
    0, 0, 215, 217, 3, 30, 15, 0, 216, 214, 1, 0, 0, 0, 217, 220, 1, 0, 0, 0,
    218, 216, 1, 0, 0, 0, 218, 219, 1, 0, 0, 0, 219, 222, 1, 0, 0, 0, 220, 218,
    1, 0, 0, 0, 221, 223, 5, 68, 0, 0, 222, 221, 1, 0, 0, 0, 222, 223, 1, 0, 0,
    0, 223, 224, 1, 0, 0, 0, 224, 226, 5, 64, 0, 0, 225, 227, 5, 67, 0, 0, 226,
    225, 1, 0, 0, 0, 226, 227, 1, 0, 0, 0, 227, 29, 1, 0, 0, 0, 228, 231, 5, 30,
    0, 0, 229, 230, 5, 71, 0, 0, 230, 232, 3, 64, 32, 0, 231, 229, 1, 0, 0, 0,
    231, 232, 1, 0, 0, 0, 232, 31, 1, 0, 0, 0, 233, 235, 3, 92, 46, 0, 234, 233,
    1, 0, 0, 0, 234, 235, 1, 0, 0, 0, 235, 236, 1, 0, 0, 0, 236, 237, 5, 14, 0,
    0, 237, 238, 3, 52, 26, 0, 238, 239, 5, 30, 0, 0, 239, 240, 5, 71, 0, 0,
    240, 241, 3, 64, 32, 0, 241, 242, 5, 67, 0, 0, 242, 33, 1, 0, 0, 0, 243,
    244, 3, 32, 16, 0, 244, 35, 1, 0, 0, 0, 245, 247, 3, 92, 46, 0, 246, 245, 1,
    0, 0, 0, 246, 247, 1, 0, 0, 0, 247, 249, 1, 0, 0, 0, 248, 250, 5, 9, 0, 0,
    249, 248, 1, 0, 0, 0, 249, 250, 1, 0, 0, 0, 250, 251, 1, 0, 0, 0, 251, 252,
    3, 52, 26, 0, 252, 253, 5, 30, 0, 0, 253, 255, 5, 61, 0, 0, 254, 256, 3, 38,
    19, 0, 255, 254, 1, 0, 0, 0, 255, 256, 1, 0, 0, 0, 256, 257, 1, 0, 0, 0,
    257, 260, 5, 62, 0, 0, 258, 259, 5, 13, 0, 0, 259, 261, 3, 60, 30, 0, 260,
    258, 1, 0, 0, 0, 260, 261, 1, 0, 0, 0, 261, 262, 1, 0, 0, 0, 262, 263, 5,
    67, 0, 0, 263, 37, 1, 0, 0, 0, 264, 269, 3, 40, 20, 0, 265, 266, 5, 68, 0,
    0, 266, 268, 3, 40, 20, 0, 267, 265, 1, 0, 0, 0, 268, 271, 1, 0, 0, 0, 269,
    267, 1, 0, 0, 0, 269, 270, 1, 0, 0, 0, 270, 39, 1, 0, 0, 0, 271, 269, 1, 0,
    0, 0, 272, 275, 3, 42, 21, 0, 273, 275, 3, 44, 22, 0, 274, 272, 1, 0, 0, 0,
    274, 273, 1, 0, 0, 0, 275, 278, 1, 0, 0, 0, 276, 274, 1, 0, 0, 0, 276, 277,
    1, 0, 0, 0, 277, 279, 1, 0, 0, 0, 278, 276, 1, 0, 0, 0, 279, 280, 3, 52, 26,
    0, 280, 281, 3, 26, 13, 0, 281, 41, 1, 0, 0, 0, 282, 283, 7, 1, 0, 0, 283,
    43, 1, 0, 0, 0, 284, 285, 5, 70, 0, 0, 285, 290, 3, 62, 31, 0, 286, 287, 5,
    61, 0, 0, 287, 288, 3, 46, 23, 0, 288, 289, 5, 62, 0, 0, 289, 291, 1, 0, 0,
    0, 290, 286, 1, 0, 0, 0, 290, 291, 1, 0, 0, 0, 291, 45, 1, 0, 0, 0, 292,
    297, 3, 48, 24, 0, 293, 294, 5, 68, 0, 0, 294, 296, 3, 48, 24, 0, 295, 293,
    1, 0, 0, 0, 296, 299, 1, 0, 0, 0, 297, 295, 1, 0, 0, 0, 297, 298, 1, 0, 0,
    0, 298, 47, 1, 0, 0, 0, 299, 297, 1, 0, 0, 0, 300, 301, 3, 62, 31, 0, 301,
    302, 5, 71, 0, 0, 302, 304, 1, 0, 0, 0, 303, 300, 1, 0, 0, 0, 303, 304, 1,
    0, 0, 0, 304, 307, 1, 0, 0, 0, 305, 308, 3, 64, 32, 0, 306, 308, 3, 50, 25,
    0, 307, 305, 1, 0, 0, 0, 307, 306, 1, 0, 0, 0, 308, 49, 1, 0, 0, 0, 309,
    310, 5, 63, 0, 0, 310, 315, 3, 64, 32, 0, 311, 312, 5, 68, 0, 0, 312, 314,
    3, 64, 32, 0, 313, 311, 1, 0, 0, 0, 314, 317, 1, 0, 0, 0, 315, 313, 1, 0, 0,
    0, 315, 316, 1, 0, 0, 0, 316, 318, 1, 0, 0, 0, 317, 315, 1, 0, 0, 0, 318,
    319, 5, 64, 0, 0, 319, 51, 1, 0, 0, 0, 320, 325, 3, 54, 27, 0, 321, 322, 5,
    65, 0, 0, 322, 324, 5, 66, 0, 0, 323, 321, 1, 0, 0, 0, 324, 327, 1, 0, 0, 0,
    325, 323, 1, 0, 0, 0, 325, 326, 1, 0, 0, 0, 326, 345, 1, 0, 0, 0, 327, 325,
    1, 0, 0, 0, 328, 333, 3, 62, 31, 0, 329, 330, 5, 65, 0, 0, 330, 332, 5, 66,
    0, 0, 331, 329, 1, 0, 0, 0, 332, 335, 1, 0, 0, 0, 333, 331, 1, 0, 0, 0, 333,
    334, 1, 0, 0, 0, 334, 345, 1, 0, 0, 0, 335, 333, 1, 0, 0, 0, 336, 341, 3,
    56, 28, 0, 337, 338, 5, 65, 0, 0, 338, 340, 5, 66, 0, 0, 339, 337, 1, 0, 0,
    0, 340, 343, 1, 0, 0, 0, 341, 339, 1, 0, 0, 0, 341, 342, 1, 0, 0, 0, 342,
    345, 1, 0, 0, 0, 343, 341, 1, 0, 0, 0, 344, 320, 1, 0, 0, 0, 344, 328, 1, 0,
    0, 0, 344, 336, 1, 0, 0, 0, 345, 53, 1, 0, 0, 0, 346, 347, 7, 2, 0, 0, 347,
    55, 1, 0, 0, 0, 348, 349, 3, 62, 31, 0, 349, 350, 5, 59, 0, 0, 350, 355, 3,
    58, 29, 0, 351, 352, 5, 68, 0, 0, 352, 354, 3, 58, 29, 0, 353, 351, 1, 0, 0,
    0, 354, 357, 1, 0, 0, 0, 355, 353, 1, 0, 0, 0, 355, 356, 1, 0, 0, 0, 356,
    358, 1, 0, 0, 0, 357, 355, 1, 0, 0, 0, 358, 359, 5, 60, 0, 0, 359, 57, 1, 0,
    0, 0, 360, 367, 3, 52, 26, 0, 361, 364, 5, 1, 0, 0, 362, 363, 7, 3, 0, 0,
    363, 365, 3, 52, 26, 0, 364, 362, 1, 0, 0, 0, 364, 365, 1, 0, 0, 0, 365,
    367, 1, 0, 0, 0, 366, 360, 1, 0, 0, 0, 366, 361, 1, 0, 0, 0, 367, 59, 1, 0,
    0, 0, 368, 373, 3, 62, 31, 0, 369, 370, 5, 68, 0, 0, 370, 372, 3, 62, 31, 0,
    371, 369, 1, 0, 0, 0, 372, 375, 1, 0, 0, 0, 373, 371, 1, 0, 0, 0, 373, 374,
    1, 0, 0, 0, 374, 61, 1, 0, 0, 0, 375, 373, 1, 0, 0, 0, 376, 381, 5, 30, 0,
    0, 377, 378, 5, 69, 0, 0, 378, 380, 5, 30, 0, 0, 379, 377, 1, 0, 0, 0, 380,
    383, 1, 0, 0, 0, 381, 379, 1, 0, 0, 0, 381, 382, 1, 0, 0, 0, 382, 63, 1, 0,
    0, 0, 383, 381, 1, 0, 0, 0, 384, 385, 3, 66, 33, 0, 385, 65, 1, 0, 0, 0,
    386, 391, 3, 68, 34, 0, 387, 388, 5, 55, 0, 0, 388, 390, 3, 68, 34, 0, 389,
    387, 1, 0, 0, 0, 390, 393, 1, 0, 0, 0, 391, 389, 1, 0, 0, 0, 391, 392, 1, 0,
    0, 0, 392, 67, 1, 0, 0, 0, 393, 391, 1, 0, 0, 0, 394, 399, 3, 70, 35, 0,
    395, 396, 5, 56, 0, 0, 396, 398, 3, 70, 35, 0, 397, 395, 1, 0, 0, 0, 398,
    401, 1, 0, 0, 0, 399, 397, 1, 0, 0, 0, 399, 400, 1, 0, 0, 0, 400, 69, 1, 0,
    0, 0, 401, 399, 1, 0, 0, 0, 402, 407, 3, 72, 36, 0, 403, 404, 5, 40, 0, 0,
    404, 406, 3, 72, 36, 0, 405, 403, 1, 0, 0, 0, 406, 409, 1, 0, 0, 0, 407,
    405, 1, 0, 0, 0, 407, 408, 1, 0, 0, 0, 408, 71, 1, 0, 0, 0, 409, 407, 1, 0,
    0, 0, 410, 415, 3, 74, 37, 0, 411, 412, 5, 41, 0, 0, 412, 414, 3, 74, 37, 0,
    413, 411, 1, 0, 0, 0, 414, 417, 1, 0, 0, 0, 415, 413, 1, 0, 0, 0, 415, 416,
    1, 0, 0, 0, 416, 73, 1, 0, 0, 0, 417, 415, 1, 0, 0, 0, 418, 423, 3, 76, 38,
    0, 419, 420, 5, 42, 0, 0, 420, 422, 3, 76, 38, 0, 421, 419, 1, 0, 0, 0, 422,
    425, 1, 0, 0, 0, 423, 421, 1, 0, 0, 0, 423, 424, 1, 0, 0, 0, 424, 75, 1, 0,
    0, 0, 425, 423, 1, 0, 0, 0, 426, 431, 3, 78, 39, 0, 427, 428, 7, 4, 0, 0,
    428, 430, 3, 78, 39, 0, 429, 427, 1, 0, 0, 0, 430, 433, 1, 0, 0, 0, 431,
    429, 1, 0, 0, 0, 431, 432, 1, 0, 0, 0, 432, 77, 1, 0, 0, 0, 433, 431, 1, 0,
    0, 0, 434, 439, 3, 80, 40, 0, 435, 436, 7, 5, 0, 0, 436, 438, 3, 80, 40, 0,
    437, 435, 1, 0, 0, 0, 438, 441, 1, 0, 0, 0, 439, 437, 1, 0, 0, 0, 439, 440,
    1, 0, 0, 0, 440, 79, 1, 0, 0, 0, 441, 439, 1, 0, 0, 0, 442, 447, 3, 82, 41,
    0, 443, 444, 7, 6, 0, 0, 444, 446, 3, 82, 41, 0, 445, 443, 1, 0, 0, 0, 446,
    449, 1, 0, 0, 0, 447, 445, 1, 0, 0, 0, 447, 448, 1, 0, 0, 0, 448, 81, 1, 0,
    0, 0, 449, 447, 1, 0, 0, 0, 450, 455, 3, 84, 42, 0, 451, 452, 7, 7, 0, 0,
    452, 454, 3, 84, 42, 0, 453, 451, 1, 0, 0, 0, 454, 457, 1, 0, 0, 0, 455,
    453, 1, 0, 0, 0, 455, 456, 1, 0, 0, 0, 456, 83, 1, 0, 0, 0, 457, 455, 1, 0,
    0, 0, 458, 463, 3, 86, 43, 0, 459, 460, 7, 8, 0, 0, 460, 462, 3, 86, 43, 0,
    461, 459, 1, 0, 0, 0, 462, 465, 1, 0, 0, 0, 463, 461, 1, 0, 0, 0, 463, 464,
    1, 0, 0, 0, 464, 85, 1, 0, 0, 0, 465, 463, 1, 0, 0, 0, 466, 467, 7, 9, 0, 0,
    467, 470, 3, 86, 43, 0, 468, 470, 3, 88, 44, 0, 469, 466, 1, 0, 0, 0, 469,
    468, 1, 0, 0, 0, 470, 87, 1, 0, 0, 0, 471, 478, 3, 90, 45, 0, 472, 478, 3,
    62, 31, 0, 473, 474, 5, 61, 0, 0, 474, 475, 3, 64, 32, 0, 475, 476, 5, 62,
    0, 0, 476, 478, 1, 0, 0, 0, 477, 471, 1, 0, 0, 0, 477, 472, 1, 0, 0, 0, 477,
    473, 1, 0, 0, 0, 478, 89, 1, 0, 0, 0, 479, 480, 7, 10, 0, 0, 480, 91, 1, 0,
    0, 0, 481, 483, 3, 44, 22, 0, 482, 481, 1, 0, 0, 0, 483, 484, 1, 0, 0, 0,
    484, 482, 1, 0, 0, 0, 484, 485, 1, 0, 0, 0, 485, 93, 1, 0, 0, 0, 60, 95,
    100, 106, 122, 125, 128, 134, 143, 145, 151, 154, 160, 164, 167, 172, 174,
    182, 188, 199, 205, 208, 218, 222, 226, 231, 234, 246, 249, 255, 260, 269,
    274, 276, 290, 297, 303, 307, 315, 325, 333, 341, 344, 355, 364, 366, 373,
    381, 391, 399, 407, 415, 423, 431, 439, 447, 455, 463, 469, 477, 484,
  ];

  private static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!AIDLParser.__ATN) {
      AIDLParser.__ATN = new ATNDeserializer().deserialize(
        AIDLParser._serializedATN,
      );
    }

    return AIDLParser.__ATN;
  }

  static DecisionsToDFA = AIDLParser._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index),
  );
}

export class CompilationUnitContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public EOF(): TerminalNode {
    return this.getToken(AIDLParser.EOF, 0);
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
  public get ruleIndex(): number {
    return AIDLParser.RULE_compilationUnit;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterCompilationUnit) {
      listener.enterCompilationUnit(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitCompilationUnit) {
      listener.exitCompilationUnit(this);
    }
  }
}

export class PackageDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public PACKAGE(): TerminalNode {
    return this.getToken(AIDLParser.PACKAGE, 0);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(AIDLParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_packageDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterPackageDeclaration) {
      listener.enterPackageDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitPackageDeclaration) {
      listener.exitPackageDeclaration(this);
    }
  }
}

export class ImportDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IMPORT(): TerminalNode {
    return this.getToken(AIDLParser.IMPORT, 0);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(AIDLParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_importDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterImportDeclaration) {
      listener.enterImportDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitImportDeclaration) {
      listener.exitImportDeclaration(this);
    }
  }
}

export class TypeDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public interfaceDeclaration(): InterfaceDeclarationContext {
    return this.getTypedRuleContext(
      InterfaceDeclarationContext,
      0,
    ) as InterfaceDeclarationContext;
  }
  public parcelableDeclaration(): ParcelableDeclarationContext {
    return this.getTypedRuleContext(
      ParcelableDeclarationContext,
      0,
    ) as ParcelableDeclarationContext;
  }
  public enumDeclaration(): EnumDeclarationContext {
    return this.getTypedRuleContext(
      EnumDeclarationContext,
      0,
    ) as EnumDeclarationContext;
  }
  public constDeclaration(): ConstDeclarationContext {
    return this.getTypedRuleContext(
      ConstDeclarationContext,
      0,
    ) as ConstDeclarationContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_typeDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterTypeDeclaration) {
      listener.enterTypeDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitTypeDeclaration) {
      listener.exitTypeDeclaration(this);
    }
  }
}

export class InterfaceDeclarationContext extends ParserRuleContext {
  public _oneway!: Token;
  public _name!: Token;
  public _extendedInterfaces!: TypeListContext;
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public INTERFACE(): TerminalNode {
    return this.getToken(AIDLParser.INTERFACE, 0);
  }
  public LBRACE(): TerminalNode {
    return this.getToken(AIDLParser.LBRACE, 0);
  }
  public interfaceBody(): InterfaceBodyContext {
    return this.getTypedRuleContext(
      InterfaceBodyContext,
      0,
    ) as InterfaceBodyContext;
  }
  public RBRACE(): TerminalNode {
    return this.getToken(AIDLParser.RBRACE, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(AIDLParser.IDENTIFIER, 0);
  }
  public attributes(): AttributesContext {
    return this.getTypedRuleContext(AttributesContext, 0) as AttributesContext;
  }
  public EXTENDS(): TerminalNode {
    return this.getToken(AIDLParser.EXTENDS, 0);
  }
  public ONEWAY(): TerminalNode {
    return this.getToken(AIDLParser.ONEWAY, 0);
  }
  public typeList(): TypeListContext {
    return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_interfaceDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterInterfaceDeclaration) {
      listener.enterInterfaceDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitInterfaceDeclaration) {
      listener.exitInterfaceDeclaration(this);
    }
  }
}

export class InterfaceBodyContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public constantDeclaration_list(): ConstantDeclarationContext[] {
    return this.getTypedRuleContexts(
      ConstantDeclarationContext,
    ) as ConstantDeclarationContext[];
  }
  public constantDeclaration(i: number): ConstantDeclarationContext {
    return this.getTypedRuleContext(
      ConstantDeclarationContext,
      i,
    ) as ConstantDeclarationContext;
  }
  public methodDeclaration_list(): MethodDeclarationContext[] {
    return this.getTypedRuleContexts(
      MethodDeclarationContext,
    ) as MethodDeclarationContext[];
  }
  public methodDeclaration(i: number): MethodDeclarationContext {
    return this.getTypedRuleContext(
      MethodDeclarationContext,
      i,
    ) as MethodDeclarationContext;
  }
  public nestedTypeDeclaration_list(): NestedTypeDeclarationContext[] {
    return this.getTypedRuleContexts(
      NestedTypeDeclarationContext,
    ) as NestedTypeDeclarationContext[];
  }
  public nestedTypeDeclaration(i: number): NestedTypeDeclarationContext {
    return this.getTypedRuleContext(
      NestedTypeDeclarationContext,
      i,
    ) as NestedTypeDeclarationContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_interfaceBody;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterInterfaceBody) {
      listener.enterInterfaceBody(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitInterfaceBody) {
      listener.exitInterfaceBody(this);
    }
  }
}

export class NestedTypeDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public parcelableDeclaration(): ParcelableDeclarationContext {
    return this.getTypedRuleContext(
      ParcelableDeclarationContext,
      0,
    ) as ParcelableDeclarationContext;
  }
  public enumDeclaration(): EnumDeclarationContext {
    return this.getTypedRuleContext(
      EnumDeclarationContext,
      0,
    ) as EnumDeclarationContext;
  }
  public constDeclaration(): ConstDeclarationContext {
    return this.getTypedRuleContext(
      ConstDeclarationContext,
      0,
    ) as ConstDeclarationContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_nestedTypeDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterNestedTypeDeclaration) {
      listener.enterNestedTypeDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitNestedTypeDeclaration) {
      listener.exitNestedTypeDeclaration(this);
    }
  }
}

export class ParcelableDeclarationContext extends ParserRuleContext {
  public _name!: QualifiedNameContext;
  public _superType!: QualifiedNameContext;
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public PARCELABLE(): TerminalNode {
    return this.getToken(AIDLParser.PARCELABLE, 0);
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
  public parcelableBody(): ParcelableBodyContext {
    return this.getTypedRuleContext(
      ParcelableBodyContext,
      0,
    ) as ParcelableBodyContext;
  }
  public attributes(): AttributesContext {
    return this.getTypedRuleContext(AttributesContext, 0) as AttributesContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(AIDLParser.SEMI, 0);
  }
  public languageHeaders(): LanguageHeadersContext {
    return this.getTypedRuleContext(
      LanguageHeadersContext,
      0,
    ) as LanguageHeadersContext;
  }
  public EXTENDS(): TerminalNode {
    return this.getToken(AIDLParser.EXTENDS, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_parcelableDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterParcelableDeclaration) {
      listener.enterParcelableDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitParcelableDeclaration) {
      listener.exitParcelableDeclaration(this);
    }
  }
}

export class ParcelableBodyContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(AIDLParser.LBRACE, 0);
  }
  public RBRACE(): TerminalNode {
    return this.getToken(AIDLParser.RBRACE, 0);
  }
  public fieldDeclaration_list(): FieldDeclarationContext[] {
    return this.getTypedRuleContexts(
      FieldDeclarationContext,
    ) as FieldDeclarationContext[];
  }
  public fieldDeclaration(i: number): FieldDeclarationContext {
    return this.getTypedRuleContext(
      FieldDeclarationContext,
      i,
    ) as FieldDeclarationContext;
  }
  public nestedTypeDeclaration_list(): NestedTypeDeclarationContext[] {
    return this.getTypedRuleContexts(
      NestedTypeDeclarationContext,
    ) as NestedTypeDeclarationContext[];
  }
  public nestedTypeDeclaration(i: number): NestedTypeDeclarationContext {
    return this.getTypedRuleContext(
      NestedTypeDeclarationContext,
      i,
    ) as NestedTypeDeclarationContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_parcelableBody;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterParcelableBody) {
      listener.enterParcelableBody(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitParcelableBody) {
      listener.exitParcelableBody(this);
    }
  }
}

export class LanguageHeadersContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public languageHeader_list(): LanguageHeaderContext[] {
    return this.getTypedRuleContexts(
      LanguageHeaderContext,
    ) as LanguageHeaderContext[];
  }
  public languageHeader(i: number): LanguageHeaderContext {
    return this.getTypedRuleContext(
      LanguageHeaderContext,
      i,
    ) as LanguageHeaderContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_languageHeaders;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterLanguageHeaders) {
      listener.enterLanguageHeaders(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitLanguageHeaders) {
      listener.exitLanguageHeaders(this);
    }
  }
}

export class LanguageHeaderContext extends ParserRuleContext {
  public _headerType!: Token;
  public _headerValue!: Token;
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public STRING_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.STRING_LITERAL, 0);
  }
  public CPP_HEADER(): TerminalNode {
    return this.getToken(AIDLParser.CPP_HEADER, 0);
  }
  public JAVA_HEADER(): TerminalNode {
    return this.getToken(AIDLParser.JAVA_HEADER, 0);
  }
  public NDK_HEADER(): TerminalNode {
    return this.getToken(AIDLParser.NDK_HEADER, 0);
  }
  public RUST_HEADER(): TerminalNode {
    return this.getToken(AIDLParser.RUST_HEADER, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_languageHeader;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterLanguageHeader) {
      listener.enterLanguageHeader(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitLanguageHeader) {
      listener.exitLanguageHeader(this);
    }
  }
}

export class FieldDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public type_(): TypeContext {
    return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
  }
  public variableDeclarators(): VariableDeclaratorsContext {
    return this.getTypedRuleContext(
      VariableDeclaratorsContext,
      0,
    ) as VariableDeclaratorsContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(AIDLParser.SEMI, 0);
  }
  public attributes(): AttributesContext {
    return this.getTypedRuleContext(AttributesContext, 0) as AttributesContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_fieldDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterFieldDeclaration) {
      listener.enterFieldDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitFieldDeclaration) {
      listener.exitFieldDeclaration(this);
    }
  }
}

export class VariableDeclaratorsContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
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
    return this.getTokens(AIDLParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(AIDLParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_variableDeclarators;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterVariableDeclarators) {
      listener.enterVariableDeclarators(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitVariableDeclarators) {
      listener.exitVariableDeclarators(this);
    }
  }
}

export class VariableDeclaratorContext extends ParserRuleContext {
  public _name!: Token;
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(AIDLParser.IDENTIFIER, 0);
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(AIDLParser.ASSIGN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_variableDeclarator;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterVariableDeclarator) {
      listener.enterVariableDeclarator(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitVariableDeclarator) {
      listener.exitVariableDeclarator(this);
    }
  }
}

export class EnumDeclarationContext extends ParserRuleContext {
  public _name!: Token;
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public ENUM(): TerminalNode {
    return this.getToken(AIDLParser.ENUM, 0);
  }
  public LBRACE(): TerminalNode {
    return this.getToken(AIDLParser.LBRACE, 0);
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
  public RBRACE(): TerminalNode {
    return this.getToken(AIDLParser.RBRACE, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(AIDLParser.IDENTIFIER, 0);
  }
  public attributes(): AttributesContext {
    return this.getTypedRuleContext(AttributesContext, 0) as AttributesContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(AIDLParser.COMMA, i);
  }
  public SEMI(): TerminalNode {
    return this.getToken(AIDLParser.SEMI, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_enumDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterEnumDeclaration) {
      listener.enterEnumDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitEnumDeclaration) {
      listener.exitEnumDeclaration(this);
    }
  }
}

export class EnumConstantContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(AIDLParser.IDENTIFIER, 0);
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(AIDLParser.ASSIGN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_enumConstant;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterEnumConstant) {
      listener.enterEnumConstant(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitEnumConstant) {
      listener.exitEnumConstant(this);
    }
  }
}

export class ConstDeclarationContext extends ParserRuleContext {
  public _name!: Token;
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public CONST(): TerminalNode {
    return this.getToken(AIDLParser.CONST, 0);
  }
  public type_(): TypeContext {
    return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(AIDLParser.ASSIGN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public SEMI(): TerminalNode {
    return this.getToken(AIDLParser.SEMI, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(AIDLParser.IDENTIFIER, 0);
  }
  public attributes(): AttributesContext {
    return this.getTypedRuleContext(AttributesContext, 0) as AttributesContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_constDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterConstDeclaration) {
      listener.enterConstDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitConstDeclaration) {
      listener.exitConstDeclaration(this);
    }
  }
}

export class ConstantDeclarationContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public constDeclaration(): ConstDeclarationContext {
    return this.getTypedRuleContext(
      ConstDeclarationContext,
      0,
    ) as ConstDeclarationContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_constantDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterConstantDeclaration) {
      listener.enterConstantDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitConstantDeclaration) {
      listener.exitConstantDeclaration(this);
    }
  }
}

export class MethodDeclarationContext extends ParserRuleContext {
  public _oneway!: Token;
  public _name!: Token;
  public _exceptionList!: TypeListContext;
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public type_(): TypeContext {
    return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(AIDLParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(AIDLParser.RPAREN, 0);
  }
  public SEMI(): TerminalNode {
    return this.getToken(AIDLParser.SEMI, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(AIDLParser.IDENTIFIER, 0);
  }
  public attributes(): AttributesContext {
    return this.getTypedRuleContext(AttributesContext, 0) as AttributesContext;
  }
  public parameterList(): ParameterListContext {
    return this.getTypedRuleContext(
      ParameterListContext,
      0,
    ) as ParameterListContext;
  }
  public THROWS(): TerminalNode {
    return this.getToken(AIDLParser.THROWS, 0);
  }
  public ONEWAY(): TerminalNode {
    return this.getToken(AIDLParser.ONEWAY, 0);
  }
  public typeList(): TypeListContext {
    return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_methodDeclaration;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterMethodDeclaration) {
      listener.enterMethodDeclaration(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitMethodDeclaration) {
      listener.exitMethodDeclaration(this);
    }
  }
}

export class ParameterListContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public parameter_list(): ParameterContext[] {
    return this.getTypedRuleContexts(ParameterContext) as ParameterContext[];
  }
  public parameter(i: number): ParameterContext {
    return this.getTypedRuleContext(ParameterContext, i) as ParameterContext;
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(AIDLParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_parameterList;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterParameterList) {
      listener.enterParameterList(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitParameterList) {
      listener.exitParameterList(this);
    }
  }
}

export class ParameterContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public type_(): TypeContext {
    return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
  }
  public variableDeclarator(): VariableDeclaratorContext {
    return this.getTypedRuleContext(
      VariableDeclaratorContext,
      0,
    ) as VariableDeclaratorContext;
  }
  public direction_list(): DirectionContext[] {
    return this.getTypedRuleContexts(DirectionContext) as DirectionContext[];
  }
  public direction(i: number): DirectionContext {
    return this.getTypedRuleContext(DirectionContext, i) as DirectionContext;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_parameter;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterParameter) {
      listener.enterParameter(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitParameter) {
      listener.exitParameter(this);
    }
  }
}

export class DirectionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IN(): TerminalNode {
    return this.getToken(AIDLParser.IN, 0);
  }
  public OUT(): TerminalNode {
    return this.getToken(AIDLParser.OUT, 0);
  }
  public INOUT(): TerminalNode {
    return this.getToken(AIDLParser.INOUT, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_direction;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterDirection) {
      listener.enterDirection(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitDirection) {
      listener.exitDirection(this);
    }
  }
}

export class AnnotationContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public AT(): TerminalNode {
    return this.getToken(AIDLParser.AT, 0);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(AIDLParser.LPAREN, 0);
  }
  public annotationValues(): AnnotationValuesContext {
    return this.getTypedRuleContext(
      AnnotationValuesContext,
      0,
    ) as AnnotationValuesContext;
  }
  public RPAREN(): TerminalNode {
    return this.getToken(AIDLParser.RPAREN, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_annotation;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterAnnotation) {
      listener.enterAnnotation(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitAnnotation) {
      listener.exitAnnotation(this);
    }
  }
}

export class AnnotationValuesContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
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
    return this.getTokens(AIDLParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(AIDLParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_annotationValues;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterAnnotationValues) {
      listener.enterAnnotationValues(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitAnnotationValues) {
      listener.exitAnnotationValues(this);
    }
  }
}

export class AnnotationValueContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public annotationArray(): AnnotationArrayContext {
    return this.getTypedRuleContext(
      AnnotationArrayContext,
      0,
    ) as AnnotationArrayContext;
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public ASSIGN(): TerminalNode {
    return this.getToken(AIDLParser.ASSIGN, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_annotationValue;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterAnnotationValue) {
      listener.enterAnnotationValue(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitAnnotationValue) {
      listener.exitAnnotationValue(this);
    }
  }
}

export class AnnotationArrayContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LBRACE(): TerminalNode {
    return this.getToken(AIDLParser.LBRACE, 0);
  }
  public expression_list(): ExpressionContext[] {
    return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
  }
  public expression(i: number): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
  }
  public RBRACE(): TerminalNode {
    return this.getToken(AIDLParser.RBRACE, 0);
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(AIDLParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_annotationArray;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterAnnotationArray) {
      listener.enterAnnotationArray(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitAnnotationArray) {
      listener.exitAnnotationArray(this);
    }
  }
}

export class TypeContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public primitiveType(): PrimitiveTypeContext {
    return this.getTypedRuleContext(
      PrimitiveTypeContext,
      0,
    ) as PrimitiveTypeContext;
  }
  public LBRACKET_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.LBRACKET);
  }
  public LBRACKET(i: number): TerminalNode {
    return this.getToken(AIDLParser.LBRACKET, i);
  }
  public RBRACKET_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.RBRACKET);
  }
  public RBRACKET(i: number): TerminalNode {
    return this.getToken(AIDLParser.RBRACKET, i);
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public genericType(): GenericTypeContext {
    return this.getTypedRuleContext(
      GenericTypeContext,
      0,
    ) as GenericTypeContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_type;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterType) {
      listener.enterType(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitType) {
      listener.exitType(this);
    }
  }
}

export class PrimitiveTypeContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public BYTE(): TerminalNode {
    return this.getToken(AIDLParser.BYTE, 0);
  }
  public SHORT(): TerminalNode {
    return this.getToken(AIDLParser.SHORT, 0);
  }
  public INT(): TerminalNode {
    return this.getToken(AIDLParser.INT, 0);
  }
  public LONG(): TerminalNode {
    return this.getToken(AIDLParser.LONG, 0);
  }
  public CHAR(): TerminalNode {
    return this.getToken(AIDLParser.CHAR, 0);
  }
  public FLOAT(): TerminalNode {
    return this.getToken(AIDLParser.FLOAT, 0);
  }
  public DOUBLE(): TerminalNode {
    return this.getToken(AIDLParser.DOUBLE, 0);
  }
  public BOOLEAN(): TerminalNode {
    return this.getToken(AIDLParser.BOOLEAN, 0);
  }
  public STRING(): TerminalNode {
    return this.getToken(AIDLParser.STRING, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_primitiveType;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterPrimitiveType) {
      listener.enterPrimitiveType(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitPrimitiveType) {
      listener.exitPrimitiveType(this);
    }
  }
}

export class GenericTypeContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public LESS(): TerminalNode {
    return this.getToken(AIDLParser.LESS, 0);
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
  public GREATER(): TerminalNode {
    return this.getToken(AIDLParser.GREATER, 0);
  }
  public COMMA_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(AIDLParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_genericType;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterGenericType) {
      listener.enterGenericType(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitGenericType) {
      listener.exitGenericType(this);
    }
  }
}

export class TypeArgumentContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public type_(): TypeContext {
    return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
  }
  public EXTENDS(): TerminalNode {
    return this.getToken(AIDLParser.EXTENDS, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_typeArgument;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterTypeArgument) {
      listener.enterTypeArgument(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitTypeArgument) {
      listener.exitTypeArgument(this);
    }
  }
}

export class TypeListContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
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
    return this.getTokens(AIDLParser.COMMA);
  }
  public COMMA(i: number): TerminalNode {
    return this.getToken(AIDLParser.COMMA, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_typeList;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterTypeList) {
      listener.enterTypeList(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitTypeList) {
      listener.exitTypeList(this);
    }
  }
}

export class QualifiedNameContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public IDENTIFIER_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.IDENTIFIER);
  }
  public IDENTIFIER(i: number): TerminalNode {
    return this.getToken(AIDLParser.IDENTIFIER, i);
  }
  public DOT_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.DOT);
  }
  public DOT(i: number): TerminalNode {
    return this.getToken(AIDLParser.DOT, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_qualifiedName;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterQualifiedName) {
      listener.enterQualifiedName(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitQualifiedName) {
      listener.exitQualifiedName(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public logicalOrExpression(): LogicalOrExpressionContext {
    return this.getTypedRuleContext(
      LogicalOrExpressionContext,
      0,
    ) as LogicalOrExpressionContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_expression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
}

export class LogicalOrExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public logicalAndExpression_list(): LogicalAndExpressionContext[] {
    return this.getTypedRuleContexts(
      LogicalAndExpressionContext,
    ) as LogicalAndExpressionContext[];
  }
  public logicalAndExpression(i: number): LogicalAndExpressionContext {
    return this.getTypedRuleContext(
      LogicalAndExpressionContext,
      i,
    ) as LogicalAndExpressionContext;
  }
  public LOGICAL_OR_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.LOGICAL_OR);
  }
  public LOGICAL_OR(i: number): TerminalNode {
    return this.getToken(AIDLParser.LOGICAL_OR, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_logicalOrExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterLogicalOrExpression) {
      listener.enterLogicalOrExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitLogicalOrExpression) {
      listener.exitLogicalOrExpression(this);
    }
  }
}

export class LogicalAndExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public bitwiseOrExpression_list(): BitwiseOrExpressionContext[] {
    return this.getTypedRuleContexts(
      BitwiseOrExpressionContext,
    ) as BitwiseOrExpressionContext[];
  }
  public bitwiseOrExpression(i: number): BitwiseOrExpressionContext {
    return this.getTypedRuleContext(
      BitwiseOrExpressionContext,
      i,
    ) as BitwiseOrExpressionContext;
  }
  public LOGICAL_AND_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.LOGICAL_AND);
  }
  public LOGICAL_AND(i: number): TerminalNode {
    return this.getToken(AIDLParser.LOGICAL_AND, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_logicalAndExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterLogicalAndExpression) {
      listener.enterLogicalAndExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitLogicalAndExpression) {
      listener.exitLogicalAndExpression(this);
    }
  }
}

export class BitwiseOrExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public bitwiseXorExpression_list(): BitwiseXorExpressionContext[] {
    return this.getTypedRuleContexts(
      BitwiseXorExpressionContext,
    ) as BitwiseXorExpressionContext[];
  }
  public bitwiseXorExpression(i: number): BitwiseXorExpressionContext {
    return this.getTypedRuleContext(
      BitwiseXorExpressionContext,
      i,
    ) as BitwiseXorExpressionContext;
  }
  public BITWISE_OR_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.BITWISE_OR);
  }
  public BITWISE_OR(i: number): TerminalNode {
    return this.getToken(AIDLParser.BITWISE_OR, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_bitwiseOrExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterBitwiseOrExpression) {
      listener.enterBitwiseOrExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitBitwiseOrExpression) {
      listener.exitBitwiseOrExpression(this);
    }
  }
}

export class BitwiseXorExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public bitwiseAndExpression_list(): BitwiseAndExpressionContext[] {
    return this.getTypedRuleContexts(
      BitwiseAndExpressionContext,
    ) as BitwiseAndExpressionContext[];
  }
  public bitwiseAndExpression(i: number): BitwiseAndExpressionContext {
    return this.getTypedRuleContext(
      BitwiseAndExpressionContext,
      i,
    ) as BitwiseAndExpressionContext;
  }
  public BITWISE_XOR_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.BITWISE_XOR);
  }
  public BITWISE_XOR(i: number): TerminalNode {
    return this.getToken(AIDLParser.BITWISE_XOR, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_bitwiseXorExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterBitwiseXorExpression) {
      listener.enterBitwiseXorExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitBitwiseXorExpression) {
      listener.exitBitwiseXorExpression(this);
    }
  }
}

export class BitwiseAndExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public equalityExpression_list(): EqualityExpressionContext[] {
    return this.getTypedRuleContexts(
      EqualityExpressionContext,
    ) as EqualityExpressionContext[];
  }
  public equalityExpression(i: number): EqualityExpressionContext {
    return this.getTypedRuleContext(
      EqualityExpressionContext,
      i,
    ) as EqualityExpressionContext;
  }
  public BITWISE_AND_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.BITWISE_AND);
  }
  public BITWISE_AND(i: number): TerminalNode {
    return this.getToken(AIDLParser.BITWISE_AND, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_bitwiseAndExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterBitwiseAndExpression) {
      listener.enterBitwiseAndExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitBitwiseAndExpression) {
      listener.exitBitwiseAndExpression(this);
    }
  }
}

export class EqualityExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public relationalExpression_list(): RelationalExpressionContext[] {
    return this.getTypedRuleContexts(
      RelationalExpressionContext,
    ) as RelationalExpressionContext[];
  }
  public relationalExpression(i: number): RelationalExpressionContext {
    return this.getTypedRuleContext(
      RelationalExpressionContext,
      i,
    ) as RelationalExpressionContext;
  }
  public EQUALS_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.EQUALS);
  }
  public EQUALS(i: number): TerminalNode {
    return this.getToken(AIDLParser.EQUALS, i);
  }
  public NOT_EQUALS_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.NOT_EQUALS);
  }
  public NOT_EQUALS(i: number): TerminalNode {
    return this.getToken(AIDLParser.NOT_EQUALS, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_equalityExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterEqualityExpression) {
      listener.enterEqualityExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitEqualityExpression) {
      listener.exitEqualityExpression(this);
    }
  }
}

export class RelationalExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public shiftExpression_list(): ShiftExpressionContext[] {
    return this.getTypedRuleContexts(
      ShiftExpressionContext,
    ) as ShiftExpressionContext[];
  }
  public shiftExpression(i: number): ShiftExpressionContext {
    return this.getTypedRuleContext(
      ShiftExpressionContext,
      i,
    ) as ShiftExpressionContext;
  }
  public LESS_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.LESS);
  }
  public LESS(i: number): TerminalNode {
    return this.getToken(AIDLParser.LESS, i);
  }
  public GREATER_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.GREATER);
  }
  public GREATER(i: number): TerminalNode {
    return this.getToken(AIDLParser.GREATER, i);
  }
  public LESS_EQUAL_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.LESS_EQUAL);
  }
  public LESS_EQUAL(i: number): TerminalNode {
    return this.getToken(AIDLParser.LESS_EQUAL, i);
  }
  public GREATER_EQUAL_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.GREATER_EQUAL);
  }
  public GREATER_EQUAL(i: number): TerminalNode {
    return this.getToken(AIDLParser.GREATER_EQUAL, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_relationalExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterRelationalExpression) {
      listener.enterRelationalExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitRelationalExpression) {
      listener.exitRelationalExpression(this);
    }
  }
}

export class ShiftExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public additiveExpression_list(): AdditiveExpressionContext[] {
    return this.getTypedRuleContexts(
      AdditiveExpressionContext,
    ) as AdditiveExpressionContext[];
  }
  public additiveExpression(i: number): AdditiveExpressionContext {
    return this.getTypedRuleContext(
      AdditiveExpressionContext,
      i,
    ) as AdditiveExpressionContext;
  }
  public LEFT_SHIFT_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.LEFT_SHIFT);
  }
  public LEFT_SHIFT(i: number): TerminalNode {
    return this.getToken(AIDLParser.LEFT_SHIFT, i);
  }
  public RIGHT_SHIFT_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.RIGHT_SHIFT);
  }
  public RIGHT_SHIFT(i: number): TerminalNode {
    return this.getToken(AIDLParser.RIGHT_SHIFT, i);
  }
  public UNSIGNED_RIGHT_SHIFT_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.UNSIGNED_RIGHT_SHIFT);
  }
  public UNSIGNED_RIGHT_SHIFT(i: number): TerminalNode {
    return this.getToken(AIDLParser.UNSIGNED_RIGHT_SHIFT, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_shiftExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterShiftExpression) {
      listener.enterShiftExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitShiftExpression) {
      listener.exitShiftExpression(this);
    }
  }
}

export class AdditiveExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public multiplicativeExpression_list(): MultiplicativeExpressionContext[] {
    return this.getTypedRuleContexts(
      MultiplicativeExpressionContext,
    ) as MultiplicativeExpressionContext[];
  }
  public multiplicativeExpression(i: number): MultiplicativeExpressionContext {
    return this.getTypedRuleContext(
      MultiplicativeExpressionContext,
      i,
    ) as MultiplicativeExpressionContext;
  }
  public PLUS_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.PLUS);
  }
  public PLUS(i: number): TerminalNode {
    return this.getToken(AIDLParser.PLUS, i);
  }
  public MINUS_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.MINUS);
  }
  public MINUS(i: number): TerminalNode {
    return this.getToken(AIDLParser.MINUS, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_additiveExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterAdditiveExpression) {
      listener.enterAdditiveExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitAdditiveExpression) {
      listener.exitAdditiveExpression(this);
    }
  }
}

export class MultiplicativeExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public unaryExpression_list(): UnaryExpressionContext[] {
    return this.getTypedRuleContexts(
      UnaryExpressionContext,
    ) as UnaryExpressionContext[];
  }
  public unaryExpression(i: number): UnaryExpressionContext {
    return this.getTypedRuleContext(
      UnaryExpressionContext,
      i,
    ) as UnaryExpressionContext;
  }
  public MULTIPLY_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.MULTIPLY);
  }
  public MULTIPLY(i: number): TerminalNode {
    return this.getToken(AIDLParser.MULTIPLY, i);
  }
  public DIVIDE_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.DIVIDE);
  }
  public DIVIDE(i: number): TerminalNode {
    return this.getToken(AIDLParser.DIVIDE, i);
  }
  public MODULO_list(): TerminalNode[] {
    return this.getTokens(AIDLParser.MODULO);
  }
  public MODULO(i: number): TerminalNode {
    return this.getToken(AIDLParser.MODULO, i);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_multiplicativeExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterMultiplicativeExpression) {
      listener.enterMultiplicativeExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitMultiplicativeExpression) {
      listener.exitMultiplicativeExpression(this);
    }
  }
}

export class UnaryExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public unaryExpression(): UnaryExpressionContext {
    return this.getTypedRuleContext(
      UnaryExpressionContext,
      0,
    ) as UnaryExpressionContext;
  }
  public LOGICAL_NOT(): TerminalNode {
    return this.getToken(AIDLParser.LOGICAL_NOT, 0);
  }
  public BITWISE_NOT(): TerminalNode {
    return this.getToken(AIDLParser.BITWISE_NOT, 0);
  }
  public PLUS(): TerminalNode {
    return this.getToken(AIDLParser.PLUS, 0);
  }
  public MINUS(): TerminalNode {
    return this.getToken(AIDLParser.MINUS, 0);
  }
  public primaryExpression(): PrimaryExpressionContext {
    return this.getTypedRuleContext(
      PrimaryExpressionContext,
      0,
    ) as PrimaryExpressionContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_unaryExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterUnaryExpression) {
      listener.enterUnaryExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitUnaryExpression) {
      listener.exitUnaryExpression(this);
    }
  }
}

export class PrimaryExpressionContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public literal(): LiteralContext {
    return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
  }
  public qualifiedName(): QualifiedNameContext {
    return this.getTypedRuleContext(
      QualifiedNameContext,
      0,
    ) as QualifiedNameContext;
  }
  public LPAREN(): TerminalNode {
    return this.getToken(AIDLParser.LPAREN, 0);
  }
  public expression(): ExpressionContext {
    return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
  }
  public RPAREN(): TerminalNode {
    return this.getToken(AIDLParser.RPAREN, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_primaryExpression;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterPrimaryExpression) {
      listener.enterPrimaryExpression(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitPrimaryExpression) {
      listener.exitPrimaryExpression(this);
    }
  }
}

export class LiteralContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public INTEGER_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.INTEGER_LITERAL, 0);
  }
  public FLOATING_POINT_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.FLOATING_POINT_LITERAL, 0);
  }
  public FLOAT_SUFFIX_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.FLOAT_SUFFIX_LITERAL, 0);
  }
  public CHARACTER_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.CHARACTER_LITERAL, 0);
  }
  public STRING_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.STRING_LITERAL, 0);
  }
  public BOOLEAN_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.BOOLEAN_LITERAL, 0);
  }
  public NULL_LITERAL(): TerminalNode {
    return this.getToken(AIDLParser.NULL_LITERAL, 0);
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_literal;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterLiteral) {
      listener.enterLiteral(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitLiteral) {
      listener.exitLiteral(this);
    }
  }
}

export class AttributesContext extends ParserRuleContext {
  constructor(
    parser?: AIDLParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public annotation_list(): AnnotationContext[] {
    return this.getTypedRuleContexts(AnnotationContext) as AnnotationContext[];
  }
  public annotation(i: number): AnnotationContext {
    return this.getTypedRuleContext(AnnotationContext, i) as AnnotationContext;
  }
  public get ruleIndex(): number {
    return AIDLParser.RULE_attributes;
  }
  public enterRule(listener: AIDLListener): void {
    if (listener.enterAttributes) {
      listener.enterAttributes(this);
    }
  }
  public exitRule(listener: AIDLListener): void {
    if (listener.exitAttributes) {
      listener.exitAttributes(this);
    }
  }
}
