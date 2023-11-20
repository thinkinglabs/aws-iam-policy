import {Principal} from './base';

class WildcardPrincipal implements Principal {
  toJSON() {
    return '*';
  }
}

export {WildcardPrincipal};
