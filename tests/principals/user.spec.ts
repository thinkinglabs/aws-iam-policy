import {expect} from 'chai';
import {UserPrincipal} from '../../src/principals/user';

describe('#UserPrincipal', function() {
  describe('#toJSON', function() {
    const account = '123456789000';
    const userName = 'aUser';
    const principal = new UserPrincipal(account, userName);

    it('should return the AWS principal JSON fragment', function() {
      const expected = {
        'AWS': 'arn:aws:iam::123456789000:user/aUser',
      };
      expect(principal.toJSON()).to.deep.equal(expected);
    });
  });

  describe('#validate', function() {
    describe('when given a valid IAM user arn', function() {
      it('should return the IAM user arn', function() {
        const arn = 'arn:aws:iam::012345678900:user/aUser';
        expect(UserPrincipal.validate(arn)).to.equal(arn);
      });
    });

    describe('when given a valid IAM role arn', function() {
      it('should return undefined', function() {
        expect(UserPrincipal.validate('arn:aws:iam::012345678900:role/aRole')).to.be.undefined;
      });
    });

    describe('when given a valid root account arn', function() {
      it('should return undefined', function() {
        expect(UserPrincipal.validate('arn:aws:iam::012345678900:root')).to.be.undefined;
      });
    });

    describe('when given an invalid arn', function() {
      it('should return undefined', function() {
        expect(UserPrincipal.validate('anARN')).to.be.undefined;
      });
    });
  });
});
