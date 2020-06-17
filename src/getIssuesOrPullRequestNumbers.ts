import {GitHub} from '@actions/github'
import {getRelatedIssueNumber, getIssueOrPullrequest} from './libs'
import {RepositoryIssueOrPullRequest} from './types'
import {Context} from '@actions/github/lib/context'
import {getRepoInfo} from './libs/getRepoInfo'

export async function getIssuesOrPullrequests(params: {
  octokit: GitHub
  context: Context
}): Promise<NonNullable<RepositoryIssueOrPullRequest>[]> {
  const {octokit, context} = params

  const {owner, repo} = getRepoInfo(context)

  const issueOrPullRequestNumbers = getRelatedIssueNumber({context})

  try {
    const fetched = await Promise.all(
      issueOrPullRequestNumbers.map(
        async (issueOrPullRequestNumber) =>
          await getIssueOrPullrequest({
            octokit,
            ownerLogin: owner,
            repoName: repo,
            issueOrPullRequestNumber
          })
      )
    )
    return fetched.filter(
      (item): item is NonNullable<RepositoryIssueOrPullRequest> => item !== null
    )
  } catch (error) {
    throw Error(error)
  }
}
