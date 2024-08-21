import {expect} from 'chai';
import {RolePrincipal} from '../../src';

describe('#RolePrincipal', function() {
  describe('#toJSON', function() {
    describe('a role with default path', function() {
      const principal = new RolePrincipal('123456789000', 'aRole');
      it('should return the AWS principal JSON fragment', function() {
        const expected = {
          'AWS': 'arn:aws:iam::123456789000:role/aRole',
        };
        expect(principal.toJSON()).to.deep.equal(expected);
      });
    });

    describe('a role with a path', function() {
      const principal = new RolePrincipal('123456789000', 'aRole', '/aPath/');
      it('should return the AWS principal JSON fragment', function() {
        const expected = {
          'AWS': 'arn:aws:iam::123456789000:role/aPath/aRole',
        };
        expect(principal.toJSON()).to.deep.equal(expected);
      });
    });
  });
  describe('#validate', function() {
    describe('when given a valid IAM role arn without path', function() {
      it('should return the IAM role principal', function() {
        const accountId = '012345678900';
        const userName = 'aRole';
        const arn = `arn:aws:iam::${accountId}:role/${userName}`;
        expect(RolePrincipal.validate(arn)).to.deep.equal(new RolePrincipal(accountId, userName));
      });
    });
    describe('when given a valid IAM role arn with path', function() {
      it('should return the IAM role principal', function() {
        const accountId = '012345678900';
        const userName = 'aRole';
        const path = '/aPath/';
        const arn = `arn:aws:iam::${accountId}:role${path}${userName}`;
        expect(RolePrincipal.validate(arn)).to.deep.equal(new RolePrincipal(accountId, userName, path));
      });
    });
    describe('when given an invalid IAM role arn having 11 digits for account id', function() {
      it('should return the IAM role principal', function() {
        const accountId = '01234567890';
        const arn = `arn:aws:iam::${accountId}:role/aRole`;
        expect(RolePrincipal.validate(arn)).to.be.undefined;
      });
    });
    describe('when given an invalid IAM role arn having 13 digits for account id', function() {
      it('should return the IAM role principal', function() {
        const accountId = '0123456789001';
        const arn = `arn:aws:iam::${accountId}:role/aRole`;
        expect(RolePrincipal.validate(arn)).to.be.undefined;
      });
    });
    describe('when given an invalid IAM role arn having alpha numerical characters for account id', function() {
      it('should return the IAM role principal', function() {
        const accountId = 'a12345678900';
        const arn = `arn:aws:iam::${accountId}:role/aRole`;
        expect(RolePrincipal.validate(arn)).to.be.undefined;
      });
    });
    describe('when given a valid IAM role arn having valid characters for user name', function() {
      it('should return the IAM role principal', function() {
        const accountId = '012345678900';
        const userName = 'a_user_with_valid_char=0123456789@AbCdEfGhIjKlMnOpQrStUvWxYz.+-';
        const arn = `arn:aws:iam::${accountId}:role/${userName}`;
        expect(RolePrincipal.validate(arn)).to.deep.equal(new RolePrincipal(accountId, userName));
      });
    });
    describe('when given a valid IAM role arn having 64 characters for user name', function() {
      it('should return the IAM role principal', function() {
        const accountId = '012345678900';
        const userName = 'x'.repeat(64);
        const arn = `arn:aws:iam::${accountId}:role/${userName}`;
        expect(RolePrincipal.validate(arn)).to.be.deep.equal(new RolePrincipal(accountId, userName));
      });
    });
    describe('when given an invalid IAM role arn having 65 characters fore user name', function() {
      it('should return undefined', function() {
        const userName = 'x'.repeat(65);
        const arn = `arn:aws:iam::0123456789001:role/${userName}`;
        expect(RolePrincipal.validate(arn)).to.be.undefined;
      });
    });
    describe('when given a valid IAM role arn having valid characters for path', function() {
      it('should return the IAM role principal', function() {
        const accountId = '012345678900';
        const userName = 'aRole';
        const path = '/a/path/with/valid/characters/@=+._-/';
        const arn = `arn:aws:iam::${accountId}:role${path}${userName}`;
        expect(RolePrincipal.validate(arn)).to.be.deep.equal(new RolePrincipal(accountId, userName, path));
      });
    });
    describe('when given a valid IAM role arn having 512 characters for path', function() {
      it('should return the IAM role principal', function() {
        const accountId = '012345678900';
        const userName = 'aRole';
        const path = '/' + 'x'.repeat(510) + '/';
        const arn = `arn:aws:iam::${accountId}:role${path}${userName}`;
        expect(RolePrincipal.validate(arn)).to.be.deep.equal(new RolePrincipal(accountId, userName, path));
      });
    });
    describe('when given an valid IAM role arn having 513 characters for path', function() {
      it('should return the IAM role principal', function() {
        const path = '/' + 'x'.repeat(511) + '/';
        const arn = `arn:aws:iam::0123456789001:role${path}aRole`;
        expect(RolePrincipal.validate(arn)).to.be.undefined;
      });
    });
    describe('when given a valid IAM user arn', function() {
      it('should return undefined', function() {
        const arn = 'arn:aws:iam::012345678900:user/aUser';
        expect(RolePrincipal.validate(arn)).to.be.undefined;
      });
    });
    describe('when given a valid root account arn', function() {
      it('should return undefined', function() {
        const arn = 'arn:aws:iam::012345678900:root';
        expect(RolePrincipal.validate(arn)).to.be.undefined;
      });
    });
  });
});
