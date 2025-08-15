import {expect} from 'chai';
import {validateActions} from '../../src/statement/actions';

describe('#Action', () => {
  it('should validate iam:Create*', () => {
    expect(validateActions(['iam:Create*'])).to.be.empty;
  });

  it('should not validate iam:Create?', () => {
    expect(validateActions(['iam:Create?'])).to.be.deep.equal(['Invalid action \'iam:Create?\'']);
  });

  it('should validate iam:Create????', () => {
    expect(validateActions(['iam:Create????'])).to.be.empty;
  });

  it('should validate an array of valid actions', () => {
    expect(validateActions(['iam:CreateUser', 'iam:DeleteUser'])).to.be.empty;
  });

  it('should validate an array of valid actions with wildcards', () => {
    expect(validateActions([
      'iam:Create*',
      'iam:Delete*',
      'iam:UpdateRol?',
    ])).to.be.empty;
  });

  it('should not validate an array with invalid actions', () => {
    expect(validateActions([
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

  it('should valiate qdeveloper:StartAgentSession', () => {
    expect(validateActions(['qdeveloper:StartAgentSession'])).to.be.empty;
  });
});
