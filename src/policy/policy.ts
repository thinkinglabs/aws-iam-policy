import {PolicyDocumentJSONSerialiser} from './serialiser';
import {Statement} from '../statement/statement';
import {SidUniquenessValidator} from './sid-uniqueness';

export class PolicyDocument {
  public statements: Statement[] = [];

  constructor(statements?: Statement[]) {
    this.addStatements(...statements || []);
  }

  get isEmpty() {
    return this.statementCount === 0;
  }

  get statementCount() {
    return this.statements.length;
  }

  public addStatements(...statements: Statement[]) {
    statements.forEach((statement) => {
      if (!new SidUniquenessValidator(this.statements).validate(statement)) {
        throw new Error(`Non-unique Sid "${statement.sid}"`);
      }
      this.statements.push(statement);
    });
  }

  getStatement(sid: string): Statement | undefined {
    return this.statements.find((stmt) => stmt.sid === sid);
  }

  get object() {
    return PolicyDocumentJSONSerialiser.toJSON(this);
  }

  get json() {
    return JSON.stringify(this.object);
  }

  static fromJson(json: string) {
    const obj = JSON.parse(json);
    const result = new PolicyDocument();
    const statements = obj.Statement;
    if (statements && !Array.isArray(statements)) {
      throw new Error('Statement must be an array');
    }
    result.addStatements(...statements.map((statement: any) => Statement.fromJSON(statement)));
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
