import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';

describe('#Condition', function() {
  describe('constructor', function() {
    describe('when operator is empty', function() {
      it('should raise an error', function() {
        expect(() => new Condition('', 'key', ['value'])).to
            .throw(Error).with.property('message', 'operator should not be empty');
      });
    });
    describe('when key is empty', function() {
      it('should raise an error', function() {
        expect(() => new Condition('operator', '', ['value'])).to
            .throw(Error).with.property('message', 'key should not be empty');
      });
    });
    describe('when values is empty', function() {
      it('should raise an error', function() {
        expect(() => new Condition('operator', 'key', [])).to
            .throw(Error).with.property('message', 'values should not be empty');
      });
    });
    describe('when values contains one empty string at position zero', function() {
      it('should raise an error', function() {
        expect(() => new Condition('operator', 'key', [''])).to
            .throw(Error).with.property('message', 'values should not have an empty string');
      });
    });
    describe('when values contains one empty string at position one', function() {
      it('should raise an error', function() {
        expect(() => new Condition('operator', 'key', ['value', ''])).to
            .throw(Error).with.property('message', 'values should not have an empty string');
      });
    });
    describe('when values contains multiple empty strings', function() {
      it('should raise an error', function() {
        expect(() => new Condition('operator', 'key', ['value1', '', 'value3', 'value4', ''])).to
            .throw(Error).with.property('message', 'values should not have an empty string');
      });
    });
  });

  describe('#toJSON', function() {
    describe('when condition has one value', function() {
      const condition = new Condition('StringLike', 'aws:userid', ['12345']);
      it('should return a JSON object', function() {
        const expected = {
          'StringLike': {'aws:userid': ['12345']},
        };
        expect(condition.toJSON()).to.deep.equal(expected);
      });
    });

    describe('when condition has two values', function() {
      const condition = new Condition('StringLike', 'aws:userid', ['12345', '67890']);
      it('should return a JSON object', function() {
        const expected = {
          'StringLike': {'aws:userid': ['12345', '67890']},
        };
        expect(condition.toJSON()).to.deep.equal(expected);
      });
    });
  });
});
