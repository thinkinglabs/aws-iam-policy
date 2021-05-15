import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';
import {ConditionJSONDeserialiser} from '../../src/condition/deserialiser';

describe('#ConditionJSONDeserialiser', function() {
  describe('#fromJSON', function() {
    describe('when having an undefined Condition', function() {
      it('should return an empty array', function() {
        const input = undefined;
        const expected: Condition[] = [];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when having a Condition with one operator, one key and one value', function() {
      it('should return one Condition', function() {
        const input = {
          'operator': {'key': ['value']},
        };
        const expected = [new Condition('operator', 'key', ['value'])];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when having a Condition with one operator, one key and two values', function() {
      it('should return one Condition', function() {
        const input = {
          'operator': {'key': ['value1', 'value2']},
        };
        const expected = [new Condition('operator', 'key', ['value1', 'value2'])];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when having a Condition with one operator, two keys each with one value', function() {
      it('should return two conditions', function() {
        const input = {
          'operator': {'key1': ['value1'], 'key2': ['value2']},
        };
        const expected = [
          new Condition('operator', 'key1', ['value1']),
          new Condition('operator', 'key2', ['value2']),
        ];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when having a Condition with two operators each with one key and one value', function() {
      it('should return two conditions', function() {
        const input = {
          'operator1': {'key1': ['value1']},
          'operator2': {'key2': ['value2']},
        };
        const expected = [
          new Condition('operator1', 'key1', ['value1']),
          new Condition('operator2', 'key2', ['value2']),
        ];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when having a Condition with two operators each with two keys and two values', function() {
      it('should return two conditions', function() {
        const input = {
          'operator1': {'key11': ['value111', 'value112'], 'key12': ['value121', 'value122']},
          'operator2': {'key21': ['value211', 'value212'], 'key22': ['value221', 'value222']},
        };
        const expected = [
          new Condition('operator1', 'key11', ['value111', 'value112']),
          new Condition('operator1', 'key12', ['value121', 'value122']),
          new Condition('operator2', 'key21', ['value211', 'value212']),
          new Condition('operator2', 'key22', ['value221', 'value222']),
        ];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when Condition is a string', function() {
      it('should throw an Error', function() {
        const input = 'condition';
        expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
            .with.property(
                'message',
                'Unsupported type string: expecting an object {[operator:string]: {[key:string]:string[]}}');
      });
    });
  });
});
