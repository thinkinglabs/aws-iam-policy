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

  static validate2(arn: string) {
    const regex = new RegExp(
        '^arn:aws:iam::([0-9]{12}):user((/[/a-zA-Z\+=\.@_-]{1,510})?/)([a-zA-Z0-9\+=\.@_-]{1,64})$',
    );
    const result = regex.exec(arn) as RegExpExecArray;
    return result ? new UserPrincipal(result[1], result[4], result[2]) : undefined;
  }
}

export {UserPrincipal};
