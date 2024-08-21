import {AbstractBasePrincipal} from './base';

class CloudFrontPrincipal extends AbstractBasePrincipal {
    private arn: string;

    constructor(arn: string) {
      super();
      this.arn = arn;
    }

    toJSON() {
      return {AWS: this.arn};
    }

    static validate(input: string): CloudFrontPrincipal | undefined {
      const regex = new RegExp(
          '^arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]{6,14}$');
      const result = regex.exec(input) as RegExpExecArray;
      return result ? new CloudFrontPrincipal(result[0]) : undefined;
    }
}

export {CloudFrontPrincipal};
