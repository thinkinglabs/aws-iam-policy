import {expect} from 'chai';
import {validate} from '../../src/statement/actions';

describe('#Action', () => {
  it('should validate iam:Create*', () => {
    expect(validate(['iam:Create*'])).to.be.empty;
  });

  it('should not validate iam:Create?', () => {
    expect(validate(['iam:Create?'])).to.be.deep.equal(['Invalid action \'iam:Create?\'']);
  });

  it('should validate iam:Create????', () => {
    expect(validate(['iam:Create????'])).to.be.empty;
  });

  it('should validate an array of valid actions', () => {
    expect(validate(['iam:CreateUser', 'iam:DeleteUser'])).to.be.empty;
  });

  it('should validate an array of valid actions with wildcards', () => {
    expect(validate([
      'iam:Create*',
      'iam:Delete*',
      'iam:UpdateRol?',
    ])).to.be.empty;
  });

  it('should not validate an array with invalid actions', () => {
    expect(validate([
      'iam:CreateRole',
      'iam:Delete?',
      'iam:Describe*',
      'iam:DescribeUser',
    ])).to.be.deep.equal([
      'Invalid action \'iam:Delete?\'',
      'Invalid action \'iam:Describe*\'',
      'Invalid action \'iam:DescribeUser\'',
    ]);
  });

  it('should validate qdeveloper:StartAgentSession', () => {
    expect(validate(['qdeveloper:StartAgentSession'])).to.be.empty;
  });

  it('should not validate ec2:ListInstances', () => {
    expect(validate(['ec2:ListInstances'])).to.be.deep.equal(['Invalid action \'ec2:ListInstances\'']);
  });

  it('should validate ec2', () => {
    expect(validate([
      'ec2:CreateVpc',
      'ec2:DescribeVpcs',
      'ec2:CreateSubnet',
      'ec2:DescribeSubnets',
      'ec2:CreateRouteTable',
      'ec2:AssociateRouteTable',
      'ec2:CreateRoute',
      'ec2:ReplaceRoute',
      'ec2:CreateSecurityGroup',
      'ec2:AuthorizeSecurityGroupIngress',
      'ec2:AuthorizeSecurityGroupEgress',
      'ec2:RevokeSecurityGroupIngress',
      'ec2:RevokeSecurityGroupEgress',
      'ec2:AllocateAddress',
      'ec2:AssociateAddress',
      'ec2:CreateInternetGateway',
      'ec2:AttachInternetGateway',
      'ec2:CreateNatGateway',
      'ec2:AssociateNatGatewayAddress',
      'ec2:RunInstances',
      'ec2:StartInstances',
      'ec2:StopInstances',
      'ec2:TerminateInstances',
      'ec2:RebootInstances',
      'ec2:DescribeInstances',
    ])).to.be.empty;
  });

  it('should not validate logs:UpdateLogGroup', () => {
    expect(validate(['logs:UpdateLogGroup'])).to.be.deep.equal(['Invalid action \'logs:UpdateLogGroup\'']);
  });

  it('should validate logs', () => {
    expect(validate([
      'logs:CreateLogGroup',
      'logs:DescribeLogGroups',
      'logs:CreateLogStream',
      'logs:PutLogEvents',
    ])).to.be.empty;
  });

  it('should not validate s3:ListBuckets', () => {
    expect(validate(['s3:ListBuckets'])).to.be.deep.equal(['Invalid action \'s3:ListBuckets\'']);
  });

  it('should validate s3', () => {
    expect(validate([
      's3:CreateBucket',
      's3:ListBucket',
      's3:GetObject',
      's3:PutObject',
      's3:DeleteObject',
    ])).to.be.empty;
  });

  it('should not validate ecs:ModifyService', () => {
    expect(validate(['ecs:ModifyService'])).to.be.deep.equal(['Invalid action \'ecs:ModifyService\'']);
  });

  it('should validate ecs', () => {
    expect(validate([
      'ecs:CreateCluster',
      'ecs:ListClusters',
      'ecs:DescribeClusters',
      'ecs:UpdateCluster',
      'ecs:RegisterTaskDefinition',
      'ecs:CreateService',
      'ecs:UpdateService',
      'ecs:StartTask',
      'ecs:StopTask',
    ])).to.be.empty;
  });

  it('should not validate kms:DescribeKeys', () => {
    expect(validate(['kms:DescribeKeys'])).to.be.deep.equal(['Invalid action \'kms:DescribeKeys\'']);
  });

  it('should validate kms', () => {
    expect(validate([
      'kms:ListKeys',
      'kms:DescribeKey',
      'kms:Encrypt',
      'kms:Decrypt',
      'kms:GenerateDataKey',
    ])).to.be.empty;
  });

  it('should not validate ecr:ListRepositories', () => {
    expect(validate(['ecr:ListRepositories'])).to.be.deep.equal(['Invalid action \'ecr:ListRepositories\'']);
  });

  it('should validate ecr', () => {
    expect(validate([
      'ecr:GetAuthorizationToken',
      'ecr:GetDownloadUrlForLayer',
      'ecr:BatchGetImage',
      'ecr:BatchCheckLayerAvailability',
      'ecr:ListImages',
      'ecr:DescribeImages',
    ])).to.be.empty;
  });

  it('should not validate lambda:DescribeFunctions', () => {
    expect(validate(['lambda:DescribeFunctions'])).to.be.deep.equal(['Invalid action \'lambda:DescribeFunctions\'']);
  });

  it('should validate lambda', () => {
    expect(validate([
      'lambda:Get*',
      'lambda:List*',
      'lambda:Create*',
      'lambda:Publish*',
      'lambda:Update*',
      'lambda:Put*',
      'lambda:AddPermission',
      'lambda:RemovePermission',
      'lambda:InvokeFunction',
    ])).to.be.empty;
  });

  it('should not validate rds:ListDBInstances', () => {
    expect(validate(['rds:ListDBInstances'])).to.be.deep.equal(['Invalid action \'rds:ListDBInstances\'']);
  });

  it('should validate rds', () => {
    expect(validate([
      'rds:CreateDBInstance',
      'rds:ModifyDBInstance',
      'rds:DescribeDBInstances',
      'rds:ListTagsForResource',
      'rds:AddTagsToResource',
      'rds:DescribeDBSnapshots',
      'rds:CreateDBSnapshot',
      'rds:CopyDBSnapshot',
    ])).to.be.empty;
  });
});
