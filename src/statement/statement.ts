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
  public actions: string[] = [];
  public resources: string[] = [];
  public conditions: Condition[] = [];

  constructor(props?: StatementArgs) {
    this.sid = props?.sid;
    this.effect = props?.effect || 'Allow';

    this.addPrincipals(props?.principals || []);
    this.addActions(props?.actions || []);
    this.addResources(props?.resources || []);
    this.addConditions(props?.conditions || []);
  }

  private addPrincipals(principals: Principal[]) {
    this.principals.push(...principals);
  }

  private addActions(actions: string[]) {
    this.actions.push(...actions);
  };

  private addResources(resources: string[]) {
    this.resources.push(...resources);
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
    if (this.actions.length === 0) {
      errors.push(`Statement(${this.sid}) must specify at least one 'action'.`);
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

  validateForIdentityPolicy() {
    const errors = this.validateForAnyPolicy();
    if (Object.keys(this.principals).length > 0) {
      errors.push(`Statement(${this.sid}) cannot specify any IAM principals.`);
    }
    if (Object.keys(this.resources).length === 0) {
      errors.push(`Statement(${this.sid}) must specify at least one resource.`);
    }
    return errors;
  }
};

interface StatementArgs {
  readonly sid?: string;
  readonly effect?: Effect;
  readonly principals?: Principal[];
  readonly actions?: string[];
  readonly resources?: string[];
  readonly conditions?: Condition[];
}
