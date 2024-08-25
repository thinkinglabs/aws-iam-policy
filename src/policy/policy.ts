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

  validate(policyType?: PolicyType) {
    const errors: string[] = [];
    this.statements.forEach((stmt) => {
      errors.push(...stmt.validateForAnyPolicy());
    });
    if (policyType === undefined) {
      return errors;
    }
    if (policyType === PolicyType.IAM) {
      this.statements.forEach((stmt) => {
        errors.push(...stmt.validateForIdentityPolicy());
      });
      const doc = this.json;
      if (doc.length > 6144) {
        errors.push(`The size of an IAM policy document (${doc.length}) should not exceed 6.144 characters.`);
      }
    }
    if (policyType === PolicyType.KMS ||
        policyType === PolicyType.S3 ||
        policyType === PolicyType.SecretsManager) {
      this.statements.forEach((stmt) => {
        errors.push(...stmt.validateForResourcePolicy());
      });
      const doc = this.json;
      if (policyType === PolicyType.KMS && doc.length > 32*1024) {
        errors.push(`The size of a KMS key policy document (${doc.length}) should not exceed 32kB.`);
      }
    }
    return errors;
  }
}

export enum PolicyType {
  IAM,
  KMS,
  S3,
  SecretsManager,
}
