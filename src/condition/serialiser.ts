import {Condition} from './condition';

export class ConditionJSONSerialiser {
  static toJSON(condition: Condition) {
    return condition.toJSON();
  }
}
