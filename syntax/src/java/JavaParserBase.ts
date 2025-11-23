// https://github.com/antlr/grammars-v4/blob/master/java/java/Java/JavaParserBase.java
import { Parser, type TokenStream } from 'antlr4';
import JavaParser, { RecordComponentListContext } from './JavaParser';

export default abstract class JavaParserBase extends Parser {
  constructor(input: TokenStream) {
    super(input);
  }
  public DoLastRecordComponent(): boolean {
    const ctx = this._ctx;
    if (!(ctx instanceof RecordComponentListContext)) {
      return true; // or throw if this is an unexpected state
    }
    const tctx = ctx as RecordComponentListContext;
    const rcs = tctx.recordComponent_list();
    if (rcs.length === 0) {
      return true;
    }
    const count = rcs.length;
    for (let c = 0; c < count; c++) {
      const rc = rcs[c];
      if (rc.ELLIPSIS() != null && c + 1 < count) {
        return false;
      }
    }
    return true;
  }
  public IsNotIdentifierAssign(): boolean {
    const la = this._input.LA(1);
    // If not identifier, return true because it can't be "identifier = ..."
    switch (la) {
      case JavaParser.IDENTIFIER:
      case JavaParser.MODULE:
      case JavaParser.OPEN:
      case JavaParser.REQUIRES:
      case JavaParser.EXPORTS:
      case JavaParser.OPENS:
      case JavaParser.TO:
      case JavaParser.USES:
      case JavaParser.PROVIDES:
      case JavaParser.WHEN:
      case JavaParser.WITH:
      case JavaParser.TRANSITIVE:
      case JavaParser.YIELD:
      case JavaParser.SEALED:
      case JavaParser.PERMITS:
      case JavaParser.RECORD:
      case JavaParser.VAR:
        break;
      default:
        return true;
    }
    const la2 = this._input.LA(2);
    if (la2 != JavaParser.ASSIGN) return true;
    return false;
  }
}
