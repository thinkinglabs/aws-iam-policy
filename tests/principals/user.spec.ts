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
});
