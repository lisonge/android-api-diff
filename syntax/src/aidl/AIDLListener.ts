// Generated from ./src/grammar/AIDL.g4 by ANTLR 4.13.2

import { ParseTreeListener } from 'antlr4';

import { CompilationUnitContext } from './AIDLParser.js';
import { PackageDeclarationContext } from './AIDLParser.js';
import { ImportDeclarationContext } from './AIDLParser.js';
import { TypeDeclarationContext } from './AIDLParser.js';
import { InterfaceDeclarationContext } from './AIDLParser.js';
import { InterfaceBodyContext } from './AIDLParser.js';
import { NestedTypeDeclarationContext } from './AIDLParser.js';
import { ParcelableDeclarationContext } from './AIDLParser.js';
import { ParcelableBodyContext } from './AIDLParser.js';
import { LanguageHeadersContext } from './AIDLParser.js';
import { LanguageHeaderContext } from './AIDLParser.js';
import { FieldDeclarationContext } from './AIDLParser.js';
import { VariableDeclaratorsContext } from './AIDLParser.js';
import { VariableDeclaratorContext } from './AIDLParser.js';
import { EnumDeclarationContext } from './AIDLParser.js';
import { EnumConstantContext } from './AIDLParser.js';
import { ConstDeclarationContext } from './AIDLParser.js';
import { ConstantDeclarationContext } from './AIDLParser.js';
import { MethodDeclarationContext } from './AIDLParser.js';
import { ParameterListContext } from './AIDLParser.js';
import { ParameterContext } from './AIDLParser.js';
import { DirectionContext } from './AIDLParser.js';
import { AnnotationContext } from './AIDLParser.js';
import { AnnotationValuesContext } from './AIDLParser.js';
import { AnnotationValueContext } from './AIDLParser.js';
import { AnnotationArrayContext } from './AIDLParser.js';
import { TypeContext } from './AIDLParser.js';
import { PrimitiveTypeContext } from './AIDLParser.js';
import { GenericTypeContext } from './AIDLParser.js';
import { TypeArgumentContext } from './AIDLParser.js';
import { TypeListContext } from './AIDLParser.js';
import { QualifiedNameContext } from './AIDLParser.js';
import { ExpressionContext } from './AIDLParser.js';
import { LogicalOrExpressionContext } from './AIDLParser.js';
import { LogicalAndExpressionContext } from './AIDLParser.js';
import { BitwiseOrExpressionContext } from './AIDLParser.js';
import { BitwiseXorExpressionContext } from './AIDLParser.js';
import { BitwiseAndExpressionContext } from './AIDLParser.js';
import { EqualityExpressionContext } from './AIDLParser.js';
import { RelationalExpressionContext } from './AIDLParser.js';
import { ShiftExpressionContext } from './AIDLParser.js';
import { AdditiveExpressionContext } from './AIDLParser.js';
import { MultiplicativeExpressionContext } from './AIDLParser.js';
import { UnaryExpressionContext } from './AIDLParser.js';
import { PrimaryExpressionContext } from './AIDLParser.js';
import { LiteralContext } from './AIDLParser.js';
import { AttributesContext } from './AIDLParser.js';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `AIDLParser`.
 */
