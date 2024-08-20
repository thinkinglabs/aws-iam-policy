import {expect} from 'chai';
import {UserPrincipal} from '../../src';

describe('#UserPrincipal', function() {
  describe('#toJSON', function() {
    describe('a user with default path', function() {
      const principal = new UserPrincipal('123456789000', 'aUser');
      it('should return the AWS principal JSON fragment', function() {
        const expected = {
          'AWS': 'arn:aws:iam::123456789000:user/aUser',
        };
        expect(principal.toJSON()).to.deep.equal(expected);
      });
    });

    describe('a user with a path', function() {
      const principal = new UserPrincipal('123456789000', 'aUser', '/aPath/');
      it('should return the AWS principal JSON fragment', function() {
        const expected = {
          'AWS': 'arn:aws:iam::123456789000:user/aPath/aUser',
        };
        expect(principal.toJSON()).to.deep.equal(expected);
      });
    });
  });
  describe('#validate', function() {
    describe('when given a valid IAM user arn without path', function() {
      it('should return the IAM user principal', function() {
        const accountId = '012345678900';
        const userName = 'aUser';
        const arn = `arn:aws:iam::${accountId}:user/${userName}`;
        expect(UserPrincipal.validate2(arn)).to.deep.equal(new UserPrincipal(accountId, userName));
      });
    });
    describe('when given a valid IAM user arn with path', function() {
      it('should return the IAM user principal', function() {
        const accountId = '012345678900';
        const userName = 'aUser';
        const path = '/aPath/';
        const arn = `arn:aws:iam::${accountId}:user${path}${userName}`;
        expect(UserPrincipal.validate2(arn)).to.deep.equal(new UserPrincipal(accountId, userName, path));
      });
    });
    describe('when given an invalid IAM user arn having 11 digits for account id', function() {
      it('should return the IAM user principal', function() {
        const accountId = '01234567890';
        const arn = `arn:aws:iam::${accountId}:user/aUser`;
        expect(UserPrincipal.validate2(arn)).to.be.undefined;
      });
    });
    describe('when given an invalid IAM user arn having 13 digits for account id', function() {
      it('should return the IAM user principal', function() {
        const accountId = '0123456789001';
        const arn = `arn:aws:iam::${accountId}:user/aUser`;
        expect(UserPrincipal.validate2(arn)).to.be.undefined;
      });
    });
    describe('when given an invalid IAM user arn having alpha numerical characters for account id', function() {
      it('should return the IAM user principal', function() {
        const accountId = 'a12345678900';
        const arn = `arn:aws:iam::${accountId}:user/aUser`;
        expect(UserPrincipal.validate2(arn)).to.be.undefined;
      });
    });
    describe('when given a valid IAM user arn having valid characters for user name', function() {
      it('should return the IAM user principal', function() {
        const accountId = '012345678900';
        const userName = 'a_user_with_valid_char=0123456789@AbCdEfGhIjKlMnOpQrStUvWxYz.+-';
        const arn = `arn:aws:iam::${accountId}:user/${userName}`;
        expect(UserPrincipal.validate2(arn)).to.deep.equal(new UserPrincipal(accountId, userName));
      });
    });
    describe('when given a valid IAM user arn having 64 characters for user name', function() {
      it('should return the IAM user principal', function() {
        const accountId = '012345678900';
        const userName = 'x'.repeat(64);
        const arn = `arn:aws:iam::${accountId}:user/${userName}`;
        expect(UserPrincipal.validate2(arn)).to.be.deep.equal(new UserPrincipal(accountId, userName));
      });
    });
    describe('when given an invalid IAM user arn having 65 characters fore user name', function() {
      it('should return undefined', function() {
        const userName = 'x'.repeat(65);
        const arn = `arn:aws:iam::0123456789001:user/${userName}`;
        expect(UserPrincipal.validate2(arn)).to.be.undefined;
      });
    });
    describe('when given a valid IAM user arn having valid characters for path', function() {
      it('should return the IAM user principal', function() {
        const accountId = '012345678900';
        const userName = 'aUser';
        const path = '/a/path/with/valid/characters/@=+._-/';
        const arn = `arn:aws:iam::${accountId}:user${path}${userName}`;
        expect(UserPrincipal.validate2(arn)).to.be.deep.equal(new UserPrincipal(accountId, userName, path));
      });
    });
    describe('when given a valid IAM user arn having 512 characters for path', function() {
      it('should return the IAM user principal', function() {
        const accountId = '012345678900';
        const userName = 'aUser';
        const path = '/' + 'x'.repeat(510) + '/';
        const arn = `arn:aws:iam::${accountId}:user${path}${userName}`;
        expect(UserPrincipal.validate2(arn)).to.be.deep.equal(new UserPrincipal(accountId, userName, path));
      });
    });
    describe('when given an valid IAM user arn having 513 characters for path', function() {
      it('should return the IAM user principal', function() {
        const path = '/' + 'x'.repeat(511) + '/';
        const arn = `arn:aws:iam::0123456789001:user${path}aUser`;
        expect(UserPrincipal.validate2(arn)).to.be.undefined;
      });
    });
    describe('when given a valid IAM role arn', function() {
      it('should return undefined', function() {
        const arn = 'arn:aws:iam::012345678900:role/aRole';
        expect(UserPrincipal.validate2(arn)).to.be.undefined;
      });
    });
    describe('when given a valid root account arn', function() {
      it('should return undefined', function() {
        const arn = 'arn:aws:iam::012345678900:root';
        expect(UserPrincipal.validate2(arn)).to.be.undefined;
      });
    });
  });
});
