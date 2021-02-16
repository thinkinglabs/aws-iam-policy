import {AbstractBasePrincipal} from './base';

class AccountPrincipal extends AbstractBasePrincipal {
  private accountId: string;
  constructor(accountId: string) {
    super();
    this.accountId = accountId;
  }

  toJSON() {
    return {AWS: [this.accountId]};
  }

  static validate(input: string): string | undefined {
    const regexp = new RegExp('^[0-9]{12}$');
    const result = regexp.exec(input) as RegExpExecArray;
    return result ? result[0] : undefined;
  }
}

export {AccountPrincipal};
