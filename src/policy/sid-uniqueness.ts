import {IAMPolicyStatement} from '../statement/statement';

class SidUniquenessValidator {
  private statements: IAMPolicyStatement[];
  constructor(statements: IAMPolicyStatement[]) {
    this.statements = statements;
  }

  validate(newStatement: IAMPolicyStatement) {
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
