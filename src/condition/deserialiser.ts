import {Condition} from './condition';

export class ConditionJSONDeserialiser {
  static fromJSON(
      input: {[condition:string]: {[key:string]: string[]}} | undefined,
  ): Condition[] {
    if (input === undefined) {
      return [];
    }
    const operator = Object.keys(input)[0];

    const result: Condition[] = [];
    Object.keys(input[operator]).forEach((key) => {
      const values = input[operator][key];
      result.push(new Condition(operator, key, values));
    });
    return result;
  };
}
