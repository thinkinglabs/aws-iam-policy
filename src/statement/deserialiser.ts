import {ConditionJSONDeserialiser} from '../condition/deserialiser';
import {PrincipalJSONDeserialiser} from '../principals/deserialiser';
import {Statement} from '../statement/statement';
import {parseArray} from '../arrays';

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
  }
}
