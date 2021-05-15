import {Condition} from './condition';

export class ConditionJSONSerialiser {
  static toJSON(conditions: Condition[]) {
    if (conditions.length == 0) {
      return undefined;
    }
    return merge(conditions);

    function merge(conditions: Condition[]) {
      const result: { [operator: string]: {[key: string]: string[]}} = {};

      conditions.forEach((condition) => {
        const json = condition.toJSON();

        Object.keys(json).forEach((operator) => {
          mergeOperator(result, json, operator);
        });
      });
      return result;
    }

    function mergeOperator(
        result: {[operator: string]: {[key: string]: string[]}},
        json: {[operator: string]: {[key: string]: string[]}},
        operator: string,
    ) {
      const jsonOperator = json[operator];
      if (operator in result) {
        Object.keys(jsonOperator).forEach((key) => {
          mergeKey(result[operator], jsonOperator, key);
        });
      } else {
        result[operator] = jsonOperator;
      }
    }

    function mergeKey(
        resultOperator: {[key:string]: string[]},
        jsonOperator: {[key:string]: string[]},
        key: string,
    ) {
      const values = jsonOperator[key];
      if (key in resultOperator) {
        resultOperator[key].push(...values);
      } else {
        resultOperator[key] = values;
      }
    }
  }
}
