import {expect} from 'chai';
import {StatementJSONSerialiser} from '../../src/statement/serialiser';
import {
  Statement,
  ArnPrincipal,
  WildcardPrincipal,
  Condition,
} from '../../src';

describe('#StatementJSONSerialiser', function() {
  describe('when statement is empty', function() {
    const statement = new Statement();
    it('should return a JSON object with default Effect and undefined properties', function() {
      const expected = {
        Sid: undefined,
        Effect: 'Allow',
        Principal: undefined,
        NotPrincipal: undefined,
        Action: undefined,
        NotAction: undefined,
        Resource: undefined,
        NotResource: undefined,
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
        NotPrincipal: undefined,
        Action: undefined,
        NotAction: undefined,
        Resource: undefined,
        NotResource: undefined,
        Condition: undefined,
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement has an empty array for Principal, NotPrincipal, Action and Resource', function() {
    const statement = new Statement({principals: [], notprincipals: [], actions: [], resources: []});
    it('should return a JSON object with undefined Principal, NotPrincipal, Action and Resource', function() {
      const expected = {
        Sid: undefined,
        Effect: 'Allow',
        Principal: undefined,
        NotPrincipal: undefined,
        Action: undefined,
        NotAction: undefined,
        Resource: undefined,
        NotResource: undefined,
        Condition: undefined,
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement has a resource', function() {
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
        Principal: {AWS: 'arn:aws:iam::98765432100:user/user1'},
        NotPrincipal: undefined,
        Action: ['action1'],
        NotAction: undefined,
        Resource: ['resource1'],
        NotResource: undefined,
        Condition: {operator: {key: ['value']}},
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement has a notresource', function() {
    const statement = new Statement({
      principals: [new ArnPrincipal('arn:aws:iam::98765432100:user/user1')],
      actions: ['action1'],
      notresources: ['resource1'],
      conditions: [new Condition('operator', 'key', ['value'])],
    });
    it('should return a JSON object', function() {
      const expected = {
        Sid: undefined,
        Effect: 'Allow',
        Principal: {AWS: 'arn:aws:iam::98765432100:user/user1'},
        NotPrincipal: undefined,
        Action: ['action1'],
        NotAction: undefined,
        Resource: undefined,
        NotResource: ['resource1'],
        Condition: {operator: {key: ['value']}},
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });

  describe('when statement has an WildcardPrincipal', function() {
    const statement = new Statement({
      principals: [new WildcardPrincipal()],
    });
    it('should return a JSON object having the wild card principal', function() {
      const expected = {
        Sid: undefined,
        Effect: 'Allow',
        Principal: '*',
        NotPrincipal: undefined,
        Action: undefined,
        NotAction: undefined,
        Resource: undefined,
        NotResource: undefined,
        Condition: undefined,
      };
      expect(StatementJSONSerialiser.toJSON(statement)).to.deep.equal(expected);
    });
  });
});
