
export class Condition {
  public readonly operator: string;
  public readonly key: string;
  public readonly values: string[];

  constructor(test: string, key: string, ...values: string[]) {
    if (!test) {
      throw new Error('Empty test');
    }
    if (!key) {
      throw new Error('Empty key');
    }
    this.operator = test;
    this.key = key;
    this.values = values;
  }
}
