import {expect} from 'chai';

function validateAction(action: string): boolean {
  const iamActions = [
    'iam:CreateUser',
    'iam:DeleteUser',
    'iam:UpdateUser',
    'iam:CreateGroup',
    'iam:DeleteGroup',
    'iam:UpdateGroup',
    'iam:CreatePolicy',
    'iam:DeletePolicy',
    'iam:UpdatePolicy',
    'iam:CreateRole',
    'iam:DeleteRole',
    'iam:UpdateRole',
  ];
  const regexp = new RegExp(`^${action.replace('*', '.*').replaceAll('?', '.')}$`);
  const result = iamActions.reduce(
      (accumulator, currentValue) => accumulator || regexp.test(currentValue),
      false,
  );
  return result;
}

describe('#Action', () => {
  it('should validate iam:Create*', () => {
    expect(validateAction('iam:Create*')).to.be.true;
  });

  it('should not validate iam:Create?', () => {
    expect(validateAction('iam:Create?')).to.be.false;
  });

  it('should validate iam:Create????', () => {
    expect(validateAction('iam:Create????')).to.be.true;
  });
});
