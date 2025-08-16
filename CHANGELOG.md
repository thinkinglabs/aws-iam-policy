# Changelog

## 3.2.0

* Bump Node.js to v24, and keep support for v18, v20, v22

* Add support to validate the list of `Statement.actions` and `Statement.notactions` to contain valid

  * IAM (`iam`) permissions [#31](https://github.com/thinkinglabs/aws-iam-policy/issues/31).

  * EC2 (`ec2`) permissions [#32](https://github.com/thinkinglabs/aws-iam-policy/issues/32).
  
  * CloudWatch Logs (`logs`) permissions [#33](https://github.com/thinkinglabs/aws-iam-policy/issues/33).

## 3.1.0

* Add support for Policy `Id` to the `PolicyDocument` ([#29](https://github.com/thinkinglabs/aws-iam-policy/issues/29)).

* Move the policy `Version` at the top of the serialised JSON policy document.

* Drop the minimal Node.js version requirement

* Replace `npm` by [`volta`](https://volta.sh/) as Node.js version manager.

* Introduce a matrix build on Node.js v18, v20, v22 ([#30](https://github.com/thinkinglabs/aws-iam-policy/issues/30))

## 3.0.0 (7 September 2024)

* Extend the validation with policy document size quota ([#6](https://github.com/thinkinglabs/aws-iam-policy/issues/6)).

* Extend the validation with the valid `Sid` values for IAM policy, KMS key policy, S3 bucket policy and SecretsManager secret policy ([#5](https://github.com/thinkinglabs/aws-iam-policy/issues/5)).

* Fix a bug where the root account principal was deserialised as an `ArnPrincipal` ([#26](https://github.com/thinkinglabs/aws-iam-policy/issues/26)).

:rotating_light: **BREAKING CHANGE**

* Consolidate `PolicyDocument.validateForAnyPolicy`, `PolicyDocument.validateForIndentityPolicy` and `PolicyDocument.validateForResourcePolicy` into `PolicyDocument.validate(PolicyType)` where `PolicyType` accepts `IAM`, `KMS`, `S3` and `SecretsManager` ([#6](https://github.com/thinkinglabs/aws-iam-policy/issues/6)).

* Add support for the role principal [#16](https://github.com/thinkinglabs/aws-iam-policy/issues/16)

  Replaces `ArnPrincipal` used for an IAM Role with ARN `arn:aws:iam::123456789000:role/a/path/a_role`.

  Serialising `ArnPrincipal` will still produce a valid IAM Policy Statement AWS Principal JSON fragment `{"AWS": "arn:aws:iam::123456789000:role/a/path/a_role"}`.

  Deserialising an AWS Principal JSON fragment `{ "AWS": "arn:aws:iam::123456789000:role/a/path/a_role" }` will now produce a `RolePrincipal` instead of an `ArnPrincipal`.

* Add support for the user principal [#16](https://github.com/thinkinglabs/aws-iam-policy/issues/16)

  Replaces `ArnPrincipal` used for an IAM User with ARN `arn:aws:iam::123456789000:user/a/path/a_user`.

  Serialising `ArnPrincipal` will still produce a valid IAM Policy Statement AWS Principal JSON fragment `{"AWS": "arn:aws:iam::123456789000:user/a/path/a_user"}`.

  Deserialising an AWS Principal JSON fragment `{ "AWS": "arn:aws:iam::123456789000:user/a/path/a_user" }` will now produce a `UserPrincipal` instead of an `ArnPrincipal`.

## 2.7.0 (11 August 2024)

* Add support for the CloudFront principal [#24](https://github.com/thinkinglabs/aws-iam-policy/issues/36) reported and fixed ([#25](https://github.com/thinkinglabs/aws-iam-policy/pull/25)) by [@araguacaima](https://github.com/araguacaima)

## 2.6.1 (30 June 2024)

* Export the `WildcardPrincipal` ([#23](https://github.com/thinkinglabs/aws-iam-policy/pull/23) by [@gabegorelick](https://github.com/gabegorelick)).

## 2.6.0 (26 November 2023)

* Add support for the wildcard principal ([#22](https://github.com/thinkinglabs/aws-iam-policy/issues/22) reported by [@gabegorelick](https://github.com/gabegorelick)).

## 2.5.1 (19 May 2022)

* Fix the GitHub Action that publishes the npm package to include the prepublish typescript compilation

## 2.5.0 (19 May 2022) [unusable!!]

* Add support for Federated principals ([#14](https://github.com/thinkinglabs/aws-iam-policy/issues/14)) by [@ringods](https://github.com/ringods)

## 2.4.0 (12 April 2022)

* Add support for `NotAction` ([#2](https://github.com/thinkinglabs/aws-iam-policy/issues/2)), `NotPrincipal` ([#3](https://github.com/thinkinglabs/aws-iam-policy/issues/3)), `NotResource` ([#4](https://github.com/thinkinglabs/aws-iam-policy/issues/4)) by [@ringods](https://github.com/ringods)

## 2.3.0 (1 February 2022)

* Add support for string value for `Condition` key values ([#9](https://github.com/thinkinglabs/aws-iam-policy/issues/9))
* Add support for string value for `Principal` type values ([#10](https://github.com/thinkinglabs/aws-iam-policy/issues/10))

## 2.2.0 (23 January 2022)

* Add support for string value for `Action` and `Resource` ([#7](https://github.com/thinkinglabs/aws-iam-policy/issues/7)) by [@danopia](https://github.com/danopia)

## 2.1.0 (3 June 2021)

* Make `PolicyDocument.addStatement(Statement)` public

## 2.0.0 (19 May 2021)

* Add support for Condition

  This adds an object model for the Condition element of an IAM Policy
  Statement. To build a Statement having a Condition:

  ```typescript
  new Statement({
    effect: "Deny",
    ...
    conditions: [
      new Condition("StringNotLike", "aws:userId", ["userId1", "userId2", ...]),
    ]
  })
  ```

## 1.0.2 (22 March 2021)

* Initial release
