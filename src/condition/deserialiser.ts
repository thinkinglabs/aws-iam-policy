import {Condition} from './condition';

export class ConditionJSONDeserialiser {
  static fromJSON(
      input: {[condition:string]: {[key:string]: string[]}} | undefined,
  ): Condition[] {
    return [];
  };
}
