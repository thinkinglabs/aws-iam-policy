import {Condition} from './condition';

export class ConditionJSONSerialiser {
  static toJSON(condition: Condition) {
    const result: { [operator: string]: { [key:string]: string[] }; } = {};
    result[condition.operator] = {};
    result[condition.operator][condition.key] = condition.values;
    return result;
  }
}
