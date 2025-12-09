import { CharStream, CommonTokenStream, ParseTreeWalker } from 'antlr4';
import AIDLLexer from './AIDLLexer';
import AIDLListener from './AIDLListener';
import AIDLParser from './AIDLParser';
import { useStructEditor, type ClassStruct } from '../share';

export const getAIDLStructList = (text: string): ClassStruct[] => {
  const chars = new CharStream(text);
  const lexer = new AIDLLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new AIDLParser(tokens);
  const result = parser.compilationUnit();
  if (result.exception) {
    throw result.exception;
  }
  const listener = new AIDLListener();
  const { addMember, enterStruct, exitStruct, structs, clearUseless } =
    useStructEditor();
  listener.enterInterfaceDeclaration = (ctx) => {
    enterStruct(ctx.IDENTIFIER().getText());
  };
  listener.exitInterfaceDeclaration = exitStruct;
  listener.enterMethodDeclaration = (ctx) => {
    const id = ctx.IDENTIFIER();
    const name = id.getText();
    const returnType = ctx.type_().getText();
    const paramTypeList = (ctx.parameterList()?.parameter_list() || []).map(
      (p) => {
        return p.type_().getText();
      },
    );
    const type = `(${paramTypeList.join(', ')}) -> ${returnType}`;
    addMember({
      name,
      type,
      loc: id.symbol.line,
    });
  };
  listener.enterConstantDeclaration = (ctx) => {
    const id = ctx.constDeclaration().IDENTIFIER();
    const name = id.getText();
    const type = ctx.constDeclaration().type_().getText();
    addMember({
      name,
      type,
      loc: id.symbol.line,
    });
  };
  ParseTreeWalker.DEFAULT.walk(listener, result);
  clearUseless();
  return structs;
};
