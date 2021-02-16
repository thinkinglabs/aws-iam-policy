import {expect} from 'chai';
import {IAMPolicy} from '../../src/policy/policy';
import {IAMPolicyJSONSerialiser} from '../../src/policy/serialiser';
import {IAMPolicyStatement} from '../../src/statement/statement';

describe('#IAMPolicyJSONSerialiser', function() {
  describe('#toJSON', function() {
    describe('when policy is empty', function() {
      const input = new IAMPolicy();
      it('should return undefined', function() {
        expect(IAMPolicyJSONSerialiser.toJSON(input)).to.equal(undefined);
      });
    });

    describe('when policy has an empty statement', function() {
      const input = new IAMPolicy({statements: [new IAMPolicyStatement()]});
      it('should return a JSON policy with an empty Statement', function() {
        const expected = {
          Statement: [{
            Sid: undefined,
            Effect: 'Allow',
            Principal: undefined,
            Action: undefined,
            Resource: undefined,
            Condition: undefined,
          }],
          Version: '2012-10-17',
        };
        expect(IAMPolicyJSONSerialiser.toJSON(input)).to.deep.equal(expected);
      });
    });
  });
});
