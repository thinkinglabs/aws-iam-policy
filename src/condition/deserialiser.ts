import {Condition} from './condition';

export class ConditionJSONDeserialiser {
  static fromJSON(input: any): Condition[] {
    if (input === undefined) {
      return [];
    }

    if (typeof input !== 'object') {
      throw new Error(
          `Unsupported Condition type ${typeof input}: ` +
          `expecting an object {[operator:string]: {[key:string]:string[]}}`);
    }

    if (Array.isArray(input)) {
      throw new Error(
          `Unsupported Condition type array: ` +
          `expecting an object {[operator:string]: {[key:string]:string[]}}`);
    }

    const result: Condition[] = [];

    Object.keys(input).forEach((operator) => {
      const operatorValue = input[operator];

      if (typeof operatorValue !== 'object') {
        throw new Error(
            `Unsupported Condition operator type ${typeof operatorValue}: ` +
            'expecting an object {[key:string]:string[]}');
      }

      if (Array.isArray(operatorValue)) {
        throw new Error(
            'Unsupported Condition operator type array: ' +
            'expecting an object {[key:string]:string[]}');
      }

      Object.keys(operatorValue).forEach((key) => {
        const values = operatorValue[key];

        if (Array.isArray(values)) {
          if (isArrayOfStrings(values)) {
            result.push(new Condition(operator, key, values));
          } else {
            throw new Error('Unsupported Condition values type: expecting strings');
          }
        } else {
          throw new Error(
              `Unsupported Condition key type ${typeof values}: ` +
              'expecting an array of strings');
        }
      });
    });

    return result;

    function isArrayOfStrings(obj: any[]) {
      return obj.every((element) => typeof element === 'string');
    }
  };
}
