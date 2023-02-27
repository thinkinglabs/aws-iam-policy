import {expect} from 'chai';
import {RolePrincipal} from '../../src/principals/role';

describe('#RolePrincipal', function() {
  describe('#toJSON', function() {
    const account = '123456789000';
    const roleName = 'aRole';
    const principal = new RolePrincipal(account, roleName);

    it('should return the AWS principal JSON fragment', function() {
      const expected = {
        'AWS': 'arn:aws:iam::123456789000:role/aRole',
      };
      expect(principal.toJSON()).to.deep.equal(expected);
    });
  });

  describe('#validate', function() {
    describe('when given a valid IAM role arn', function() {
      it('should return the IAM role arn', function() {
        const arn = 'arn:aws:iam::012345678900:role/aRole';
        expect(RolePrincipal.validate(arn)).to.equal(arn);
      });
    });

    describe('when given a valid IAM user arn', function() {
      it('should return undefined', function() {
        expect(RolePrincipal.validate('arn:aws:iam::012345678900:user/aUser')).to.be.undefined;
      });
    });

    describe('when given a valid root account arn', function() {
      it('should return undefined', function() {
        expect(RolePrincipal.validate('arn:aws:iam::012345678900:root')).to.be.undefined;
      });
    });

    describe('when given an invalid arn', function() {
      it('should return undefined', function() {
        expect(RolePrincipal.validate('anARN')).to.be.undefined;
      });
    });
  });
});
