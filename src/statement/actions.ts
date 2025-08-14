
export function validate(actions: string[]): string[] {
  const result = actions.reduce(
    (accumulator, action) => {
      const valid = action.startsWith('iam:') ? validateIamAction(action) : true;
      if (!valid) {
        accumulator.push(`Invalid action: ${action}`);
      }
      return accumulator;
    }, [] as string[],
  );
  return result;
}

function validateIamAction(action: string): boolean {
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
  const valid = iamActions.reduce(
    (accumulator, currentValue) => accumulator || regexp.test(currentValue),
    false,
  );
  return valid;
}
