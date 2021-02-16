import {IAMPolicy} from './policy';

class IAMPolicyJSONSerialiser {
  static toJSON(policy: IAMPolicy) {
    if (policy.isEmpty) {
      return undefined;
    }
    return {
      Statement: policy.statements.map((stmt) => stmt.toJSON()),
      Version: '2012-10-17',
    };
  }
}

export {IAMPolicyJSONSerialiser};
