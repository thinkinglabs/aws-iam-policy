import {ArnPrincipal} from './arn';

class UserPrincipal extends ArnPrincipal {
  private accountId: string;
  private userName: string;
  private path: string;
  constructor(accountId: string, userName: string, path: string = '/') {
    super(`arn:aws:iam::${accountId}:user${path}${userName}`);
    this.accountId = accountId;
    this.userName = userName;
    this.path = path;
  }
}

export {UserPrincipal};
