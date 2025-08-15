import iamActions from './actions/iam';

export function validate(actions: string[]): string[] {
  const result = actions.reduce(
    (accumulator, action) => {
      const valid = action.startsWith('iam:') ? validateAction(action, iamActions) : true;
      if (!valid) {
        accumulator.push(`Invalid action '${action}'`);
      }
      return accumulator;
    }, [] as string[],
  );
  return result;
}

function validateAction(action: string, validActions: string[]): boolean {
  const regexp = new RegExp(`^${action.replace('*', '.*').replaceAll('?', '.')}$`);
  const valid = validActions.reduce(
    (accumulator, currentValue) => accumulator || regexp.test(currentValue),
    false,
  );
  return valid;
}
