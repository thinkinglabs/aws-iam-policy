import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';
import {ConditionJSONDeserialiser} from '../../src/condition/deserialiser';

describe('#ConditionJSONDeserialiser', function() {
  describe('#fromJSON', function() {
    describe('when having an undefined condition', function() {
      it('should return an empty array', function() {
        const input = undefined;
        const expected: Condition[] = [];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when having a condition with one operator, one key and one value', function() {
      it('should return one condition', function() {
        const input = {
          'operator': {'key': ['value']},
        };
        const expected = [new Condition('operator', 'key', ['value'])];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when having a condition with one operator, one key and two values', function() {
      it('should return one condition', function() {
        const input = {
          'operator': {'key': ['value1', 'value2']},
        };
        const expected = [new Condition('operator', 'key', ['value1', 'value2'])];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
  });
});
