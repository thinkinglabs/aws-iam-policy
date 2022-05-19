export type PrincipalValues = string | string[];

interface Principal {
  toJSON(): {[key: string]: PrincipalValues};
}

abstract class AbstractBasePrincipal implements Principal {
  abstract toJSON(): {[key: string]: PrincipalValues};
}

export {Principal, AbstractBasePrincipal};
