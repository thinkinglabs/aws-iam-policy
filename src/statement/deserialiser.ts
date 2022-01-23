import {ConditionJSONDeserialiser} from '../condition/deserialiser';
import {PrincipalJSONDeserialiser} from '../principals/deserialiser';
import {Statement} from '../statement/statement';

export class StatementJSONDeserialiser {
  static fromJSON(obj: any) {
    return new Statement({
      sid: obj.Sid,
      effect: obj.Effect,
      principals: PrincipalJSONDeserialiser.fromJSON(obj.Principal),
      actions: parseArray(obj.Action),
      resources: parseArray(obj.Resource),
      conditions: ConditionJSONDeserialiser.fromJSON(obj.Condition),
    });

    function parseArray(obj: any): string[] {
      if (obj === undefined) {
        return [];
      }
      if (typeof obj === 'string') {
        return [obj];
      }
      if (Array.isArray(obj)) {
        if (isArrayOfStrings(obj)) {
          return obj;
        }
        throw new Error('Unsupported type: expecting an array of strings');
      }
      throw new Error('Unsupported type: expecting an array or a string');
    }

    function isArrayOfStrings(obj: any[]) {
      return obj.every((element) => typeof element === 'string');
    }
  }
}
