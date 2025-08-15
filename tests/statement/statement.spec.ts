import {expect} from 'chai';
import {
  Statement,
  ArnPrincipal,
  UserPrincipal,
  ServicePrincipal,
  RootAccountPrincipal,
  AccountPrincipal,
  WildcardPrincipal,
  Condition,
  PolicyType,
} from '../../src';

describe('#Statement', function() {
  describe('when serialising to JSON', function() {
    const statement = new Statement({
      sid: 'anSID',
      effect: 'Allow',
      principals: [
        new UserPrincipal('123456789000', 'aUser'),
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
          'Statement(ValidForIdentity) must specify at least one \'principal\' or \'notprincipal\'.',
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
          'Statement(ValidForResource) cannot specify any \'principal\' or \'notprincipal\'.',
      );
      expect(errors[1]).to.equal(
          'Statement(ValidForResource) must specify at least one \'resource\' or \'notresource\'.',
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
          'Statement(Invalid) must specify at least one \'action\' or \'notaction\'.',
      );
    });
  });

  describe('with actions', function() {
    describe('with valid iam actions', function() {
      const statement = new Statement({
        sid: 'ValidIAMActions',
        effect: 'Allow',
        actions: ['iam:ListUsers', 'iam:*User'],
        resources: ['*'],
      });

      it('should be invalid', function() {
        expect(statement.validateForAnyPolicy()).to.be.empty;
      });
    });
    describe('with invalid iam actions', function() {
      const statement = new Statement({
        sid: 'ValidIAMActions',
        effect: 'Allow',
        actions: ['iam:DescribeUsers', 'iam:*Principal'],
        resources: ['*'],
      });

      it('should be invalid', function() {
        expect(statement.validateForAnyPolicy()).to.be.deep.equal([
          'Invalid action \'iam:DescribeUsers\'',
          'Invalid action \'iam:*Principal\'',
        ]);
      });
    });
  });

  describe('with notactions', function() {
    describe('with valid iam actions', function() {
      const statement = new Statement({
        sid: 'ValidIAMActions',
        effect: 'Allow',
        notactions: ['iam:ListUsers', 'iam:*User'],
        resources: ['*'],
      });

      it('should be invalid', function() {
        expect(statement.validateForAnyPolicy()).to.be.empty;
      });
    });
    describe('with invalid iam actions', function() {
      const statement = new Statement({
        sid: 'ValidIAMActions',
        effect: 'Allow',
        notactions: ['iam:DescribeUsers', 'iam:*Principal'],
        resources: ['*'],
      });

      it('should be invalid', function() {
        expect(statement.validateForAnyPolicy()).to.be.deep.equal([
          'Invalid action \'iam:DescribeUsers\'',
          'Invalid action \'iam:*Principal\'',
        ]);
      });
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

  describe('when Sid has alphanumeric characters', function() {
    it('should be valid for an identity based policies', function() {
      const statement = new Statement({
        sid: 'ValidForIdentity',
        effect: 'Allow',
        actions: ['ec2:*'],
        resources: ['*'],
      });
      expect(statement.validateForIdentityPolicy()).to.be.empty;
    });
    it('should be valid for a SecretsManager secret policy', function() {
      const statement = new Statement({
        sid: 'ValidForSecret',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['secretsmanager:GetSecretValue'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.SecretsManager)).to.be.empty;
    });
    it('should be valid for an S3 bucket policy', function() {
      const statement = new Statement({
        sid: 'ValidForBucket',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['s3:GetObject'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.S3)).to.be.empty;
    });
    it('should be valid for a KMS key policy', function() {
      const statement = new Statement({
        sid: 'ValidForKey',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['kms:Decrypt'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.KMS)).to.be.empty;
    });
  });

  describe('when Sid has alphanumeric characters with spaces', function() {
    it('should be invalid for an identity based policies', function() {
      const statement = new Statement({
        sid: 'Invalid for Identity',
        effect: 'Allow',
        actions: ['ec2:*'],
        resources: ['*'],
      });
      expect(statement.validateForIdentityPolicy()).to.deep.equal([
        'Statement(Invalid for Identity) should only accept alphanumeric characters for \'sid\'' +
        ' in the case of an IAM policy.',
      ]);
    });
    it('should be invalid for a SecretsManager secret policy', function() {
      const statement = new Statement({
        sid: 'Invalid for Secret',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['secretsmanager:GetSecretValue'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.SecretsManager)).to.deep.equal([
        'Statement(Invalid for Secret) should only accept alphanumeric characters for \'sid\'' +
        ' in the case of a SecretsManager secret policy.',
      ]);
    });
    it('should be valid for an S3 bucket policy', function() {
      const statement = new Statement({
        sid: 'Valid for Bucket',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['s3:GetObject'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.S3)).to.be.empty;
    });
    it('should be valid for a KMS key policy', function() {
      const statement = new Statement({
        sid: 'Valid For Key',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['kms:Decrypt'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.KMS)).to.be.empty;
    });
  });
  describe('when Sid has non-alphanumeric characters', function() {
    it('should be invalid for an identity based policies', function() {
      const statement = new Statement({
        sid: 'Invalid for Identity!',
        effect: 'Allow',
        actions: ['ec2:*'],
        resources: ['*'],
      });
      expect(statement.validateForIdentityPolicy()).to.deep.equal([
        'Statement(Invalid for Identity!) should only accept alphanumeric characters for \'sid\'' +
        ' in the case of an IAM policy.',
      ]);
    });
    it('should be invalid for a SecretsManager secret policy', function() {
      const statement = new Statement({
        sid: 'Invalid for Secret!',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['secretsmanager:GetSecretValue'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.SecretsManager)).to.deep.equal([
        'Statement(Invalid for Secret!) should only accept alphanumeric characters for \'sid\'' +
        ' in the case of a SecretsManager secret policy.',
      ]);
    });
    it('should be invalid for an S3 bucket policy', function() {
      const statement = new Statement({
        sid: 'Invalid for Bucket!',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['s3:GetObject'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.SecretsManager)).to.deep.equal([
        'Statement(Invalid for Bucket!) should only accept alphanumeric characters for \'sid\'' +
        ' in the case of a SecretsManager secret policy.',
      ]);
    });
    it('should be invalid for a KMS key policy', function() {
      const statement = new Statement({
        sid: 'Invalid for Key!',
        effect: 'Allow',
        principals: [new ServicePrincipal('aservice.amazonaws.com')],
        actions: ['kms:Decrypt'],
      });
      expect(statement.validateForResourcePolicy(PolicyType.KMS)).to.deep.equal([
        'Statement(Invalid for Key!) should only accept alphanumeric characters and spaces for \'sid\'' +
        ' in the case of a KMS key policy.',
      ]);
    });
  });

  describe('when principal contains only a wildcard principal', function() {
    it('should not throw an Error', function() {
      expect(() => new Statement({
        principals: [new WildcardPrincipal()],
        actions: ['*'],
        resources: ['*'],
      })).to.not.throw(Error);
    });
  });

  describe('when principal contains non-wildcard principals', function() {
    it('should not throw an Error', function() {
      expect(() => new Statement({
        principals: [
          new ArnPrincipal('arn:aws:iam::123456789000:user/aUser'),
          new RootAccountPrincipal('123456789000'),
          new AccountPrincipal('123456789000'),
          new ServicePrincipal('aservice.amazonaws.com'),
        ],
        actions: ['*'],
        resources: ['*'],
      })).to.not.throw(Error);
    });
  });

  describe('when principal contains a wildcard principal together with another principal', function() {
    it('should throw an Error', function() {
      expect(() => new Statement({
        principals: [
          new WildcardPrincipal(),
          new ArnPrincipal('arn:aws:iam::123456789000:user/aUser'),
        ],
        actions: ['*'],
        resources: ['*'],
      })).to.throw(Error)
          .with.property('message', 'In case of the AnonymousPrincipal there can only be one principal');
    });
  });

  describe('when notprincipal contains only a wildcard principal', function() {
    it('should not throw an Error', function() {
      expect(() => new Statement({
        notprincipals: [new WildcardPrincipal()],
        actions: ['*'],
        resources: ['*'],
      })).to.not.throw(Error);
    });
  });

  describe('when notprincipal contains non-wildcard principals', function() {
    it('should not throw an Error', function() {
      expect(() => new Statement({
        notprincipals: [
          new ArnPrincipal('arn:aws:iam::123456789000:user/aUser'),
          new RootAccountPrincipal('123456789000'),
          new AccountPrincipal('123456789000'),
          new ServicePrincipal('aservice.amazonaws.com'),
        ],
        actions: ['*'],
        resources: ['*'],
      })).to.not.throw(Error);
    });
  });

  describe('when notprincipal contains a wildcard principal together with another principal', function() {
    it('should throw an Error', function() {
      expect(() => new Statement({
        notprincipals: [
          new WildcardPrincipal(),
          new ArnPrincipal('arn:aws:iam::123456789000:user/aUser'),
        ],
        actions: ['*'],
        resources: ['*'],
      })).to.throw(Error)
          .with.property('message', 'In case of the AnonymousPrincipal there can only be one principal');
    });
  });
});
