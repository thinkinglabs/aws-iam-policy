import {ArnPrincipal} from './arn';

class RolePrincipal extends ArnPrincipal {
  constructor(accountId: string, roleName: string) {
    super(`arn:aws:iam::${accountId}:role/${roleName}`);
  }

  static validate(input: string): string | undefined {
    const regex = new RegExp('^arn:aws:iam::[0-9]{12}:role/.*$');
    const result = regex.exec(input) as RegExpExecArray;
    return result ? result[0] : undefined;
  }
}

export {RolePrincipal};
