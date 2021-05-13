import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';
import {ConditionJSONSerialiser} from '../../src/condition/serialiser';

describe('#ConditionJSONSerialiser', function() {
  describe('when condition has one value', function() {
    const condition = new Condition('StringLike', 'aws:userid', '12345');
    it('should return a JSON object', function() {
      const expected = {
        'StringLike': {'aws:userid': ['12345']},
      };
      expect(ConditionJSONSerialiser.toJSON(condition)).to.deep.equal(expected);
    });
  });

  describe('when condition has two values', function() {
    const condition = new Condition('StringLike', 'aws:userid', '12345', '67890');
    it('should return a JSON object', function() {
      const expected = {
        'StringLike': {'aws:userid': ['12345', '67890']},
      };
      expect(ConditionJSONSerialiser.toJSON(condition)).to.deep.equal(expected);
    });
  });
});
