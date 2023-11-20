export type PrincipalValues = string | string[];
export type AnonymousValue = string;

interface Principal {
  toJSON(): {[key: string]: PrincipalValues} | AnonymousValue;
}

abstract class AbstractBasePrincipal implements Principal {
  abstract toJSON(): {[key: string]: PrincipalValues};
}

export {Principal, AbstractBasePrincipal};
