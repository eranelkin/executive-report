# # @cyberpion/executive-report

| Branch        | Tag          | Next Tag | Opened at | Status      |
| ------------- | ------------ | -------- | --------- | ----------- |
| master        | hotfix/1.0.8 | -        | 20-03-22  | Deployed    |
| release/1.2.x | -            | 1.2.0    | 30-04-22  | In-Progress |
|               |              |          |           |             |

This repo is configured as a package which will be installed on any web app that need the 'executive-report' service.
One of its dependency is 'cyberpion-ui' package.

## What to do when this repo need to be updated?

### Set up environment locally

#### versions

- node - 16.15
- yarn - 1.22.19
- npm - 8.11.0

### development phase

- create new branch
- develop new feature.
- push the code to the current branch.

in order to test this code before build new dist files, in the consumer repo (Portal) do the following:

- create new branch for testing the new executive report.
- change the `package.json` file for `executive-report` dependency and set the new branch in its link after the # tag.

```javascript
"@cyberpion/executive-report": "bitbucket:cyberpion_projects/executive-report.git#[NEW BRANCH NAME]"
```

- Run, `yarn upgrade @cyberpion/executive-report` in order to update the new fix in our current repo.
- `git push` all the changes.
- run the relevant `pipeline` and deploy to staging.

### Publish the code

in order to publish new development

- `git checkout [FEATURE_BRANCH]`
- `yarn build` - will build all the code to `dist` files which will be used by the consumer (like the Portal).
- `git push` - including the `dist` files.
- create MR to the relevant release branch
- `git tag -a [TAG_NAME]` - create new tag which will be similar to the release number tag.
- `git push origin [TAG_NAME]` - push the new tag to origin

### Consumer (the repo which has dependency for this package - executive-report)

- `@cyberpion/executive-report` dependency in `package.json` - change to the new tag.

```javascript
"@cyberpion/executive-report": "bitbucket:cyberpion_projects/executive-report.git#[TAG_NAME]",
```

- `yarn upgrade @cyberpion/executive-report` - update relevant `node_module`.
- `yarn start`
# executive-report
