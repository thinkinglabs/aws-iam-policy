import {PolicyDocument} from './policy';

export class PolicyDocumentJSONSerialiser {
  static toJSON(policy: PolicyDocument) {
    if (policy.isEmpty) {
      return undefined;
    }
    return {
      Statement: policy.statements.map((stmt) => stmt.toJSON()),
      Version: '2012-10-17',
    };
  }
}
