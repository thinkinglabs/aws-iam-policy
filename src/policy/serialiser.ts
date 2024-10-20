import {PolicyDocument} from './policy';

export class PolicyDocumentJSONSerialiser {
  static toJSON(policy: PolicyDocument) {
    if (policy.isEmpty) {
      return undefined;
    }
    return {
      Version: '2012-10-17',
      ...(policy.id ? {Id: policy.id} : {}),
      Statement: policy.statements.map((stmt) => stmt.toJSON()),
    };
  }
}
