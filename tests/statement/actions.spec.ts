import {expect} from 'chai';
import {validate} from '../../src/statement/actions';

describe('#Action', () => {
  it('should validate iam:Create*', () => {
    expect(validate(['iam:Create*'])).to.be.empty;
  });

  it('should not validate iam:Create?', () => {
    expect(validate(['iam:Create?'])).to.be.deep.equal(['Invalid action: iam:Create?']);
  });

  it('should validate iam:Create????', () => {
    expect(validate(['iam:Create????'])).to.be.empty;
  });
});
