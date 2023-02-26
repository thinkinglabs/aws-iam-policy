import {AbstractBasePrincipal} from './base';

class ArnPrincipal extends AbstractBasePrincipal {
  private arn: string;
  constructor(arn: string) {
    super();
    this.arn = arn;
  }

  toJSON() {
    return {AWS: this.arn};
  }

  static validate(input: string): string | undefined {
    const regex = new RegExp('^arn:aws:iam::[0-9]{12}:((user|role)/.*|root)$');
    const result = regex.exec(input) as RegExpExecArray;
    return result ? result[0] : undefined;
  }
}

export {ArnPrincipal};
