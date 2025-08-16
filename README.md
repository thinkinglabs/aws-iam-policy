# aws-iam-policy [![Build Status](https://travis-ci.org/thinkinglabs/aws-iam-policy.svg?branch=main)](https://travis-ci.org/thinkinglabs/aws-iam-policy)

A Node.js package for working with AWS IAM Policy documents.

The primary reasons for creating the library were:

- simplify the declaration of IAM identity policies as well as resource
  policies for S3 Bucket, KMS Keys or Secrets Manager secrets via coding that
  are created with the [Pulumi](https://www.pulumi.com/) provisioning tool.
- simplify the unit testing of those policies and more specifically testing of
  single policy statements.

## Requirements

Node.js lts/hydrogen (18.x)

## Features

- Reading/writing AWS IAM Policy JSON documents.
- An object model for building an IAM Policy document.
- Validating an IAM Policy document for identity- or resource-based policies.
- Validating the uniqueness of `Sid` within the scope of an IAM Policy document
  when adding Statements.
- Retrieval of Policy Statements by `Sid`.
- Validate `Statement.actions` to contain valid `iam`, `ec2`, `logs`, `s3` permissions;
  - with support for multi-character wildcard (`*`) and single-character wildcard (`?`).

## Documentation

Install the package.

```bash
npm install --save @thinkinglabs/aws-iam-policy
```

Create a policy document.

```typescript
import * as iam from '@thinkinglabs/aws-iam-policy';

function kmsKeyPolicy(accountId: string, keyAdminArns: string[], keyUserArns: string[]) {
  return new iam.PolicyDocument([
    new iam.Statement({
      sid: 'Enable IAM User Permissions',
      effect: 'Allow',
      principals: [new iam.RootAccountPrincipal(accountId)],
      actions: ['kms:*'],
      resources: ['*'],
    }),
    new iam.Statement({
      sid: 'Allow access for Key Administrators',
      effect: 'Allow',
      principals: keyAdminArns.map((arn) => new iam.ArnPrincipal(arn)),
      actions: ['kms:*'],
      resources: ['*'],
    }),
    new iam.Statement({
      sid: 'Allow use of the key',
      effect: 'Allow',
      principals: keyUserArns.map((arn) => new iam.ArnPrincipal(arn)),
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
const policy = new iam.PolicyDocument();
policy.addStatements(new iam.Statement({
    sid: 'Enable IAM User Permissions',
    effect: 'Allow',
    principals: [new iam.RootAccountPrincipal(accountId)],
    actions: ['kms:*'],
    resources: ['*'],
  });
```

Unit testing a statement from a policy document. You can retrieve a single
statement using the Sid of that statement.

```typescript
import {expect} from 'chai';
import * as iam from '@thinkinglabs/aws-iam-policy';

describe('kms key policy', function() {
const accountId = '123456789012';
  const keyAdminArns = [
    `arn:aws:iam::${accountId}:role/admin1`,
    `arn:aws:iam::${accountId}:role/admin2`,
  ];
  const keyUsers = [
    `arn:aws:iam::${accountId}:role/user1`,
  ];
  const policy = sut.kmsKeyPolicy(accountId, keyAdminArns, keyUserArns);

  it('should enable IAM User permissions', function() {
    const statement = policy.getStatement('Enable IAM User Permissions');

    expect(statement).to.deep.equal(new iam.Statement({
      actions: ['kms:*'],
      effect: 'Allow',
      principals: [new iam.RootAccountPrincipal('123456789012')],
      resources: ['*'],
      sid: 'Enable IAM User Permissions',
    }));
  });
}
```

Serialising to and from JSON.

```typescript
  const policy = new iam.PolicyDocument();
  const json = policy.json;
  const newPolicy = iam.PolicyDocument.fromJson(json);
```

Supports different principals.

```typescript
  // "Principal": {"Service": ["ec2.amazonaws.com"]}
  const servicePrincipal = new iam.ServicePrincipal('ec2.amazonaws.com');

  // "Principal": {"AWS": ["arn:aws:iam::123456789012:user/a/path/user-name"]}
  const userPrincipal = new iam.UserPrincipal('123456789012', 'user-name', '/a/path/')

    // "Principal": {"AWS": ["arn:aws:iam::123456789012:role/a/path/role-name"]}
  const rolePrincipal = new iam.RolePrincipal('123456789012', 'role-name', '/a/path/')

  // "Principal": {"AWS": ["arn:aws:iam::123456789012:role/role-name"]}
  const arnPrincipal = new iam.ArnPrincipal('arn:aws:iam::123456789012:role/role-name');

  // "Principal": {"AWS": ["arn:aws:iam::123456789012:root"]}
  const rootAccountPrincipal = new iam.RootAccountPrincipal('123456789012');

  // "Principal": {"AWS": ["123456789012"]}
  const accountPrincipal = new iam.AccountPrincipal('123456789012');

  // "Principal": {"AWS": ["*"]}
  const anonymousUserPrincipal = new iam.AnonymousUserPrincipal();

  // "Principal" : "*"
  const wildcardPrincipal = new iam.WildcardPrincipal();
```

Validate a policy document.

```typescript
  // validate any policy
  // when valid returns an empty list
  // when invalid returns a list of errors
  const policy = new iam.PolicyDocument([
    new iam.Statement({
      sid: 'AllowReadIAM',
      effect: 'Allow',
      actions: [
        'iam:Get*',
        'iam:List*',
      ],
      resources: ['*'],
    })
  ]);
  const errors = policy.validate();
  if (errors) {
    throw errors;
  }

  // validate an IAM policy document
  const errors = policy.validate(PolicyType.IAM);
  if (errors) {
    throw errors;
  }

  //validate a KMS key policy document.
  const errors = policy.validate(PolicyType.KMS);
  if (errors) {
    throw errors;
  }

  //validate an S3 bucket policy document.
  const errors = policy.validate(PolicyType.S3);
  if (errors) {
    throw errors;
  }

  //validate a SecretsManager secret policy document.
  const errors = policy.validate(PolicyType.SecretsManager);
  if (errors) {
    throw errors;
  }
```
