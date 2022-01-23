import {expect} from 'chai';
import {StatementJSONDeserialiser} from '../../src/statement/deserialiser';
import {Statement} from '../../src/statement/statement';

describe('#StatementDeserialiser', function() {
  describe('when JSON is empty', function() {
    const json = {};
    it('should return an empty Statement', function() {
      const expected = new Statement();
      expect(StatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
    });
  });

  describe('when JSON has an Action', function() {
    describe('and its value is an object', function() {
      const json = {
        Action: {property: 'value'},
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array');
      });
    });

    describe('and its value is a string', function() {
      const json = {
        Action: 'action',
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array');
      });
    });

    describe('and its value is an array of strings', function() {
      const json = {
        Action: ['action'],
      };
      it('should return a Statement with actions', function() {
        const expected = new Statement({actions: ['action']});
        expect(StatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
      });
    });

    describe('and its value is an array of numbers', function() {
      const json = {
        Action: [123],
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array of strings');
      });
    });
  });

  describe('when JSON has a Resource', function() {
    describe('and its value is an object', function() {
      const json = {
        Resource: {property: 'value'},
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array or a string');
      });
    });
  });
});
