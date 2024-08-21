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

  static validate2(input: string): AccountPrincipal | undefined {
    const regexp = new RegExp('^[0-9]{12}$');
    const result = regexp.exec(input) as RegExpExecArray;
    return result ? new AccountPrincipal(result[0]) : undefined;
  }
}

export {AccountPrincipal};
