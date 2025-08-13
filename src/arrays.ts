
/* eslint-disable  @typescript-eslint/no-explicit-any */
export function parseArray(obj: any): string[] {
  if (obj === undefined) {
    return [];
  }
  if (typeof obj === 'string') {
    return [obj];
  }
  if (Array.isArray(obj)) {
    if (isArrayOfStrings(obj)) {
      return obj;
    }
    throw new Error('Unsupported type: expecting an array of strings');
  }
  throw new Error('Unsupported type: expecting an array or a string');
}

function isArrayOfStrings(obj: any[]) {
  return obj.every((element) => typeof element === 'string');
}
/* eslint-enable  @typescript-eslint/no-explicit-any */