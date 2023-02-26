import {ArnPrincipal} from './arn';

class RootAccountPrincipal extends ArnPrincipal {
  constructor(accountId: string) {
    super(`arn:aws:iam::${accountId}:root`);
  }

  static validate(input: string): string | undefined {
    const regex = new RegExp('^arn:aws:iam::[0-9]{12}:root$');
    const result = regex.exec(input) as RegExpExecArray;
    return result ? result[0] : undefined;
  }
}

export {RootAccountPrincipal};
