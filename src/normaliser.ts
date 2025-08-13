
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
function normalise(obj: any): any | undefined {
  if (obj === undefined) {
    return undefined;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return undefined;
    }
    return obj;
  }
  if (typeof (obj) === 'object') {
    if (Object.keys(obj).length === 0) {
      return undefined;
    }
  }
  return obj;
}

export {normalise};
