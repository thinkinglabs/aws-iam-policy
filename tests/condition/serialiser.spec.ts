import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';
import {ConditionJSONSerialiser} from '../../src/condition/serialiser';

describe('#ConditionJSONSerialiser', function() {
  describe('#toJSON', function() {
    describe('when having an empty list of conditions', function() {
      const conditions: Condition[] = [];
      it('should return undefined', function() {
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.be.undefined;
      });
    });

    describe('when having one condition', function() {
      const conditions = [new Condition('aTest', 'aKey', ['aValue'])];
      it('should return the Condition JSON object', function() {
        const expected = {
          'aTest': {'aKey': ['aValue']},
        };
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.deep.equal(expected);
      });
    });

    describe('when having two conditions having a different test', function() {
      const conditions = [
        new Condition('aTest1', 'aKey1', ['aValue1']),
        new Condition('aTest2', 'aKey2', ['aValue2']),
      ];
      it('should return the Condition JSON object', function() {
        const expected = {
          'aTest1': {'aKey1': ['aValue1']},
          'aTest2': {'aKey2': ['aValue2']},
        };
        expect(ConditionJSONSerialiser.toJSON(conditions)).to.deep.equal(expected);
      });
    });
  });
});
