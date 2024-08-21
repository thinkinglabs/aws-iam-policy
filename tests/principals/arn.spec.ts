import {expect} from 'chai';
import {ArnPrincipal} from '../../src';

describe('#ArnPrincipal', function() {
  describe('#toJSON', function() {
    const arn = 'arn:aws:iam::123456789000:user/aUser';
    const principal = new ArnPrincipal(arn);

    it('should return the AWS principal JSON fragment', function() {
      const expected = {
        'AWS': arn,
      };
      expect(principal.toJSON()).to.deep.equal(expected);
    });
  });

  describe('#validate', function() {
    describe('when given a valid IAM user arn', function() {
      it('should return the IAM user arn', function() {
        const arn = 'arn:aws:iam::012345678900:user/aUser';
        expect(ArnPrincipal.validate(arn)).to.deep.equal(new ArnPrincipal(arn));
      });
    });

    describe('when given a valid IAM role arn', function() {
      it('should return the IAM role arn', function() {
        const arn = 'arn:aws:iam::012345678900:user/aRole';
        expect(ArnPrincipal.validate(arn)).to.deep.equal(new ArnPrincipal(arn));
      });
    });

    describe('when given an invalid arn', function() {
      it('should return undefined', function() {
        expect(ArnPrincipal.validate('anARN')).to.be.undefined;
      });
    });

    describe('when given a valid root account arn', function() {
      it('should return the root account arn', function() {
        const arn = 'arn:aws:iam::012345678900:root';
        expect(ArnPrincipal.validate(arn)).to.deep.equal(new ArnPrincipal(arn));
      });
    });
  });
});
