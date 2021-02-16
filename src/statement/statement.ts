import {Effect} from './types';
import {Principal} from '../principals/base';
import {IAMPolicyStatementJSONDeserialiser} from './deserialiser';
import {IAMPolicyStatementJSONSerialiser} from './serialiser';

class IAMPolicyStatement {
  public sid: string | undefined;
  public effect: Effect;
  public principals: Principal[] = [];
  public actions: string[] = [];
  public resources: string[] = [];
  public conditions: {[key:string]: any} = {};

  constructor(props?: IAMPolicyStatementArgs) {
    this.sid = props?.sid;
    this.effect = props?.effect || Effect.ALLOW;

    this.addPrincipals(...props?.principals || []);
    this.addActions(...props?.actions || []);
    this.addResources(...props?.resources || []);
    if (props?.conditions) {
      this.addConditions(props?.conditions);
    }
  }

  private addPrincipals(...principals: Principal[]) {
    this.principals.push(...principals);
  }

  private addActions(...actions: string[]) {
    this.actions.push(...actions);
  };

  private addResources(...resources: string[]) {
    this.resources.push(...resources);
  };

  private addConditions(conditions: any) {
    Object.keys(conditions).map((key) => {
      this.addCondition(key, conditions[key]);
    });
  }

  private addCondition(key: any, value: any) {
    const existingValue = this.conditions[key];
    this.conditions[key] = existingValue ? {...existingValue, ...value} : value;
  }

  toJSON() {
    return IAMPolicyStatementJSONSerialiser.toJSON(this);
  }

  static fromJSON(obj: any): IAMPolicyStatement {
    return IAMPolicyStatementJSONDeserialiser.fromJSON(obj);
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

interface IAMPolicyStatementArgs {
  readonly sid?: string;
  readonly effect?: Effect;
  readonly principals?: Principal[];
  readonly actions?: string[];
  readonly resources?: string[];
  readonly conditions?: {
      [key: string]: any;
  };
}

export {IAMPolicyStatement};
