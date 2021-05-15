import {Condition} from './condition';

export class ConditionJSONDeserialiser {
  static fromJSON(input: any): Condition[] {
    if (input === undefined) {
      return [];
    }

    if (typeof input !== 'object') {
      throw new Error(
          `Unsupported type ${typeof input}: expecting an object {[operator:string]: {[key:string]:string[]}}`);
    }

    if (Array.isArray(input)) {
      throw new Error(
          `Unsupported type array: expecting an object {[operator:string]: {[key:string]:string[]}}`);
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
