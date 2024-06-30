## 2.6.1 (30 June 2023)

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
