# Development Guidelines

## Publishing a new package

To create a new version of the package, we run the following command manually:

```bash
npm version [major|minor|patch] -m"Bump version to v[major|minor|patch]"
```

This will bump the version in the `package.json` and `package-lock.json` files, commit it to git and tag it with the same version.
If we push this using:

```bash
git push origin main --follow-tags
```

both the commit and the tag are pushed and the Github Actions workflow will kick in to publish the package to the NPM Registry.
