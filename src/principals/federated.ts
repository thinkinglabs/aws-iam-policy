import {AbstractBasePrincipal} from './base';

class FederatedPrincipal extends AbstractBasePrincipal {
  private identityProvider: string;
  constructor(identityProvider: string) {
    super();
    this.identityProvider = identityProvider;
  }

  toJSON() {
    return {Federated: [this.identityProvider]};
  }

  static validate(input: string): string | undefined {
    const regex = new RegExp('^arn:aws:iam::[0-9]{12}:(user|role)/.*$');
    const result = regex.exec(input) as RegExpExecArray;
    return result ? result[0] : undefined;
  }
}

export {FederatedPrincipal};
