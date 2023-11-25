import {AnonymousValue, Principal, PrincipalValues} from './base';
import {AnonymousUserPrincipal} from './anonymous';
import {WildcardPrincipal} from './wildcard';
import {ArnPrincipal} from './arn';
import {AccountPrincipal} from './account';
import {ServicePrincipal} from './service';
import {FederatedPrincipal} from './federated';
import {parseArray} from '../arrays';

class PrincipalJSONDeserialiser {
  static fromJSON(input: {[key:string]: PrincipalValues} | AnonymousValue | undefined): Principal[] {
    if (input === undefined) {
      return [];
    }

    if (input === '*') {
      return [new WildcardPrincipal()];
    }

    const result: Principal[] = [];

    const principals = input as {[key:string]: string[] | string};
    const principalTypes = Object.keys(principals);
    principalTypes.forEach((principalType) => {
      const principalValues = parseArray(principals[principalType]);
      switch (principalType) {
        case 'AWS':
          result.push(...principalValues.map(parseAWS));
          break;
        case 'Service':
          result.push(...principalValues.map(parseService));
          break;
        case 'Federated':
          result.push(...principalValues.map(parseFederated));
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
    function parseFederated(value: string) {
      return new FederatedPrincipal(value);
    }
  }
}

export {PrincipalJSONDeserialiser};
