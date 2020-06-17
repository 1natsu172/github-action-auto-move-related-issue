import {repositoryIssueOrPullRequest} from '../queries/repositoryIssueOrPullRequest.graphql'
import {GitHub} from '@actions/github'
import {RepositoryIssueOrPullRequest} from '../types'

export async function getIssueOrPullrequest(params: {
  octokit: GitHub
  repoName: string
  ownerLogin: string
  issueOrPullRequestNumber: number
}): Promise<RepositoryIssueOrPullRequest> {
  const {octokit, ownerLogin, repoName, issueOrPullRequestNumber} = params
  try {
    return (await octokit.graphql({
      query: repositoryIssueOrPullRequest,
      name: repoName,
      owner: ownerLogin,
      issueOrPullRequestNumber
    })) as RepositoryIssueOrPullRequest
  } catch (error) {
    throw Error(error)
  }
}
