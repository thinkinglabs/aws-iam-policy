
interface Principal {
  toJSON(): {[key: string]: string[]};
}

abstract class AbstractBasePrincipal implements Principal {
  abstract toJSON(): {[key: string]: string[]};
}

export {Principal, AbstractBasePrincipal};