export default class AIDLListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `AIDLParser.compilationUnit`.
   * @param ctx the parse tree
   */
  enterCompilationUnit?: (ctx: CompilationUnitContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.compilationUnit`.
   * @param ctx the parse tree
   */
  exitCompilationUnit?: (ctx: CompilationUnitContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.packageDeclaration`.
   * @param ctx the parse tree
   */
  enterPackageDeclaration?: (ctx: PackageDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.packageDeclaration`.
   * @param ctx the parse tree
   */
  exitPackageDeclaration?: (ctx: PackageDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.importDeclaration`.
   * @param ctx the parse tree
   */
  enterImportDeclaration?: (ctx: ImportDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.importDeclaration`.
   * @param ctx the parse tree
   */
  exitImportDeclaration?: (ctx: ImportDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.typeDeclaration`.
   * @param ctx the parse tree
   */
  enterTypeDeclaration?: (ctx: TypeDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.typeDeclaration`.
   * @param ctx the parse tree
   */
  exitTypeDeclaration?: (ctx: TypeDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.interfaceDeclaration`.
   * @param ctx the parse tree
   */
  enterInterfaceDeclaration?: (ctx: InterfaceDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.interfaceDeclaration`.
   * @param ctx the parse tree
   */
  exitInterfaceDeclaration?: (ctx: InterfaceDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.interfaceBody`.
   * @param ctx the parse tree
   */
  enterInterfaceBody?: (ctx: InterfaceBodyContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.interfaceBody`.
   * @param ctx the parse tree
   */
  exitInterfaceBody?: (ctx: InterfaceBodyContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.nestedTypeDeclaration`.
   * @param ctx the parse tree
   */
  enterNestedTypeDeclaration?: (ctx: NestedTypeDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.nestedTypeDeclaration`.
   * @param ctx the parse tree
   */
  exitNestedTypeDeclaration?: (ctx: NestedTypeDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.parcelableDeclaration`.
   * @param ctx the parse tree
   */
  enterParcelableDeclaration?: (ctx: ParcelableDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.parcelableDeclaration`.
   * @param ctx the parse tree
   */
  exitParcelableDeclaration?: (ctx: ParcelableDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.parcelableBody`.
   * @param ctx the parse tree
   */
  enterParcelableBody?: (ctx: ParcelableBodyContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.parcelableBody`.
   * @param ctx the parse tree
   */
  exitParcelableBody?: (ctx: ParcelableBodyContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.languageHeaders`.
   * @param ctx the parse tree
   */
  enterLanguageHeaders?: (ctx: LanguageHeadersContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.languageHeaders`.
   * @param ctx the parse tree
   */
  exitLanguageHeaders?: (ctx: LanguageHeadersContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.languageHeader`.
   * @param ctx the parse tree
   */
  enterLanguageHeader?: (ctx: LanguageHeaderContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.languageHeader`.
   * @param ctx the parse tree
   */
  exitLanguageHeader?: (ctx: LanguageHeaderContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.fieldDeclaration`.
   * @param ctx the parse tree
   */
  enterFieldDeclaration?: (ctx: FieldDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.fieldDeclaration`.
   * @param ctx the parse tree
   */
  exitFieldDeclaration?: (ctx: FieldDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.variableDeclarators`.
   * @param ctx the parse tree
   */
  enterVariableDeclarators?: (ctx: VariableDeclaratorsContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.variableDeclarators`.
   * @param ctx the parse tree
   */
  exitVariableDeclarators?: (ctx: VariableDeclaratorsContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.variableDeclarator`.
   * @param ctx the parse tree
   */
  enterVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.variableDeclarator`.
   * @param ctx the parse tree
   */
  exitVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.enumDeclaration`.
   * @param ctx the parse tree
   */
  enterEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.enumDeclaration`.
   * @param ctx the parse tree
   */
  exitEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.enumConstant`.
   * @param ctx the parse tree
   */
  enterEnumConstant?: (ctx: EnumConstantContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.enumConstant`.
   * @param ctx the parse tree
   */
  exitEnumConstant?: (ctx: EnumConstantContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.constDeclaration`.
   * @param ctx the parse tree
   */
  enterConstDeclaration?: (ctx: ConstDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.constDeclaration`.
   * @param ctx the parse tree
   */
  exitConstDeclaration?: (ctx: ConstDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.constantDeclaration`.
   * @param ctx the parse tree
   */
  enterConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.constantDeclaration`.
   * @param ctx the parse tree
   */
  exitConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.methodDeclaration`.
   * @param ctx the parse tree
   */
  enterMethodDeclaration?: (ctx: MethodDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.methodDeclaration`.
   * @param ctx the parse tree
   */
  exitMethodDeclaration?: (ctx: MethodDeclarationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.parameterList`.
   * @param ctx the parse tree
   */
  enterParameterList?: (ctx: ParameterListContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.parameterList`.
   * @param ctx the parse tree
   */
  exitParameterList?: (ctx: ParameterListContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.parameter`.
   * @param ctx the parse tree
   */
  enterParameter?: (ctx: ParameterContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.parameter`.
   * @param ctx the parse tree
   */
  exitParameter?: (ctx: ParameterContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.direction`.
   * @param ctx the parse tree
   */
  enterDirection?: (ctx: DirectionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.direction`.
   * @param ctx the parse tree
   */
  exitDirection?: (ctx: DirectionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.annotation`.
   * @param ctx the parse tree
   */
  enterAnnotation?: (ctx: AnnotationContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.annotation`.
   * @param ctx the parse tree
   */
  exitAnnotation?: (ctx: AnnotationContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.annotationValues`.
   * @param ctx the parse tree
   */
  enterAnnotationValues?: (ctx: AnnotationValuesContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.annotationValues`.
   * @param ctx the parse tree
   */
  exitAnnotationValues?: (ctx: AnnotationValuesContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.annotationValue`.
   * @param ctx the parse tree
   */
  enterAnnotationValue?: (ctx: AnnotationValueContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.annotationValue`.
   * @param ctx the parse tree
   */
  exitAnnotationValue?: (ctx: AnnotationValueContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.annotationArray`.
   * @param ctx the parse tree
   */
  enterAnnotationArray?: (ctx: AnnotationArrayContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.annotationArray`.
   * @param ctx the parse tree
   */
  exitAnnotationArray?: (ctx: AnnotationArrayContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.type`.
   * @param ctx the parse tree
   */
  enterType?: (ctx: TypeContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.type`.
   * @param ctx the parse tree
   */
  exitType?: (ctx: TypeContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.primitiveType`.
   * @param ctx the parse tree
   */
  enterPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.primitiveType`.
   * @param ctx the parse tree
   */
  exitPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.genericType`.
   * @param ctx the parse tree
   */
  enterGenericType?: (ctx: GenericTypeContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.genericType`.
   * @param ctx the parse tree
   */
  exitGenericType?: (ctx: GenericTypeContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.typeArgument`.
   * @param ctx the parse tree
   */
  enterTypeArgument?: (ctx: TypeArgumentContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.typeArgument`.
   * @param ctx the parse tree
   */
  exitTypeArgument?: (ctx: TypeArgumentContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.typeList`.
   * @param ctx the parse tree
   */
  enterTypeList?: (ctx: TypeListContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.typeList`.
   * @param ctx the parse tree
   */
  exitTypeList?: (ctx: TypeListContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.qualifiedName`.
   * @param ctx the parse tree
   */
  enterQualifiedName?: (ctx: QualifiedNameContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.qualifiedName`.
   * @param ctx the parse tree
   */
  exitQualifiedName?: (ctx: QualifiedNameContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.logicalOrExpression`.
   * @param ctx the parse tree
   */
  enterLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.logicalOrExpression`.
   * @param ctx the parse tree
   */
  exitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.logicalAndExpression`.
   * @param ctx the parse tree
   */
  enterLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.logicalAndExpression`.
   * @param ctx the parse tree
   */
  exitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.bitwiseOrExpression`.
   * @param ctx the parse tree
   */
  enterBitwiseOrExpression?: (ctx: BitwiseOrExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.bitwiseOrExpression`.
   * @param ctx the parse tree
   */
  exitBitwiseOrExpression?: (ctx: BitwiseOrExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.bitwiseXorExpression`.
   * @param ctx the parse tree
   */
  enterBitwiseXorExpression?: (ctx: BitwiseXorExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.bitwiseXorExpression`.
   * @param ctx the parse tree
   */
  exitBitwiseXorExpression?: (ctx: BitwiseXorExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.bitwiseAndExpression`.
   * @param ctx the parse tree
   */
  enterBitwiseAndExpression?: (ctx: BitwiseAndExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.bitwiseAndExpression`.
   * @param ctx the parse tree
   */
  exitBitwiseAndExpression?: (ctx: BitwiseAndExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.equalityExpression`.
   * @param ctx the parse tree
   */
  enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.equalityExpression`.
   * @param ctx the parse tree
   */
  exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.relationalExpression`.
   * @param ctx the parse tree
   */
  enterRelationalExpression?: (ctx: RelationalExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.relationalExpression`.
   * @param ctx the parse tree
   */
  exitRelationalExpression?: (ctx: RelationalExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.shiftExpression`.
   * @param ctx the parse tree
   */
  enterShiftExpression?: (ctx: ShiftExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.shiftExpression`.
   * @param ctx the parse tree
   */
  exitShiftExpression?: (ctx: ShiftExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.additiveExpression`.
   * @param ctx the parse tree
   */
  enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.additiveExpression`.
   * @param ctx the parse tree
   */
  exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.multiplicativeExpression`.
   * @param ctx the parse tree
   */
  enterMultiplicativeExpression?: (
    ctx: MultiplicativeExpressionContext,
  ) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.multiplicativeExpression`.
   * @param ctx the parse tree
   */
  exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.unaryExpression`.
   * @param ctx the parse tree
   */
  enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.unaryExpression`.
   * @param ctx the parse tree
   */
  exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.primaryExpression`.
   * @param ctx the parse tree
   */
  enterPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.primaryExpression`.
   * @param ctx the parse tree
   */
  exitPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.literal`.
   * @param ctx the parse tree
   */
  enterLiteral?: (ctx: LiteralContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.literal`.
   * @param ctx the parse tree
   */
  exitLiteral?: (ctx: LiteralContext) => void;
  /**
   * Enter a parse tree produced by `AIDLParser.attributes`.
   * @param ctx the parse tree
   */
  enterAttributes?: (ctx: AttributesContext) => void;
  /**
   * Exit a parse tree produced by `AIDLParser.attributes`.
   * @param ctx the parse tree
   */
  exitAttributes?: (ctx: AttributesContext) => void;
}
