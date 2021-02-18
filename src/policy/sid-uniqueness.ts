import {Statement} from '../statement/statement';

class SidUniquenessValidator {
  private statements: Statement[];
  constructor(statements: Statement[]) {
    this.statements = statements;
  }

  validate(newStatement: Statement) {
    if (newStatement.sid === undefined) {
      return true;
    }
    const found = this.statements.find((stmt) => {
      return stmt.sid !== undefined &&
        stmt.sid === newStatement.sid;
    });
    return found === undefined;
  }
}

export {SidUniquenessValidator};
