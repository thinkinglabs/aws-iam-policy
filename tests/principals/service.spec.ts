import {expect} from 'chai';
import {ServicePrincipal} from '../../src';

describe('#ServicePrincipal', function() {
  describe('#toJSON', function() {
    const service = 'aservice.amazonaws.com';
    const policy = new ServicePrincipal(service);

    it('should return the AWS service principal JSON fragment', function() {
      const expected = {
        'Service': service,
      };
      expect(policy.toJSON()).to.deep.equal(expected);
    });
  });
});
