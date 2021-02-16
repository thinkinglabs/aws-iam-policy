import {IAMPolicyStatement} from './statement';
import {normalise} from '../normaliser';
import {PrincipalJSONSerialiser} from '../principals/serialiser';

class IAMPolicyStatementJSONSerialiser {
  static toJSON(statement: IAMPolicyStatement) {
    return {
      Sid: normalise(statement.sid),
      Effect: normalise(statement.effect),
      Principal: PrincipalJSONSerialiser.toJSON(statement.principals),
      Action: normalise(statement.actions),
      Resource: normalise(statement.resources),
      Condition: normalise(statement.conditions),
    };
  }
}

export {IAMPolicyStatementJSONSerialiser};
