import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';
import {ConditionJSONDeserialiser} from '../../src/condition/deserialiser';

describe('#ConditionJSONDeserialiser', function() {
  describe('#fromJSON', function() {
    describe('when Condition is undefined', function() {
      it('should return an empty array', function() {
        const input = undefined;
        const expected: Condition[] = [];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when Condition is a string', function() {
      it('should throw an Error', function() {
        const input = 'condition';
        expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
            .with.property(
                'message',
                'Unsupported Condition type string: expecting an object {[operator:string]: {[key:string]:string[]}}');
      });
    });
    describe('when Condition is a number', function() {
      it('should throw an Error', function() {
        const input = 1234;
        expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
            .with.property(
                'message',
                'Unsupported Condition type number: expecting an object {[operator:string]: {[key:string]:string[]}}');
      });
    });
    describe('when Condition is an array', function() {
      it('should throw an Error', function() {
        const input = ['condition'];
        expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
            .with.property(
                'message',
                'Unsupported Condition type array: expecting an object {[operator:string]: {[key:string]:string[]}}');
      });
    });
    describe('when Condition is an object', function() {
      describe('and it is empty', function() {
        it('should return an empty array', function() {
          const input = {};
          const expected: Condition[] = [];
          expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
        });
      });
      describe('and it has an operator property', function() {
        describe('and its value is undefined', function() {
          it('should throw an Error', function() {
            const input = {operator: undefined};
            expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                .with.property(
                    'message',
                    'Unsupported Condition operator type undefined: expecting an object {[key:string]:string[]}');
          });
        });
        describe('and its value is a string', function() {
          it('should throw an Error', function() {
            const input = {operator: 'value'};
            expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                .with.property(
                    'message',
                    'Unsupported Condition operator type string: expecting an object {[key:string]:string[]}');
          });
        });
        describe('and its value is a number', function() {
          it('should throw an Error', function() {
            const input = {operator: 12345};
            expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                .with.property(
                    'message',
                    'Unsupported Condition operator type number: expecting an object {[key:string]:string[]}');
          });
        });
        describe('and its value is an array', function() {
          it('should throw an Error', function() {
            const input = {operator: ['value']};
            expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                .with.property(
                    'message',
                    'Unsupported Condition operator type array: expecting an object {[key:string]:string[]}');
          });
        });
        describe('and its value is an object', function() {
          describe('and it is empty', function() {
            it('should return an empty array', function() {
              const input = {operator: {}};
              const expected: Condition[] = [];
              expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
            });
          });
          describe('and it has a key property', function() {
            describe('and its value is undefined', function() {
              it('should throw an Error', function() {
                const input = {operator: {key: undefined}};
                expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                    .with.property(
                        'message',
                        'Unsupported type: expecting an array');
              });
            });
            describe('and its value is an object', function() {
              it('should throw an Error', function() {
                const input = {operator: {key: {}}};
                expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                    .with.property(
                        'message',
                        'Unsupported type: expecting an array');
              });
            });
            describe('and its value is an array', function() {
              describe('and it is empty', function() {
                it('should throw an Error', function() {
                  const input = {operator: {key: []}};
                  expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                      .with.property(
                          'message',
                          'values should not be empty');
                });
              });
              describe('and it contains a number', function() {
                it('should throw an Error', function() {
                  const input = {operator: {key: [12345]}};
                  expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                      .with.property(
                          'message',
                          'Unsupported type: expecting an array of strings');
                });
              });
              describe('and it contains an object', function() {
                it('should throw an Error', function() {
                  const input = {operator: {key: [{}]}};
                  expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                      .with.property(
                          'message',
                          'Unsupported type: expecting an array of strings');
                });
              });
              describe('and it contains an undefined value', function() {
                it('should throw an Error', function() {
                  const input = {operator: {key: [undefined, 'value']}};
                  expect(() => ConditionJSONDeserialiser.fromJSON(input)).to.throw(Error)
                      .with.property(
                          'message',
                          'Unsupported type: expecting an array of strings');
                });
              });
            });
          });
        });
      });
    });
    describe('when Condition has one operator, one key and one value', function() {
      it('should return one Condition', function() {
        const input = {
          operator: {key: ['value']},
        };
        const expected = [new Condition('operator', 'key', ['value'])];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when Condition has one operator, one key and two values', function() {
      it('should return one Condition', function() {
        const input = {
          operator: {key: ['value1', 'value2']},
        };
        const expected = [new Condition('operator', 'key', ['value1', 'value2'])];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when Condition has one operator, two keys each with one value', function() {
      it('should return two conditions', function() {
        const input = {
          operator: {key1: ['value1'], key2: ['value2']},
        };
        const expected = [
          new Condition('operator', 'key1', ['value1']),
          new Condition('operator', 'key2', ['value2']),
        ];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when Condition has two operators each with one key and one value', function() {
      it('should return two conditions', function() {
        const input = {
          operator1: {key1: ['value1']},
          operator2: {key2: ['value2']},
        };
        const expected = [
          new Condition('operator1', 'key1', ['value1']),
          new Condition('operator2', 'key2', ['value2']),
        ];
        expect(ConditionJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });
    describe('when Condition has two operators each with two keys and two values', function() {
      it('should return two conditions', function() {
        const input = {
          operator1: {key11: ['value111', 'value112'], key12: ['value121', 'value122']},
          operator2: {key21: ['value211', 'value212'], key22: ['value221', 'value222']},
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
  });
});
