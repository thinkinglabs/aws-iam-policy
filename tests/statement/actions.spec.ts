import {expect} from 'chai';
import {validate} from '../../src/statement/actions';

describe('#Action', () => {
  it('should validate iam:Create*', () => {
    expect(validate(['iam:Create*'])).to.be.true;
  });

  it('should not validate iam:Create?', () => {
    expect(validate(['iam:Create?'])).to.be.false;
  });

  it('should validate iam:Create????', () => {
    expect(validate(['iam:Create????'])).to.be.true;
  });
});
