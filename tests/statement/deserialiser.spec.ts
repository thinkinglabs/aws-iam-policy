import {expect} from 'chai';
import {IAMPolicyStatementJSONDeserialiser} from '../../src/statement/deserialiser';
import {IAMPolicyStatement} from '../../src/statement/statement';

describe('#IAMPolicyStatementDeserialiser', function() {
  describe('when JSON is empty', function() {
    const json = {};
    it('should return an empty Statement', function() {
      const expected = new IAMPolicyStatement();
      expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
    });
  });

  describe('when JSON has an Action', function() {
    describe('and its value is an object', function() {
      const json = {
        Action: {property: 'value'},
      };
      it('should throw an Error', function() {
        expect(() => IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array');
      });
    });

    describe('and its value is a string', function() {
      const json = {
        Action: 'action',
      };
      it('should throw an Error', function() {
        expect(() => IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array');
      });
    });

    describe('and its value is an array of strings', function() {
      const json = {
        Action: ['action'],
      };
      it('should return a Statement with actions', function() {
        const expected = new IAMPolicyStatement({actions: ['action']});
        expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
      });
    });

    describe('and its value is an array of numbers', function() {
      const json = {
        Action: [123],
      };
      it('should throw an Error', function() {
        expect(() => IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
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
        expect(() => IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array');
      });
    });
  });

  describe('when JSON has a Condition', function() {
    describe('and Condition is an array', function() {
      const json = {
        Condition: ['condition-value'],
      };
      it('should return a Statement with condition having an array', function() {
        const expected = new IAMPolicyStatement({conditions: ['condition-value']});
        expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
      });
    });
  });

  describe('and Condition is a string', function() {
    const json = {
      Condition: 'condition-value',
    };
    it('should return a Statement with condition having an object', function() {
      const expected = new IAMPolicyStatement({
        conditions: {
          '0': 'c',
          '1': 'o',
          '2': 'n',
          '3': 'd',
          '4': 'i',
          '5': 't',
          '6': 'i',
          '7': 'o',
          '8': 'n',
          '9': '-',
          '10': 'v',
          '11': 'a',
          '12': 'l',
          '13': 'u',
          '14': 'e',
        },
      });
      expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
    });
  });

  describe('and Condition is an object', function() {
    describe('and its value is an empty object', function() {
      const json = {
        Condition: {},
      };
      it('should return a Statement with condition having an empty object', function() {
        const expected = new IAMPolicyStatement({
          conditions: {},
        });
        expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
      });
    });

    describe('and it has a ConditionKey', function() {
      describe('and ConditionKey is a string', function() {
        const json = {
          Condition: {ConditionKey: 'condition-value'},
        };
        it('should return a Statement with condition having a string ConditionKey', function() {
          const expected = new IAMPolicyStatement({
            conditions: {ConditionKey: 'condition-value'},
          });
          expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
        });
      });

      describe('and ConditionKey is an array', function() {
        const json = {
          Condition: {ConditionKey: ['condition-value']},
        };
        it('should return a Statement with condition having a string array ConditionKey', function() {
          const expected = new IAMPolicyStatement({
            conditions: {ConditionKey: ['condition-value']},
          });
          expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
        });
      });

      describe('and ConditionKey is an empty object', function() {
        const json = {
          Condition: {ConditionKey: {}},
        };
        it('should return a Statement with condition having an empty object ConditionKey', function() {
          const expected = new IAMPolicyStatement({
            conditions: {ConditionKey: {}},
          });
          expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
        });
      });

      describe('and ConditionKey is a non-empty object', function() {
        const json = {
          Condition: {ConditionKey: {property: 'condition-value'}},
        };
        it('should return a Statement with condition having a non-empty object ConditionKey', function() {
          const expected = new IAMPolicyStatement({
            conditions: {ConditionKey: {property: 'condition-value'}},
          });
          expect(IAMPolicyStatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
        });
      });
    });
  });
});
