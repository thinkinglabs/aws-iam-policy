import {Condition} from './condition';

export class ConditionJSONSerialiser {
  static toJSON(conditions: Condition[]) {
    if (conditions.length == 0) {
      return undefined;
    }
    return [];
  }
}
