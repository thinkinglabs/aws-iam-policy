import {Principal} from './base';
import {normalise} from '../normaliser';

class PrincipalJSONSerialiser {
  static toJSON(principals: Principal[]) {
    return normalise(merge(principals));

    function merge(principals: Principal[]) {
      const result: {[key: string]: string[];} = {};

      principals.forEach((principal) => {
        const json = principal.toJSON();
        Object.keys(json).forEach((key) =>{
          result[key] = result[key] || [];
          let value = json[key];
          if (!Array.isArray(value)) {
            value = [value];
          }
          result[key].push(...value);
        });
      });
      return result;
    }
  }
}

export {PrincipalJSONSerialiser};
