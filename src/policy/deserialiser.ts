import {IAMPolicyStatement} from '../statement/statement';
import {IAMPolicy} from './policy';

class IAMPolicyJSONDeserialiser {
  static fromJSON(obj: any) {
    const statements = obj.Statement;
    if (statements === undefined) {
      return new IAMPolicy();
    }
    if (!Array.isArray(statements)) {
      throw new Error('Unexpected type: Statement must be an array');
    }

    const result = new IAMPolicy({
      statements: statements.map((statement: any) => IAMPolicyStatement.fromJSON(statement)),
    });
    return result;
  }
}

export {IAMPolicyJSONDeserialiser};
