import {Condition} from './condition';

export class ConditionJSONSerialiser {
  static toJSON(conditions: Condition[]) {
    if (conditions.length == 0) {
      return undefined;
    }
    const result: { [test: string]: {[key: string]: string[]}} = {};
    conditions.forEach((condition) => {
      const obj = condition.toJSON();
      Object.keys(obj).forEach((key) => {
        result[key] = obj[key];
      });
    });
    return result;
  }
}
