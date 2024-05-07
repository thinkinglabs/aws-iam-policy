import {expect} from 'chai';
import {WildcardPrincipal} from '../../src';

describe('#WildcardPrincipal', function() {
  describe('#toJSON', function() {
    const principal = new WildcardPrincipal();

    it('should return the wildcard principal JSON fragment', function() {
      const expected = '*';
      expect(principal.toJSON()).to.equal(expected);
    });
  });
});

