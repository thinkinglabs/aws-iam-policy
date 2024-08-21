import {ArnPrincipal} from './arn';

class AnonymousUserPrincipal extends ArnPrincipal {
  constructor() {
    super('*');
  }

  static validate2(input: string): AnonymousUserPrincipal | undefined {
    const regex = new RegExp('^\\*$');
    const result = regex.exec(input) as RegExpExecArray;
    return result ? new AnonymousUserPrincipal() : undefined;
  }
}

export {AnonymousUserPrincipal};
