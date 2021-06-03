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
