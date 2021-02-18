import {expect} from 'chai';
import {ArnPrincipal} from '../../src/principals/arn';
import {StatementJSONSerialiser} from '../../src/statement/serialiser';
import {Statement} from '../../src/statement/statement';
import {Effect} from '../../src/statement/types';

describe('#StatementJSONSerialiser', function() {
  describe('when statement is empty', function() {
    const statement = new Statement();
    it('should return a JSON object with default Effect and undefined properties', function() {
      const expected = {
        Sid: undefined,
        Effect: Effect.ALLOW,
        Principal: undefined,
        Action: undefined,
        Resource: undefined,
        Condition: undefined,
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement has an Sid', function() {
    const statement = new Statement({sid: 'an sid'});
    it('should return a JSON object with an Sid', function() {
      const expected = {
        Sid: 'an sid',
        Effect: Effect.ALLOW,
        Principal: undefined,
        Action: undefined,
        Resource: undefined,
        Condition: undefined,
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement has an empty array for Principal, Action and Resource', function() {
    const statement = new Statement({principals: [], actions: [], resources: []});
    it('should return a JSON object with undefined Principal, Action and Resource', function() {
      const expected = {
        Sid: undefined,
        Effect: Effect.ALLOW,
        Principal: undefined,
        Action: undefined,
        Resource: undefined,
        Condition: undefined,
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement is non empty', function() {
    const statement = new Statement({
      principals: [new ArnPrincipal('arn:aws:iam::98765432100:user/user1')],
      actions: ['action1'],
      resources: ['resource1'],
      conditions: {ConditionOperator: {ConditionKey: ['condition-value']}},
    });
    it('should return a JSON object with undefined Principal, Action and Resource', function() {
      const expected = {
        Sid: undefined,
        Effect: Effect.ALLOW,
        Principal: {AWS: ['arn:aws:iam::98765432100:user/user1']},
        Action: ['action1'],
        Resource: ['resource1'],
        Condition: {ConditionOperator: {ConditionKey: ['condition-value']}},
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement has a Condition', function() {
    describe('and Condition is an empty object', function() {
      const statement = new Statement({conditions: {}});
      it('should return a JSON object with undefined Condition', function() {
        const expected = {
          Sid: undefined,
          Effect: Effect.ALLOW,
          Principal: undefined,
          Action: undefined,
          Resource: undefined,
          Condition: undefined,
        };
        expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
      });
    });

    describe('and Condition has an operator', function() {
      describe('and operator has an undefined value', function() {
        const statement = new Statement({conditions: {Operator: undefined}});
        it('should return a JSON object having a Condition with operator having an undefined value', function() {
          const expected = {
            Sid: undefined,
            Effect: Effect.ALLOW,
            Principal: undefined,
            Action: undefined,
            Resource: undefined,
            Condition: {Operator: undefined},
          };
          expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
        });
      });

      describe('and operator has an empty object value', function() {
        const statement = new Statement({conditions: {Operator: {}}});
        it('should return a JSON object having a Condition with operator having an empty object', function() {
          const expected = {
            Sid: undefined,
            Effect: Effect.ALLOW,
            Principal: undefined,
            Action: undefined,
            Resource: undefined,
            Condition: {Operator: {}},
          };
          expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
        });
      });

      describe('and operator has a condition key', function() {
        describe('and condition key is undefined', function() {
          const statement = new Statement({conditions: {Operator: {ConditionKey: undefined}}});
          it('should return a JSON object having a Condition with undefined condition key', function() {
            const expected = {
              Sid: undefined,
              Effect: Effect.ALLOW,
              Principal: undefined,
              Action: undefined,
              Resource: undefined,
              Condition: {Operator: {ConditionKey: undefined}},
            };
            expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
          });
        });
      });

      describe('and condition key is a string', function() {
        describe('and the string is empty', function() {
          const statement = new Statement({conditions: {Operator: {ConditionKey: ''}}});
          it('should return a JSON object having a Condition with condition key having an empty string', function() {
            const expected = {
              Sid: undefined,
              Effect: Effect.ALLOW,
              Principal: undefined,
              Action: undefined,
              Resource: undefined,
              Condition: {Operator: {ConditionKey: ''}},
            };
            expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
          });
        });

        describe('and the string is not empty', function() {
          const statement = new Statement({conditions: {Operator: {ConditionKey: 'condition-value'}}});
          it('should return a JSON object having a Condition with condition key having a non-empty string', function() {
            const expected = {
              Sid: undefined,
              Effect: Effect.ALLOW,
              Principal: undefined,
              Action: undefined,
              Resource: undefined,
              Condition: {Operator: {ConditionKey: 'condition-value'}},
            };
            expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
          });
        });
      });

      describe('and condition key is an array', function() {
        describe('and the array is empty', function() {
          const statement = new Statement({conditions: {Operator: {ConditionKey: []}}});
          it('should return a JSON object having a Condition with condition key having an empty array', function() {
            const expected = {
              Sid: undefined,
              Effect: Effect.ALLOW,
              Principal: undefined,
              Action: undefined,
              Resource: undefined,
              Condition: {Operator: {ConditionKey: []}},
            };
            expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
          });
        });

        describe('and the array is not empty', function() {
          const statement = new Statement({conditions: {Operator: {ConditionKey: ['condition-value']}}});
          it('should return a JSON object having a Condition with condition key having a non-empty array', function() {
            const expected = {
              Sid: undefined,
              Effect: Effect.ALLOW,
              Principal: undefined,
              Action: undefined,
              Resource: undefined,
              Condition: {Operator: {ConditionKey: ['condition-value']}},
            };
            expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
          });
        });
      });

      describe('and condition key is an object', function() {
        describe('and the object is empty', function() {
          const statement = new Statement({conditions: {Operator: {ConditionKey: {}}}});
          it('should return a JSON object having a Condition with condition key having an empty object', function() {
            const expected = {
              Sid: undefined,
              Effect: Effect.ALLOW,
              Principal: undefined,
              Action: undefined,
              Resource: undefined,
              Condition: {Operator: {ConditionKey: {}}},
            };
            expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
          });
        });

        describe('and the object is not empty', function() {
          const statement = new Statement({conditions: {Operator: {ConditionKey: {property: 'value'}}}});
          it('should return a JSON object having a Condition with condition key having a non-empty object', function() {
            const expected = {
              Sid: undefined,
              Effect: Effect.ALLOW,
              Principal: undefined,
              Action: undefined,
              Resource: undefined,
              Condition: {Operator: {ConditionKey: {property: 'value'}}},
            };
            expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
          });
        });
      });
    });
  });
});
