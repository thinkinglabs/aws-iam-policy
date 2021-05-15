
export class Condition {
  public readonly operator: string;
  public readonly key: string;
  public readonly values: string[];

  constructor(test: string, key: string, values: string[]) {
    if (!test) {
      throw new Error('test should not be empty');
    }
    if (!key) {
      throw new Error('key should not be empty');
    }
    if (!values.length) {
      throw new Error('values should not be empty');
    }
    if (!values[0]) {
      throw new Error('values should not be empty');
    }
    this.operator = test;
    this.key = key;
    this.values = values;
  }
}
