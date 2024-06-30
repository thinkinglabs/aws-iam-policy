import {expect} from 'chai';
import {ConditionJSONSerialiser} from '../../src/condition/serialiser';
import {Condition} from '../../src';

describe('#ConditionJSONSerialiser', function() {
  describe('#toJSON', function() {
    describe('when having an empty list of conditions', function() {
      const conditions: Condition[] = [];
      it('should return undefined', function() {
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.be.undefined;
      });
    });

    describe('when having one condition', function() {
      const conditions = [new Condition('anOperator', 'aKey', ['aValue'])];
      it('should return the Condition JSON object', function() {
        const expected = {
          'anOperator': {'aKey': ['aValue']},
        };
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.deep.equal(expected);
      });
    });

    describe('when having two conditions having a different operator', function() {
      const conditions = [
        new Condition('anOperator1', 'aKey1', ['aValue1']),
        new Condition('anOperator2', 'aKey2', ['aValue2']),
      ];
      it('should return the Condition JSON object', function() {
        const expected = {
          'anOperator1': {'aKey1': ['aValue1']},
          'anOperator2': {'aKey2': ['aValue2']},
        };
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.deep.equal(expected);
      });
    });

    describe('when having two conditions having the same operator', function() {
      const conditions = [
        new Condition('anOperator', 'aKey1', ['aValue1']),
        new Condition('anOperator', 'aKey2', ['aValue2']),
      ];
      it('should return the Condition JSON object', function() {
        const expected = {
          'anOperator': {'aKey1': ['aValue1'], 'aKey2': ['aValue2']},
        };
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.deep.equal(expected);
      });
    });

    describe('when having two conditions having the same operator and same key', function() {
      const conditions = [
        new Condition('anOperator', 'aKey', ['aValue1']),
        new Condition('anOperator', 'aKey', ['aValue2']),
      ];
      it('should return the Condition JSON object', function() {
        const expected = {
          'anOperator': {'aKey': ['aValue1', 'aValue2']},
        };
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.deep.equal(expected);
      });
    });
  });
});
