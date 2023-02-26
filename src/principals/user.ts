import {ArnPrincipal} from './arn';

class UserPrincipal extends ArnPrincipal {
  constructor(accountId: string, userName: string) {
    super(`arn:aws:iam::${accountId}:user/${userName}`);
  }

  static validate(input: string): string | undefined {
    const regex = new RegExp('^arn:aws:iam::[0-9]{12}:user/.*$');
    const result = regex.exec(input) as RegExpExecArray;
    return result ? result[0] : undefined;
  }
}

export {UserPrincipal};
