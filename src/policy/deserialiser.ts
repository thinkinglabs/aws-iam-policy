import {Statement} from '../statement/statement';
import {PolicyDocument} from './policy';

export class PolicyDocumentJSONDeserialiser {
  static fromJSON(obj: any) {
    const statements = obj.Statement;
    if (statements === undefined) {
      return new PolicyDocument(undefined, obj.Id);
    }
    if (!Array.isArray(statements)) {
      throw new Error('Unexpected type: Statement must be an array');
    }

    const result = new PolicyDocument(
        statements.map((statement: any) => Statement.fromJSON(statement)),
        obj.Id,
    );
    return result;
  }
}
