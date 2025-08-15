# Development Guidelines

## Setup

The Node.js version is managed by [`volta`](https://volta.sh/).

Volta will automatically download the pinned Node.js version from
`package.json`.

Therefore, the project does not have a `.nvmrc` file.

## Publishing a new package

To create a new version of the package, we run the following command manually:

```bash
make release version="<major>.<minor>.<patch>"
```

This will bump the version in the `package.json` and `package-lock.json` files,
commit it to git and tag it with the same version, and push to the remote repo.

Both the commit and the tag are pushed and the Github Actions workflow will kick
in to publish the package to the NPM Registry.

## Retrieve the list of valid actions for a given AWS service

Surrounded with single quotes and trailing comma.

```bash
$ ./aws_iam_actions iam
'iam:AddClientIDToOpenIDConnectProvider',
'iam:AddRoleToInstanceProfile',
'iam:AddUserToGroup',
'iam:AttachGroupPolicy',
'iam:AttachRolePolicy',
'iam:AttachUserPolicy',
...
```
