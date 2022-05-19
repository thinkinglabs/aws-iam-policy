import {AbstractBasePrincipal} from './base';

export class ServicePrincipal extends AbstractBasePrincipal {
  private service: string;
  constructor(service: string) {
    super();
    this.service = service;
  }

  toJSON() {
    return {Service: this.service};
  }
}
