import {AbstractBasePrincipal} from './base';

class FederatedPrincipal extends AbstractBasePrincipal {
  private identityProvider: string;
  constructor(identityProvider: string) {
    super();
    this.identityProvider = identityProvider;
  }

  toJSON() {
    return {Federated: this.identityProvider};
  }
}

export {FederatedPrincipal};
