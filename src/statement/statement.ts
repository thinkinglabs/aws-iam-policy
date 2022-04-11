import {Principal} from '../principals/base';
import {Condition} from '../condition/condition';
import {StatementJSONDeserialiser} from './deserialiser';
import {StatementJSONSerialiser} from './serialiser';

/* eslint-disable no-unused-vars */
export type Effect = 'Allow' | 'Deny'
/* eslint-enable no-unused-vars */

export class Statement {
  public sid: string | undefined;
  public effect: Effect;
  public principals: Principal[] = [];
  public notprincipals: Principal[] = [];
  public actions: string[] = [];
  public notactions: string[] = [];
  public resources: string[] = [];
  public notresources: string[] = [];
  public conditions: Condition[] = [];

  constructor(props?: StatementArgs) {
    this.sid = props?.sid;
    this.effect = props?.effect || 'Allow';

    this.addPrincipals(props?.principals || []);
    this.addNotPrincipals(props?.notprincipals || []);
    this.addActions(props?.actions || []);
    this.addNotActions(props?.notactions || []);
    this.addResources(props?.resources || []);
    this.addNotResources(props?.notresources || []);
    this.addConditions(props?.conditions || []);
  }

  private addPrincipals(principals: Principal[]) {
    this.principals.push(...principals);
  }

  private addNotPrincipals(principals: Principal[]) {
    this.notprincipals.push(...principals);
  }

  private addActions(actions: string[]) {
    this.actions.push(...actions);
  };

  private addNotActions(actions: string[]) {
    this.notactions.push(...actions);
  };

  private addResources(resources: string[]) {
    this.resources.push(...resources);
  };

  private addNotResources(resources: string[]) {
    this.notresources.push(...resources);
  };

  private addConditions(conditions: Condition[]) {
    this.conditions.push(...conditions);
  }

  toJSON() {
    return StatementJSONSerialiser.toJSON(this);
  }

  static fromJSON(obj: any): Statement {
    return StatementJSONDeserialiser.fromJSON(obj);
  }

  validateForAnyPolicy() {
    const errors: string[] = [];
    if ((this.actions.length === 0) && (this.notactions.length === 0)) {
      errors.push(`Statement(${this.sid}) must specify at least one 'action' or 'notaction'.`);
    }
    return errors;
  }

  validateForResourcePolicy() {
    const errors = this.validateForAnyPolicy();
    if (Object.keys(this.principals).length === 0) {
      errors.push(`Statement(${this.sid}) must specify at least one IAM principal.`);
    }
    return errors;
  }

  validateForNotResourcePolicy() {
    const errors = this.validateForAnyPolicy();
    if (Object.keys(this.principals).length === 0) {
      errors.push(`Statement(${this.sid}) must specify at least one IAM principal.`);
    }
    return errors;
  }

  validateForIdentityPolicy() {
    const errors = this.validateForAnyPolicy();
    if (Object.keys(this.principals).length > 0) {
      errors.push(`Statement(${this.sid}) cannot specify any IAM principals.`);
    }
    if ((Object.keys(this.resources).length === 0) && (Object.keys(this.notresources).length === 0)) {
      errors.push(`Statement(${this.sid}) must specify at least one resource or notresource.`);
    }
    return errors;
  }
};

interface StatementArgs {
  readonly sid?: string;
  readonly effect?: Effect;
  readonly principals?: Principal[];
  readonly notprincipals?: Principal[];
  readonly actions?: string[];
  readonly notactions?: string[];
  readonly resources?: string[];
  readonly notresources?: string[];
  readonly conditions?: Condition[];
}
