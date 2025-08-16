import iamActions from './actions/iam';
import ec2Actions from './actions/ec2';
import logsActions from './actions/logs';

export function validate(actions: string[]): string[] {
  const result = actions.reduce(
    (accumulator, action) => {
      const valid = validateAction(action);
      if (!valid) {
        accumulator.push(`Invalid action '${action}'`);
      }
      return accumulator;
    }, [] as string[],
  );
  return result;
}

function validateAction(action: string): boolean {
  const servicePrefix = action.split(':')[0];
  switch (servicePrefix) {
    case 'iam':
      return validateActionAgainstSetOfActions(action, iamActions);
    case 'ec2':
      return validateActionAgainstSetOfActions(action, ec2Actions);
    case 'logs':
      return validateActionAgainstSetOfActions(action, logsActions);
    default:
      return true;
  }
}

function validateActionAgainstSetOfActions(action: string, validActions: string[]): boolean {
  const regexp = new RegExp(`^${action.replace('*', '.*').replaceAll('?', '.')}$`);
  const valid = validActions.reduce(
    (accumulator, currentValue) => accumulator || regexp.test(currentValue),
    false,
  );
  return valid;
}
