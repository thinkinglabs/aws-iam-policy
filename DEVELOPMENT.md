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

## Retrieve the list of valid actions for an AWS service

Surrounded with single quotes and trailing comma.

```bash
$ curl --header 'Connection: keep-alive' \
     --header 'Pragma: no-cache' \
     --header 'Cache-Control: no-cache' \
     --header 'Accept: */*' \
     --header 'Referer: https://awspolicygen.s3.amazonaws.com/policygen.html' \
     --header 'Accept-Language: en-US,en;q=0.9' \
     --silent \
     --compressed \
     'https://awspolicygen.s3.amazonaws.com/js/policies.js' |
    cut -d= -f2 |
    jq -r '.serviceMap[] | .StringPrefix as $prefix | .Actions[] | "\($prefix):\(.)"' |
    sort |
    uniq | grep 'iam:' | awk '{print "\047" $1 "\047" "\054"}'
'iam:AddClientIDToOpenIDConnectProvider',
'iam:AddRoleToInstanceProfile',
'iam:AddUserToGroup',
'iam:AttachGroupPolicy',
'iam:AttachRolePolicy',
'iam:AttachUserPolicy',
...
```
