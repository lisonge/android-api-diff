import {
  CharStream,
  CommonTokenStream,
  ParseTreeWalker,
  type ParseTree,
} from 'antlr4';
import { useStructEditor, type ClassStruct } from '../share';
import JavaLexer from './JavaLexer';
import JavaParser, {
  FormalParameterContext,
  FormalParameterListContext,
  ReceiverParameterContext,
} from './JavaParser';
import JavaListener from './JavaParserListener';

const getParamTypeList = (nodes: ParseTree[] | undefined | null): string[] => {
  if (!nodes?.length) return [];
  return nodes
    .map((v) => {
      if (v instanceof ReceiverParameterContext) {
        return v.typeType().getText();
      } else if (v instanceof FormalParameterContext) {
        return v.typeType().getText();
      } else if (v instanceof FormalParameterListContext) {
        return getParamTypeList(v.children);
      }
      return '';
    })
    .filter(Boolean)
    .flat();
};

export const getJavaStructList = (text: string): ClassStruct[] => {
  const chars = new CharStream(text);
  const lexer = new JavaLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new JavaParser(tokens);
  const result = parser.compilationUnit();
  if (result.exception) {
    throw result.exception;
  }
  const listener = new JavaListener();
  const { addMember, enterStruct, exitStruct, structs, clearUseless } =
    useStructEditor();
  listener.enterClassDeclaration = (ctx) => {
    enterStruct(ctx.identifier().getText());
  };
  listener.exitClassDeclaration = exitStruct;
  listener.enterConstructorDeclaration = (ctx) => {
    const id = ctx.identifier();
    const name = id.getText();
    const paramTypeList = getParamTypeList(ctx.formalParameters().children);
    const type = `(${paramTypeList.join(', ')}) -> ` + name;
    addMember({
      name,
      type,
      loc: id.start.line,
      parameterCount: paramTypeList.length,
    });
  };
  listener.enterMethodDeclaration = (ctx) => {
    const id = ctx.identifier();
    const name = id.getText();
    const returnType = ctx.typeTypeOrVoid().getText();
    const paramTypeList = getParamTypeList(ctx.formalParameters().children);
    const type = `(${paramTypeList.join(', ')}) -> ${returnType}`;
    ctx.start.line;
    addMember({
      name,
      type,
      loc: id.start.line,
      parameterCount: paramTypeList.length,
    });
  };
  listener.enterFieldDeclaration = (ctx) => {
    const id = ctx
      .variableDeclarators()
      .variableDeclarator(0)
      .variableDeclaratorId()
      .identifier();
    const name = id.getText();
    const type = ctx.typeType().getText();
    addMember({
      name,
      type,
      loc: id.start.line,
    });
  };
  listener.enterInterfaceDeclaration = (ctx) => {
    enterStruct(ctx.identifier().getText());
  };
  listener.exitInterfaceDeclaration = exitStruct;
  listener.enterInterfaceMethodDeclaration = (ctx) => {
    const b = ctx.interfaceCommonBodyDeclaration();
    const id = b.identifier();
    const name = id.getText();
    const returnType = b.typeTypeOrVoid().getText();
    const paramTypeList = getParamTypeList(b.formalParameters().children);
    const type = `(${paramTypeList.join(', ')}) -> ${returnType}`;
    addMember({
      name,
      type,
      loc: id.start.line,
      parameterCount: paramTypeList.length,
    });
  };
  listener.enterConstDeclaration = (ctx) => {
    const id = ctx.constantDeclarator(0).identifier();
    const name = id.getText();
    const type = ctx.typeType().getText();
    addMember({
      name,
      type,
      loc: id.start.line,
    });
  };
  ParseTreeWalker.DEFAULT.walk(listener, result);
  clearUseless();
  return structs;
};
