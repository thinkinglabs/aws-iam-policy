
export class Condition {
  public operator: string;
  public key: string;
  public values: string[];

  constructor(test: string, variable: string, ...values: string[]) {
    this.operator = test;
    this.key = variable;
    this.values = values;
  }
}
