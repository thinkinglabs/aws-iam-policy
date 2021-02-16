# aws-iam-policy

A Node.js module for working with AWS IAM Policy documents.

This library was implemented to be able to create S3 Bucket policies,
KMS Key resource policies or Secrets Manager secret policies programmatically
with [Pulumi](https://www.pulumi.com/) instead using JSON strings.

The library can also be used as a helper to unit test the resource-based
policies created by Pulumi.

## Features

- Reading/writing AWS IAM Policy JSON documents.
- An object model for building an IAM Policy.
- Validating an IAM Policy for identity- or resource-based policies.
- Checks for the uniqueness of `Sid` when adding Statements.
- Retrieval of Policy Statements by `Sid`.

## Limitations

The library only supports the canonical form of IAM Policy JSON documents, i.e.
everywhere a string or an array can be passed, an array is expected.

```json
{
  "Statment": [
    {
      "Sid": "EC2ReadOnly",
      "Effect": "Allow",
      "Principal": {
        "AWS": ["arn:aws:iam::12345678900:user/JohnDoe"]
      },
      "Action": ["ec2:Describe*"],
      "Resource": ["*"],
      "Condition": {
        "StringEquals": {
          "kms:CallerAccount": ["12345678900"]
        }
      }
    }
  ],
  "Version": "2012-10-17",
}
```

The library does not implement `NotPrincipal`, `NotAction` and `NotResource`.

There is no object model for the `Condition` element. The library does not
validate the content of the `Condition` element. It reads the content as-is and
serialises it back as-is.
