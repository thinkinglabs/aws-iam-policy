# aws-iam-policy [![Build Status](https://travis-ci.org/thinkinglabs/aws-iam-policy.svg?branch=main)](https://travis-ci.org/thinkinglabs/aws-iam-policy)

A Node.js package for working with AWS IAM Policy documents.

The primary reasons for creating the library were:

- simplify the coding of S3 Bucket policies, KMS Key policies or Secrets Manager
  secret policies programmatically that are created with the provisioning tool
  [Pulumi](https://www.pulumi.com/).
- simplify the unit testing of those policies and more specifically testing of
  single policy statements.

## Requirements

Node.js lts/gallium (16.x)

## Features

- Reading/writing AWS IAM Policy JSON documents.
- An object model for building an IAM Policy.
- Validating an IAM Policy for identity- or resource-based policies.
- Checks for the uniqueness of `Sid` when adding Statements.
- Retrieval of Policy Statements by `Sid`.

## Documentation

Install the package.

```bash
npm install --save-dev @thinkinglabs/aws-iam-policy
```

Create a policy document.

```typescript
import {PolicyDocument, Statement, ArnPrincipal, RootAccountPrincipal} from '@thinkinglabs/aws-iam-policy';

function kmsKeyPolicyDocument(accountId: string, keyAdminArns: string[], keyUserArns: string[]) {
  return new PolicyDocument([
    new Statement({
      sid: 'Enable IAM User Permissions',
      effect: 'Allow',
      principals: [new RootAccountPrincipal(accountId)],
      actions: ['kms:*'],
      resources: ['*'],
    }),
    new Statement({
      sid: 'Allow access for Key Administrators',
      effect: 'Allow',
      principals: keyAdminArns.map((arn) => new ArnPrincipal(arn)),
      actions: ['kms:*'],
      resources: ['*'],
    }),
    new Statement({
      sid: 'Allow use of the key',
      effect: 'Allow',
      principals: keyUserArns.map((arn) => new ArnPrincipal(arn)),
      actions: [
        'kms:Encrypt',
        'kms:Decrypt',
        'kms:ReEncrypt*',
        'kms:GenerateDataKey*',
        'kms:DescribeKey',
      ],
      resources: ['*'],
    }),
  ]).json;
});
```

Add a `Statement` to an existing policy document.

```typescript
const policy = new PolicyDocument();
policy.addStatements(new Statement({
    sid: 'Enable IAM User Permissions',
    effect: 'Allow',
    principals: [new RootAccountPrincipal(accountId)],
    actions: ['kms:*'],
    resources: ['*'],
  });
```

Unit testing a statement from a policy document. You can retrieve a single
statement using the Sid of that statement.

```typescript
import {expect} from 'chai';
import {PolicyDocument, Statement, ArnPrincipal, RootAccountPrincipal} from 'aws-iam-policy';

describe('kms key policy', function() {
const accountId = '123456789012';
  const keyAdminArns = [
    `arn:aws:iam::${accountId}:role/admin1`,
    `arn:aws:iam::${accountId}:role/admin2`,
  ];
  const keyUsers = [
    `arn:aws:iam::${accountId}:role/user1`,
  ];
  const policy = sut.kmsKeyPolicyDocument(accountId, keyAdminArns, keyUserArns);

  it('should enable IAM User permissions', function() {
    const statement = policy.getStatement('Enable IAM User Permissions');

    expect(statement).to.deep.equal(new Statement({
      actions: ['kms:*'],
      effect: 'Allow',
      principals: [new RootAccountPrincipal('123456789012')],
      resources: ['*'],
      sid: 'Enable IAM User Permissions',
    }));
  });
}
```

Serialising to and from JSON.

```typescript
  const policy = new PolicyDocument();
  const json = policy.json;
  const newPolicy = PolicyDocument.fromJson(json);
```

Supports different principals.

```typescript
  // "Principal": {"Service": ["ec2.amazonaws.com"]}
  const servicePrincipal = new ServicePrincipal('ec2.amazonaws.com');

  // "Principal": {"AWS": ["arn:aws:iam::123456789012:user/user-name"]}
  const arnPrincipal = new ArnPrincipal('arn:aws:iam::123456789012:user/user-name');

  // "Principal": {"AWS": ["arn:aws:iam::123456789012:root"]}
  const rootAccountPrincipal = new RootAccountPrincipal('123456789012');

  // "Principal": {"AWS": ["123456789012"]}
  const accountPrincipal = new AccountPrincipal('123456789012');

  // "Principal": {"AWS": ["*"]}
  const anonymousUserPrincipal = new AnonymousUserPrincipal();

  // "Principal" : "*"
  const wildcardPrincipal = new WildcardPrincipal();
```
