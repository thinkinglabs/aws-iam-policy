import {expect} from 'chai';
import {PolicyDocumentJSONSerialiser} from '../../src/policy/serialiser';
import {
  PolicyDocument,
  Statement,
} from '../../src';

describe('#PolicyDocumentJSONSerialiser', function() {
  describe('#toJSON', function() {
    describe('when policy is empty', function() {
      const input = new PolicyDocument();
      it('should return undefined', function() {
        expect(PolicyDocumentJSONSerialiser.toJSON(input)).to.equal(undefined);
      });
    });

    describe('when policy has an empty statement', function() {
      const input = new PolicyDocument([new Statement()]);
      it('should return a JSON policy with an empty Statement', function() {
        const expected = {
          Statement: [{
            Sid: undefined,
            Effect: 'Allow',
            Principal: undefined,
            NotPrincipal: undefined,
            Action: undefined,
            NotAction: undefined,
            Resource: undefined,
            NotResource: undefined,
            Condition: undefined,
          }],
          Version: '2012-10-17',
        };
        expect(PolicyDocumentJSONSerialiser.toJSON(input)).to.deep.equal(expected);
      });
    });

    describe('when policy has an id set', function() {
      const input = new PolicyDocument([new Statement({sid: 'an-sid'})], 'an-id');
      it('should return a JSON policy with an Id element', function() {
        const expected = {
          Id: 'an-id',
          Statement: [{
            Sid: 'an-sid',
            Effect: 'Allow',
            Principal: undefined,
            NotPrincipal: undefined,
            Action: undefined,
            NotAction: undefined,
            Resource: undefined,
            NotResource: undefined,
            Condition: undefined,
          }],
          Version: '2012-10-17',
        };
        expect(PolicyDocumentJSONSerialiser.toJSON(input)).to.deep.equal(expected);
      });
    });
  });
});
