import {PolicyDocumentJSONSerialiser} from './serialiser';
import {PolicyDocumentJSONDeserialiser} from './deserialiser';
import {Statement} from '../statement/statement';
import {SidUniquenessValidator} from './sid-uniqueness';

export class PolicyDocument {
  private _id?: string;
  private _statements: Statement[] = [];

  constructor(statements?: Statement[], id?: string) {
    this.addStatements(...statements || []);
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get isEmpty() {
    return this.statementCount === 0;
  }

  get statements() {
    return this._statements;
  }

  get statementCount() {
    return this._statements.length;
  }

  public addStatements(...statements: Statement[]) {
    statements.forEach((statement) => {
      if (!new SidUniquenessValidator(this._statements).validate(statement)) {
        throw new Error(`Non-unique Sid "${statement.sid}"`);
      }
      this._statements.push(statement);
    });
  }

  getStatement(sid: string): Statement | undefined {
    return this._statements.find((stmt) => stmt.sid === sid);
  }


  get object() {
    return PolicyDocumentJSONSerialiser.toJSON(this);
  }

  get json() {
    return JSON.stringify(this.object);
  }

  static fromJson(json: string) {
    const obj = JSON.parse(json);
    return PolicyDocumentJSONDeserialiser.fromJSON(obj);
  }

  validate(policyType?: PolicyType) {
    const errors: string[] = [];
    this._statements.forEach((stmt) => {
      errors.push(...stmt.validateForAnyPolicy());
    });
    if (policyType === undefined) {
      return errors;
    }
    if (policyType === PolicyType.IAM) {
      if (this._id) {
        errors.push('Policy Id is not allowed for identity-based policies');
      }

      this._statements.forEach((stmt) => {
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
      this._statements.forEach((stmt) => {
        errors.push(...stmt.validateForResourcePolicy(policyType));
      });
      const doc = this.json;
      if (policyType === PolicyType.KMS && doc.length > 32*1024) {
        errors.push(`The size of a KMS key policy document (${doc.length}) should not exceed 32kB.`);
      }
      if (policyType === PolicyType.S3 && doc.length > 20*1024) {
        errors.push(`The size of an S3 bucket policy document (${doc.length}) should not exceed 20kB.`);
      }
      if (policyType === PolicyType.SecretsManager && doc.length > 20*1024) {
        errors.push(`The size of a SecretsManager secret policy document (${doc.length}) should not exceed 20kB.`);
      }
    }
    return errors;
  }
}

/* eslint-disable no-unused-vars */
export enum PolicyType {
  IAM,
  KMS,
  S3,
  SecretsManager,
}
/* eslint-enable no-unused-vars */
