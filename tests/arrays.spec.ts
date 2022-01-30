import {expect} from 'chai';
import {parseArray} from '../src/arrays';

describe('arrays', function() {
  describe('#parse', function() {
    describe('when an object is undefined', function() {
      it('should return an empty array', function() {
        const input = undefined;
        expect(parseArray(input)).to.be.an('array').that.is.empty;
      });
    });

    describe('when an object is a string', function() {
      it('should return a 1-length array', function() {
        const input= 'foobar';
        expect(parseArray(input)).to.be.an('array').that.deep.equal(['foobar']);
      });
    });

    describe('when an object is an array', function() {
      describe('of strings', function() {
        it('should return the array of strings', function() {
          const input = ['foo', 'bar'];
          const expected = ['foo', 'bar'];
          expect(parseArray(input)).to.be.an('array').that.deep.equal(expected);
        });
      });

      describe('of numbers', function() {
        it('should throw an Error', function() {
          const input = [1, 2];
          expect(() => parseArray(input)).to.throw(Error)
              .with.property('message', 'Unsupported type: expecting an array of strings');
        });
      });

      describe('of objects', function() {
        it('should throw an Error', function() {
          const input = [{aProperty: 'aValue'}, {anotherProperty: 'anotherValue'}];
          expect(() => parseArray(input)).to.throw(Error)
              .with.property('message', 'Unsupported type: expecting an array of strings');
        });
      });
    });

    describe('when an object is a number', function() {
      it('should throw an Error', function() {
        const input = 1234;
        expect(() => parseArray(input)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array or a string');
      });
    });

    describe('when an object is an object', function() {
      it('should throw an Error', function() {
        const input = {aProperty: 'aValue'};
        expect(() => parseArray(input)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array or a string');
      });
    });
  });
});
