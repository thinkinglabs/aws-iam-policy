import {expect} from 'chai';
import {RootAccountPrincipal} from '../../src';

describe('#RootAccountPrincipal', function() {
  describe('#toJSON', function() {
    const account = '123456789000';
    const principal = new RootAccountPrincipal(account);

    it('should return the AWS principal JSON fragment', function() {
      const expected = {
        'AWS': 'arn:aws:iam::123456789000:root',
      };
      expect(principal.toJSON()).to.deep.equal(expected);
    });
  });

  describe('#validate', function() {
    describe('when given a valid root account arn', function() {
      it('should return the AWS account arn', function() {
        const arn = 'arn:aws:iam::012345678900:root';
        expect(RootAccountPrincipal.validate(arn))
            .to.deep.equal(new RootAccountPrincipal('012345678900'));
      });
    });

    describe('when given a valid IAM User arn', function() {
      it('should return undefined', function() {
        expect(RootAccountPrincipal.validate('arn:aws:iam::012345678900:user/aUser')).to.be.undefined;
      });
    });

    describe('when given a valid IAM Role arn', function() {
      it('should return undefined', function() {
        expect(RootAccountPrincipal.validate('arn:aws:iam::012345678900:role/aRole')).to.be.undefined;
      });
    });

    describe('when given an invalid arn', function() {
      it('should return undefined', function() {
        expect(RootAccountPrincipal.validate('anARN')).to.be.undefined;
      });
    });
  });
});
