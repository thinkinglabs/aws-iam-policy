import {Principal} from './base';
import {AnonymousUserPrincipal} from './anonymous';
import {ArnPrincipal} from './arn';
import {RootAccountPrincipal} from './root-account';
import {AccountPrincipal} from './account';
import {ServicePrincipal} from './service';

class PrincipalJSONDeserialiser {
  static fromJSON(input: {[key:string]: string[]} | undefined): Principal[] {
    if (input === undefined) {
      return [];
    }

    const obj = input as {[key:string]: string[]};
    const result: Principal[] = [];
    Object.keys(obj).forEach((principalType) => {
      switch (principalType) {
        case 'AWS':
          result.push(...obj[principalType].map(parseAWS));
          break;
        case 'Service':
          result.push(...obj[principalType].map(parseService));
          break;
        default:
          throw new Error(`Unsupported principal "${principalType}"`);
      }
    });
    return result;

    function parseAWS(value: string) {
      let validation = ArnPrincipal.validate(value);
      if (validation) {
        return new ArnPrincipal(validation);
      }
      validation = RootAccountPrincipal.validate(value);
      if (validation) {
        return new RootAccountPrincipal(validation);
      }
      validation = AccountPrincipal.validate(value);
      if (validation) {
        return new AccountPrincipal(validation);
      }
      validation = AnonymousUserPrincipal.validate(value);
      if (validation) {
        return new AnonymousUserPrincipal();
      }
      throw new Error(`Unsupported AWS principal value "${value}"`);
    }
    function parseService(value: string) {
      return new ServicePrincipal(value);
    }
  }
}

export {PrincipalJSONDeserialiser};
