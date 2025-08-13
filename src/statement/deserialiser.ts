import {ConditionJSONDeserialiser} from '../condition/deserialiser';
import {PrincipalJSONDeserialiser} from '../principals/deserialiser';
import {Statement} from '../statement/statement';
import {parseArray} from '../arrays';

export class StatementJSONDeserialiser {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  static fromJSON(obj: any) {
    return new Statement({
      sid: obj.Sid,
      effect: obj.Effect,
      principals: PrincipalJSONDeserialiser.fromJSON(obj.Principal),
      notprincipals: PrincipalJSONDeserialiser.fromJSON(obj.NotPrincipal),
      actions: parseArray(obj.Action),
      notactions: parseArray(obj.NotAction),
      resources: parseArray(obj.Resource),
      notresources: parseArray(obj.NotResource),
      conditions: ConditionJSONDeserialiser.fromJSON(obj.Condition),
    });
  }
}
