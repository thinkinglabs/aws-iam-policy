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
    describe('when values contains one empty string at position zero', function() {
      it('should raise an error', function() {
        expect(() => new Condition('test', 'key', [''])).to
            .throw(Error).with.property('message', 'values should not have an empty string');
      });
    });
    describe('when values contains one empty string at position one', function() {
      it('should raise an error', function() {
        expect(() => new Condition('test', 'key', ['value', ''])).to
            .throw(Error).with.property('message', 'values should not have an empty string');
      });
    });
    describe('when values contains multiple empty strings', function() {
      it('should raise an error', function() {
        expect(() => new Condition('test', 'key', ['value1', '', 'value3', 'value4', ''])).to
            .throw(Error).with.property('message', 'values should not have an empty string');
      });
    });
  });
});
