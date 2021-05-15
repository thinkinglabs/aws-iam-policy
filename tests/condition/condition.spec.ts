import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';

describe('#Condition', function() {
  describe('constructor', function() {
    describe('when test is empty', function() {
      it('should raise an error', function() {
        expect(() => new Condition('', 'key', 'value')).to
            .throw(Error).with.property('message', 'Empty test');
      });
    });
  });
});
