import {expect} from 'chai';
import {ConditionJSONDeserialiser} from '../../src/condition/deserialiser';

describe('#ConditionJSONDeserialiser', function() {
  describe('#fromJSON', function() {
    describe('when having an undefined condition', function() {
      it('should return an empty array', function() {
        expect(ConditionJSONDeserialiser.fromJSON(undefined)).to.deep.equal([]);
      });
    });
  });
});
