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

    const result: Condition[] = Object.keys(input).flatMap((operator: any) => {
      const operatorValue = input[operator];

      return parseOperator(operator, operatorValue);
    });

    return result;

    function parseOperator(operator: string, operatorValue: any) {
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

      return Object.keys(operatorValue).map((key) => {
        const values = operatorValue[key];

        return new Condition(operator, key, parseArray(values));
      });
    }

    function parseArray(obj: any) {
      if (obj === undefined) {
        return [];
      }

      if (Array.isArray(obj)) {
        if (isArrayOfStrings(obj)) {
          return obj as [];
        } else {
          throw new Error('Unsupported type: expecting an array of strings');
        }
      } else {
        throw new Error('Unsupported type: expecting an array');
      }
    }

    function isArrayOfStrings(obj: any[]) {
      return obj.every((element) => typeof element === 'string');
    }
  };
}
