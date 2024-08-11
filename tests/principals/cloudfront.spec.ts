import {expect} from 'chai';
import {CloudFrontPrincipal} from '../../src';

describe('#CloudFrontPrincipal', function() {
  describe('#toJSON', function() {
    const arn = 'arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E12345678ABCDE';
    const principal = new CloudFrontPrincipal(arn);

    it('should return the AWS principal JSON fragment', function() {
      const expected = {
        'AWS': arn,
      };
      expect(principal.toJSON()).to.deep.equal(expected);
    });
  });

  describe('#validate', function() {
    describe('when given a valid CloudFront user arn', function() {
      it('should return the IAM user arn', function() {
        const arn = 'arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1ABCDEFGHIJ';
        expect(CloudFrontPrincipal.validate(arn)).to.equal(arn);
      });
    });

    describe('when given an invalid arn with a valid CloudFront id', function() {
      it('should return undefined', function() {
        const arn = 'arn:aws:iam::cloudfront:user/World Origin Access Identity E1A2B3C4D5E6F';
        expect(CloudFrontPrincipal.validate(arn)).to.be.undefined;
      });
    });

    describe('when given an valid arn with an invalid CloudFront id', function() {
      it('should return the root account arn', function() {
        const arn = 'arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EABCDEFGHIJKLMNO';
        expect(CloudFrontPrincipal.validate(arn)).to.be.undefined;
      });
    });
  });
});
