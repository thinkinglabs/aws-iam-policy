import {Principal, PrincipalValues} from './base';
import {normalise} from '../normaliser';
import {WildcardPrincipal} from './wildcard';

class PrincipalJSONSerialiser {
  static toJSON(principals: Principal[]) {
    return normalise(merge(principals));

    function merge(principals: Principal[]) {
      if (principals[0] instanceof WildcardPrincipal) {
        return principals[0].toJSON();
      }

      const result: {[key: string]: PrincipalValues;} = {};

      principals.forEach((principal) => {
        const json = principal.toJSON() as {[key: string]: PrincipalValues};
        Object.keys(json).forEach((key) =>{
          let intermediateResult = result[key];
          const value = json[key]; // string, string[]
          if (intermediateResult === undefined) { // undefined
            intermediateResult = value;
          } else if (typeof(intermediateResult) === 'string') { // string
            if (!Array.isArray(value)) {
              intermediateResult = [intermediateResult, value];
            } else {
              intermediateResult = [intermediateResult, ...value];
            }
          } else { // string[]
            if (!Array.isArray(value)) {
              intermediateResult.push(value);
            } else {
              intermediateResult.push(...value);
            }
          }
          result[key] = intermediateResult;
        });
      });
      return result;
    }
  }
}

export {PrincipalJSONSerialiser};

