import {expect} from 'chai';
import {RootAccountPrincipal} from '../../src/principals/root-account';

describe('#RootAccountPrincipal', function() {
  describe('#validate', function() {
    describe('when given a valid root account arn', function() {
      it('should return the AWS account arn', function() {
        const arn = 'arn:aws:iam::012345678900:root';
        expect(RootAccountPrincipal.validate(arn)).to.equal('arn:aws:iam::012345678900:root');
      });
    });

    describe('when given an invalid arn', function() {
      it('should return undefined', function() {
        expect(RootAccountPrincipal.validate('anARN')).to.be.undefined;
      });
    });

    describe('when given a valid IAM User arn', function() {
      it('should return undefined', function() {
        expect(RootAccountPrincipal.validate('arn:aws:iam::012345678900:user/aUser')).to.be.undefined;
      });
    });

    describe('when given a valid IAM Role arn', function() {
      it('should return undefined', function() {
        expect(RootAccountPrincipal.validate('arn:aws:iam::012345678900:role/aUser')).to.be.undefined;
      });
    });
  });
});
