import {expect} from 'chai';
import {PolicyDocumentJSONDeserialiser} from '../../src/policy/deserialiser';
import {
  PolicyDocument,
  Statement,
} from '../../src';

describe('#PolicyDocumentJSONDeserialiser', function() {
  describe('#fromJSON', function() {
    describe('when json is empty', function() {
      const json = {};
      it('should return an empty Policy', function() {
        const expected = new PolicyDocument();
        expect(PolicyDocumentJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
      });
    });

    describe('when json has no Statement', function() {
      describe('and Id is a string', function() {
        const json = {Id: 'an-id'};
        it('should return a PolicyDocument with an id', function() {
          const expected = new PolicyDocument([], 'an-id');
          expect(PolicyDocumentJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
        });
      });
    });

    describe('when json has a Statement', function() {
      describe('and Statement is a string', function() {
        const json = {Statement: 'statement'};
        it('should throw an Error', function() {
          expect(() => PolicyDocumentJSONDeserialiser.fromJSON(json)).to.throw(Error)
              .with.property('message', 'Unexpected type: Statement must be an array');
        });
      });

      describe('and Statement is an array', function() {
        const json = {
          Statement: [{Sid: 'sid1'}, {Sid: 'sid2'}],
        };
        it('should return a Policy with Statements', function() {
          const expected = new PolicyDocument([
            new Statement({sid: 'sid1'}),
            new Statement({sid: 'sid2'}),
          ]);
          expect(PolicyDocumentJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
        });
      });

      describe('with an Id and a Statement array', function() {
        const json = {
          Id: 'an-id',
          Statement: [{Sid: 'sid1'}, {Sid: 'sid2'}],
        };
        it('should return a Policy with Statements', function() {
          const expected = new PolicyDocument([
            new Statement({sid: 'sid1'}),
            new Statement({sid: 'sid2'}),
          ], 'an-id');
          expect(PolicyDocumentJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
        });
      });
    });
  });
});
