import {Principal} from '../principals/base';
import {Condition} from '../condition/condition';
import {StatementJSONDeserialiser} from './deserialiser';
import {StatementJSONSerialiser} from './serialiser';
import {WildcardPrincipal} from '../principals/wildcard';
import {PolicyType} from '../policy/policy';

export type Effect = 'Allow' | 'Deny'

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
    this.onlyHasOneWildCardPrincipalOrNone(principals);
    this.principals.push(...principals);
  }

  private addNotPrincipals(principals: Principal[]) {
    this.onlyHasOneWildCardPrincipalOrNone(principals);
    this.notprincipals.push(...principals);
  }

  private onlyHasOneWildCardPrincipalOrNone(principals: Principal[]) {
    if (principals.length > 1) {
      const anonymousPrincipal = principals.find((principal) => principal instanceof WildcardPrincipal);
      const hasAnonymousPrincipal = (anonymousPrincipal !== undefined);
      if (hasAnonymousPrincipal) {
        throw new Error('In case of the AnonymousPrincipal there can only be one principal');
      }
    }
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

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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

  validateForResourcePolicy(policyType?: PolicyType) {
    const errors: string[] = [];
    if (Object.keys(this.principals).length === 0 && Object.keys(this.notprincipals).length === 0) {
      errors.push(`Statement(${this.sid}) must specify at least one 'principal' or 'notprincipal'.`);
    }
    if (this.sid && policyType == PolicyType.SecretsManager) {
      const sidRegEx = new RegExp('^[a-zA-Z0-9]*$');
      if (!sidRegEx.test(this.sid)) {
        errors.push(
            `Statement(${this.sid}) should only accept alphanumeric characters for 'sid'` +
            ' in the case of a SecretsManager secret policy.',
        );
      }
    }
    if (this.sid && policyType == PolicyType.S3) {
      const sidRegEx = new RegExp('^[a-zA-Z0-9 ]*$');
      if (!sidRegEx.test(this.sid)) {
        errors.push(
            `Statement(${this.sid}) should only accept alphanumeric characters and spaces for 'sid'` +
            ' in the case of an S3 bucket policy.',
        );
      }
    }
    if (this.sid && policyType == PolicyType.KMS) {
      const sidRegEx = new RegExp('^[a-zA-Z0-9 ]*$');
      if (!sidRegEx.test(this.sid)) {
        errors.push(
            `Statement(${this.sid}) should only accept alphanumeric characters and spaces for 'sid'` +
            ' in the case of a KMS key policy.',
        );
      }
    }
    return errors;
  }

  validateForIdentityPolicy() {
    const errors: string[] = [];
    if (Object.keys(this.principals).length > 0 || Object.keys(this.notprincipals).length > 0) {
      errors.push(`Statement(${this.sid}) cannot specify any 'principal' or 'notprincipal'.`);
    }
    if ((Object.keys(this.resources).length === 0) && (Object.keys(this.notresources).length === 0)) {
      errors.push(`Statement(${this.sid}) must specify at least one 'resource' or 'notresource'.`);
    }
    if (this.sid) {
      const sidRegEx = new RegExp('^[a-zA-Z0-9]*$');
      if (!sidRegEx.test(this.sid)) {
        errors.push(
            `Statement(${this.sid}) should only accept alphanumeric characters for 'sid'` +
            ' in the case of an IAM policy.',
        );
      }
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
