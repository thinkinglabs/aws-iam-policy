import {expect} from 'chai';
import { normalise } from '../src/normaliser';

describe('#normalise', function() {
  describe('when an object is undefined', function() {
    it('should return undefined', function() {
      expect(normalise(undefined)).to.be.undefined;
    });
  });

  describe('when an object has no properties', function() {
    it('should return undefined', function() {
      expect(normalise({})).to.be.undefined;
    });
  });

  describe('when an object has one property', function() {
    it('should return the object', function() {
      const obj = {aProperty: ''};
      const expected = Object.assign(obj);
      expect(normalise(obj)).to.deep.equal(expected);
    });
  });

  describe('when an object has two properties', function() {
    it('should return the object', function() {
      const obj = {property1: 'a string', property2: 1};
      const expected = Object.assign(obj);
      expect(normalise(obj)).to.deep.equal(expected);
    });
  });

  describe('when an object is an empty array', function() {
    it('should return undefined', function() {
      expect(normalise([])).to.be.undefined;
    });
  });

  describe('when an object is an array having one element', function() {
    it('should return undefined', function() {
      const obj = ['a string'];
      const expected = [...obj];
      expect(normalise(obj)).to.deep.eq(expected);
    });
  });

  describe('when an object is an array having two elements', function() {
    it('should return undefined', function() {
      const obj = [1, 2];
      const expected = [...obj];
      expect(normalise(obj)).to.deep.eq(expected);
    });
  });
});
