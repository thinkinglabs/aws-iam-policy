import {expect} from 'chai';
import {Statement} from '../../src/statement/statement';
import {ArnPrincipal} from '../../src/principals/arn';
import {ServicePrincipal} from '../../src/principals/service';
import {RootAccountPrincipal} from '../../src/principals/root-account';
import {AccountPrincipal} from '../../src/principals/account';
import {Condition} from '../../src/condition/condition';

describe('#Statement', function() {
  describe('when serialising to JSON', function() {
    const statement = new Statement({
      sid: 'anSID',
      effect: 'Allow',
      principals: [
        new ArnPrincipal('arn:aws:iam::123456789000:user/aUser'),
        new RootAccountPrincipal('123456789000'),
        new AccountPrincipal('123456789000'),
        new ServicePrincipal('aservice.amazonaws.com'),
      ],
      actions: ['ec2:Describe*', 'ec2:Get*'],
      resources: [
        'arn:aws:ec2:eu-west-1:123456789000:instance/i-123456',
        'arn:aws:ec2:eu-west-1:123456789000:image/ami-123456',
      ],
      conditions: [
        new Condition('StringEquals', 'kms:CallerAccount', ['456252097346']),
        new Condition('StringEquals', 'kms:ViaService', ['secretsmanager.eu-west-1.amazonaws.com']),
        new Condition('StringNotEquals', 'aws:userid', ['anId1', 'anId2']),
      ],
    });

    it('should successfully pass a JSON round trip', function() {
      const json = JSON.stringify(statement.toJSON());
      const actual = Statement.fromJSON(JSON.parse(json));
      expect(actual).to.deep.equal(statement);
    });
  });

  describe('for identity-based policies', function() {
    const statement = new Statement({
      sid: 'ValidForIdentity',
      effect: 'Allow',
      actions: ['ec2:*'],
      resources: ['*'],
    });

    it('should be valid for identity-based policies', function() {
      expect(statement.validateForIdentityPolicy()).to.have.empty;
    });

    it('should be invalid for resource-based policies', function() {
      const errors = statement.validateForResourcePolicy();
      expect(errors).to.have.length(1);
      expect(errors[0]).to.equal(
          'Statement(ValidForIdentity) must specify at least one IAM principal.',
      );
    });
  });

  describe('for resource-based policies', function() {
    const statement = new Statement({
      sid: 'ValidForResource',
      effect: 'Allow',
      principals: [new ServicePrincipal('aservice.amazonaws.com')],
      actions: ['ec2:*'],
    });

    it('should be valid for resource-based policies', function() {
      expect(statement.validateForResourcePolicy()).to.have.empty;
    });

    it('should be invalid for identity-based policies', function() {
      const errors = statement.validateForIdentityPolicy();
      expect(errors).to.have.length(2);
      expect(errors[0]).to.equal(
          'Statement(ValidForResource) cannot specify any IAM principals.',
      );
      expect(errors[1]).to.equal(
          'Statement(ValidForResource) must specify at least one resource.',
      );
    });
  });

  describe('without actions', function() {
    const statement = new Statement({
      sid: 'Invalid',
      effect: 'Allow',
      principals: [new ArnPrincipal('arn:aws:iam::123456789000:user/aUser')],
      resources: ['*'],
    });

    it('should be invalid', function() {
      const errors = statement.validateForAnyPolicy();
      expect(errors).to.have.length(1);
      expect(errors[0]).to.equal(
          'Statement(Invalid) must specify at least one \'action\'.',
      );
    });
  });

  describe('when empty', function() {
    let statement: Statement;

    beforeEach(function() {
      statement = new Statement();
    });

    it('should have effect set by default to ALLOW', function() {
      expect(statement.effect).to.equal('Allow');
    });
  });
});
