import {expect} from 'chai';

describe('#Action', () => {
  it('should validate iam:Create*', () => {
    const action = 'iam:Create*';
    const validIamActions = [
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
    const actual = validIamActions.reduce(
        (accumulator, currentValue) => accumulator || new RegExp(`^${action.replace('*', '.*')}$`).test(currentValue),
        false,
    );
    expect(actual).to.be.true;
  });

  it('should not validate iam:Create?', () => {
    const action = 'iam:Create?';
    const validIamActions = [
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
    const actual = validIamActions.reduce(
        (accumulator, currentValue) => accumulator || new RegExp(`^${action.replaceAll('?', '.')}$`).test(currentValue),
        false,
    );
    expect(actual).to.be.false;
  });
});
