import {Principal, PrincipalValues} from './base';
import {normalise} from '../normaliser';

class PrincipalJSONSerialiser {
  static toJSON(principals: Principal[]) {
    return normalise(merge(principals));

    function merge(principals: Principal[]) {
      const result: {[key: string]: PrincipalValues;} = {};

      principals.forEach((principal) => {
        const json = principal.toJSON();
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


// if (!Array.isArray(value)) {
//   if (currentResult) {
//     if (typeof(currentResult) === 'string') {
//       currentResult = [currentResult, value];
//     } else if (Array.isArray(currentResult)) {
//       currentResult.push(value);
//     }
//   } else {
//     currentResult = value;
//   };
// }
// result[key] = currentResult;
