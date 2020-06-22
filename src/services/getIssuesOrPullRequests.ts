import {error} from '@actions/core'
import {GitHub} from '@actions/github'
import {getRelatedIssueNumber, getIssueOrPullrequest} from '../libs'
import {RepositoryIssueOrPullRequest} from '../types'
import {Context} from '@actions/github/lib/context'
import {getRepoInfo} from '../libs/getRepoInfo'
import {promiseRejectedReasonHandler} from '../utils'

export async function getIssuesOrPullrequests(params: {
  octokit: GitHub
  context: Context
}): Promise<NonNullable<RepositoryIssueOrPullRequest>[]> {
  const {octokit, context} = params

  const {owner, repo} = getRepoInfo(context)

  const issueOrPullRequestNumbers = getRelatedIssueNumber({context})

  try {
    const fetched = await Promise.allSettled(
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

    /**
     * filter the only existed issueOrPullRequest on the GitHub repository
     * consider the mistake typed issue number.
     */
    const fulfilleds = fetched.filter(
      (
        item
      ): item is PromiseFulfilledResult<
        NonNullable<RepositoryIssueOrPullRequest>
      > => item.status === 'fulfilled' && item.value !== null
    )

    promiseRejectedReasonHandler(fetched, error)

    const pickedValues = fulfilleds.map((o) => o.value)
    return pickedValues
  } catch (err) {
    throw Error(err)
  }
}
