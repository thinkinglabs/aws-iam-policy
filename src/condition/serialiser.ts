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
        if (key in result) {
          Object.keys(obj[key]).forEach((subKey) => {
            result[key][subKey] = obj[key][subKey];
          });
        } else {
          result[key] = obj[key];
        }
      });
    });
    return result;
  }
}
