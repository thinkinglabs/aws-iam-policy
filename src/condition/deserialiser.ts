import {Condition} from './condition';

export class ConditionJSONDeserialiser {
  static fromJSON(
      input: {[condition:string]: {[key:string]: string[]}} | undefined,
  ): Condition[] {
    if (input === undefined) {
      return [];
    }
    const result: Condition[] = [];

    Object.keys(input).forEach((operator) => {
      Object.keys(input[operator]).forEach((key) => {
        const values = input[operator][key];
        result.push(new Condition(operator, key, values));
      });
    });

    return result;
  };
}
