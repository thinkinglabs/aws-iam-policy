import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';
import {ArnPrincipal} from '../../src/principals/arn';
import {StatementJSONSerialiser} from '../../src/statement/serialiser';
import {Statement} from '../../src/statement/statement';

describe('#StatementJSONSerialiser', function() {
  describe('when statement is empty', function() {
    const statement = new Statement();
    it('should return a JSON object with default Effect and undefined properties', function() {
      const expected = {
        Sid: undefined,
        Effect: 'Allow',
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
        Effect: 'Allow',
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
        Effect: 'Allow',
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
      conditions: [new Condition('operator', 'key', ['value'])],
    });
    it('should return a JSON object', function() {
      const expected = {
        Sid: undefined,
        Effect: 'Allow',
        Principal: {AWS: ['arn:aws:iam::98765432100:user/user1']},
        Action: ['action1'],
        Resource: ['resource1'],
        Condition: {operator: {key: ['value']}},
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });
});
