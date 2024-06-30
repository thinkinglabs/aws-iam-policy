import {expect} from 'chai';
import {FederatedPrincipal} from '../../src';

describe('#ServicePrincipal', function() {
  describe('#toJSON', function() {
    const identityProvider = 'www.amazon.com';
    const policy = new FederatedPrincipal(identityProvider);

    it('should return the AWS federated principal JSON fragment', function() {
      const expected = {
        'Federated': identityProvider,
      };
      expect(policy.toJSON()).to.deep.equal(expected);
    });
  });
});
