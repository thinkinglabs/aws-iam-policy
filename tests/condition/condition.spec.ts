import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';

describe('#Condition', function() {
  describe('constructor', function() {
    describe('when test is empty', function() {
      it('should raise an error', function() {
        expect(() => new Condition('', 'key', ['value'])).to
            .throw(Error).with.property('message', 'test should not be empty');
      });
    });
    describe('when key is empty', function() {
      it('should raise an error', function() {
        expect(() => new Condition('test', '', ['value'])).to
            .throw(Error).with.property('message', 'key should not be empty');
      });
    });
    describe('when values is empty', function() {
      it('should raise an error', function() {
        expect(() => new Condition('test', 'key', [])).to
            .throw(Error).with.property('message', 'values should not be empty');
      });
    });
  });
});
