import {Statement} from './statement';
import {normalise} from '../normaliser';
import {ConditionJSONSerialiser} from '../condition/serialiser';
import {PrincipalJSONSerialiser} from '../principals/serialiser';

export class StatementJSONSerialiser {
  static toJSON(statement: Statement) {
    return {
      Sid: normalise(statement.sid),
      Effect: normalise(statement.effect),
      Principal: PrincipalJSONSerialiser.toJSON(statement.principals),
      Action: normalise(statement.actions),
      Resource: normalise(statement.resources),
      Condition: ConditionJSONSerialiser.toJSON(statement.conditions),
    };
  }
}
