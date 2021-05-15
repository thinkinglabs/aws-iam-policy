import {Condition} from './condition';

export class ConditionJSONSerialiser {
  static toJSON(conditions: Condition[]) {
    if (conditions.length == 0) {
      return undefined;
    }
    return merge(conditions);

    function merge(conditions: Condition[]) {
      const result: { [test: string]: {[key: string]: string[]}} = {};

      conditions.forEach((condition) => {
        const json = condition.toJSON();

        Object.keys(json).forEach((test) => {
          mergeTest(result, json, test);
        });
      });
      return result;
    }

    function mergeTest(
        result: {[test: string]: {[key: string]: string[]}},
        json: {[test: string]: {[key: string]: string[]}},
        test: string,
    ) {
      const jsonTest = json[test];
      if (test in result) {
        Object.keys(jsonTest).forEach((key) => {
          mergeKey(result[test], jsonTest, key);
        });
      } else {
        result[test] = jsonTest;
      }
    }

    function mergeKey(
        resultTest: {[key:string]: string[]},
        jsonTest: {[key:string]: string[]},
        key: string,
    ) {
      const values = jsonTest[key];
      if (key in resultTest) {
        resultTest[key].push(...values);
      } else {
        resultTest[key] = values;
      }
    }
  }
}
