import {Condition} from './condition';

export class ConditionJSONDeserialiser {
  static fromJSON(
      input: {[condition:string]: {[key:string]: string[]}} | undefined,
  ): Condition[] {
    if (input === undefined) {
      return [];
    }
    const operator = Object.keys(input)[0];
    const key = Object.keys(input[operator])[0];
    const values = input[operator][key];
    return [new Condition(operator, key, values)];
  };
}
