import {ArnPrincipal} from './arn';

class AnonymousUserPrincipal extends ArnPrincipal {
  constructor() {
    super('*');
  }

  static validate(input: string): string | undefined {
    const regex = new RegExp('^\\*$');
    const result = regex.exec(input) as RegExpExecArray;
    return result ? result[0] : undefined;
  }
}

export {AnonymousUserPrincipal};
