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
});
