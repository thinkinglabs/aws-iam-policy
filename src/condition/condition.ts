
export class Condition {
  public readonly operator: string;
  public readonly key: string;
  public readonly values: string[];

  constructor(test: string, variable: string, ...values: string[]) {
    if (test === '') {
      throw new Error('Empty test');
    }
    this.operator = test;
    this.key = variable;
    this.values = values;
  }
}
