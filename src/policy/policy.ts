import {PolicyDocumentJSONSerialiser} from './serialiser';
import {IAMPolicyStatement} from '../statement/statement';
import {SidUniquenessValidator} from './sid-uniqueness';

export class PolicyDocument {
  public statements: IAMPolicyStatement[] = [];

  constructor(props?: PolicyDocumentArgs) {
    this.addStatements(...props?.statements || []);
  }

  get isEmpty() {
    return this.statementCount === 0;
  }

  get statementCount() {
    return this.statements.length;
  }

  private addStatements(...statements: IAMPolicyStatement[]) {
    statements.forEach((statement) => {
      if (!new SidUniquenessValidator(this.statements).validate(statement)) {
        throw new Error(`Non-unique Sid "${statement.sid}"`);
      }
      this.statements.push(statement);
    });
  }

  getStatement(sid: string): IAMPolicyStatement | undefined {
    return this.statements.find((stmt) => stmt.sid === sid);
  }

  toJSON() {
    return PolicyDocumentJSONSerialiser.toJSON(this);
  }

  static fromJSON(obj: any) {
    const result = new PolicyDocument();
    const statements = obj.Statement;
    if (statements && !Array.isArray(statements)) {
      throw new Error('Statement must be an array');
    }
    result.addStatements(...statements.map((statement: any) => IAMPolicyStatement.fromJSON(statement)));
    return result;
  }

  validateForAnyPolicy() {
    const errors: string[] = [];
    this.statements.forEach((stmt) => {
      errors.push(...stmt.validateForAnyPolicy());
    });
    return errors;
  }

  validateForResourcePolicy() {
    const errors: string[] = [];
    this.statements.forEach((stmt) => {
      errors.push(...stmt.validateForResourcePolicy());
    });
    return errors;
  }

  validateForIdentityPolicy() {
    const errors: string[] = [];
    this.statements.forEach((stmt) => {
      errors.push(...stmt.validateForIdentityPolicy());
    });
    return errors;
  }
}

interface PolicyDocumentArgs {
  readonly statements?: IAMPolicyStatement[];
}
