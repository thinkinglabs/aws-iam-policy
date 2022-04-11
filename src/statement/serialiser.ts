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
      NotPrincipal: PrincipalJSONSerialiser.toJSON(statement.notprincipals),
      Action: normalise(statement.actions),
      NotAction: normalise(statement.notactions),
      Resource: normalise(statement.resources),
      NotResource: normalise(statement.notresources),
      Condition: ConditionJSONSerialiser.toJSON(statement.conditions),
    };
  }
}
