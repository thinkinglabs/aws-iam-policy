import {expect} from 'chai';
import {AnonymousUserPrincipal} from '../../src/principals/anonymous';

describe('#AnonymousUserPrincipal', function() {
  describe('#toJSON', function() {
    const principle = new AnonymousUserPrincipal();

    it('should return the AWS principal JSON fragment', function() {
      const expected = {
        'AWS': '*',
      };
      expect(principle.toJSON()).to.deep.equal(expected);
    });
  });

  describe('#validate', function() {
    describe('when given a valid IAM user arn', function() {
      it('should return the anonymous user arn', function() {
        const arn = '*';
        expect(AnonymousUserPrincipal.validate(arn)).to.equal(arn);
      });
    });

    describe('when given a string', function() {
      it('should return undefined', function() {
        expect(AnonymousUserPrincipal.validate('anARN')).to.be.undefined;
      });
    });

    describe('when given a wildcard user arn', function() {
      it('should return null', function() {
        const arn = 'arn:aws:iam::112233445566:user/*';
        expect(AnonymousUserPrincipal.validate(arn)).to.be.undefined;
      });
    });
  });
});
