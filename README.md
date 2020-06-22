<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# GitHub Actions auto-move-related-issue

This is GitHub Actions that move the open-issue described in the "Issue" paragraph to a specific project column.

The supported action webhook events are `issues` | `pull_request`.

> Note: The development is primarily focused on `closed` events, so it may not work with certain event triggers.


## Screenshot
![DEMO GIF](https://raw.githubusercontent.com/1natsu172/github-action-auto-move-related-issue/b32ac32e466fe77b3442cc3e5cd348f5d87bd024/media/work-demo.gif)

## Usage

### Setup workflow file

example `.github/workflows/auto-move-related-issue.yml`

```yaml
name: "Auto move related issue"
on:
  pull_request:
    types: [closed]

jobs:
  auto-move-related-issue:
    runs-on: ubuntu-latest
    steps:
      - uses: 1natsu172/github-action-auto-move-related-issue@v1
        id: auto-move-related-issue_action
        with:
          # github_token: "${{ secrets.GITHUB_TOKEN }}"
          config: "auto-move-related-issue-config.yml"
```

・Tips

If you only want to run the pull_request on merged, you can write the steps configuration as follows.

```yaml
    steps:
      - uses: 1natsu172/github-action-auto-move-related-issue@v1
        if: github.event_name == 'pull_request' && github.event.action == 'closed' && github.event.pull_request.merged == true
        id: auto-move-related-issue_action
        with:
          # github_token: "${{ secrets.GITHUB_TOKEN }}"
          config: "auto-move-related-issue-config.yml"
```

・ `with` options

| name         | description      | default                              | required | e.g.                               |
| :----------: | ---------------- | :----------------------------------: | :------: | :--------------------------------: |
| config       | Config file name | `auto-move-related-issue-config.yml` | true     | `move-related-issue-on-merged.yml` |
| github_token | Access token     | `${{github.token}}`                  | true     | `${{secrets.ACCESS_TOKEN}}`        |

### Configure target project and column names

example `.github/auto-move-related-issue-config.yml`

```yaml
projectName: "kanban1"
columnName: "Review in progress"
```

**This action support single project and single column target.**

### Please write an `Issue` paragraph in your Issue or PullRequest content

**Must write `Issue` paragraph and Issue or PullRequest number or url**

![content-body-example](https://github.com/1natsu172/github-action-auto-move-related-issue/blob/b32ac32e466fe77b3442cc3e5cd348f5d87bd024/media/content-body-example.png?raw=true)

example

```markdown
# Issue

#1
#3
https://github.com/sushi-kun/github-projects-lab/issues/5

# Summary

.
.
.
```

## Config rules

### Write the exact name

According to the image below.

![project name and column name is here](https://github.com/1natsu172/github-action-auto-move-related-issue/blob/b32ac32e466fe77b3442cc3e5cd348f5d87bd024/media/project-and-column-name.png?raw=true)

## Behavior

Only the Issue or PullRequest number or url in the issue paragraph will be targeted. It also ignores issues that have been given keywords to close.

> ref: [Closing issues using keywords](https://help.github.com/en/enterprise/2.16/user/github/managing-your-work-on-github/closing-issues-using-keywords)

Support for Issue or PullRequest that has not been added to the target project. It is automatically added to the target column even if it has not been added to the project.

## FAQ

### ・Not moved or some Issue or PullRequest is not moved.

Do you have any extra information in your Issue paragraph other than a number or URL?
It is recommended to describe Issue paragraph as simply as possible, with only the number and URL.


## Support action trigger events

| eventName    | action types |
| :----------: | :----------: |
| issues       | any          |
| pull_request | any          |

## Versioning

Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/1natsu172/github-action-auto-move-related-issue/tags). 

## ©️ License

MIT © [1natsu172](https://github.com/1natsu172)


---

## For developer

### Versioning

The presence or absence of the `v` prefix is ​​intentional.

`v1 = "^1.0.0"`
`1.0.0 = "1.0.0"`

Whenever release, must release the new version(non-v-prefix) and major version release(has-v-prefix).

ref: https://github.com/actions/toolkit/blob/master/docs/action-versioning.md

### After new release branch merged

#### Release new specific version

Release by GUI operation according to the official publishing-action guide.

https://help.github.com/ja/actions/building-actions/publishing-actions-in-github-marketplace#publishing-an-action

Be careful: specific version release tag is `non-v-prefix`

#### Update major version tag

And then, update existing major version tag by local push.

```bash
git checkout master
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```