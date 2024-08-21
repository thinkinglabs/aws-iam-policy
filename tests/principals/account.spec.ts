import {expect} from 'chai';
import {AccountPrincipal} from '../../src';

describe('#AccountPrincipal', function() {
  describe('#validate', function() {
    describe('when given a valid account ID', function() {
      it('should return the AWS account ID', function() {
        expect(AccountPrincipal.validate2('012345678900')).to.deep.equal(new AccountPrincipal('012345678900'));
      });
    });

    describe('when given an invalid arn', function() {
      it('should return null', function() {
        expect(AccountPrincipal.validate2('anARN')).to.be.undefined;
      });
    });

    describe('when given a valid IAM User arn', function() {
      it('should return undefined', function() {
        expect(AccountPrincipal.validate2('arn:aws:iam::012345678900:user/aUser')).to.be.undefined;
      });
    });

    describe('when given a valid IAM Role arn', function() {
      it('should return null', function() {
        expect(AccountPrincipal.validate2('arn:aws:iam::012345678900:role/aUser')).to.be.undefined;
      });
    });
  });
});
