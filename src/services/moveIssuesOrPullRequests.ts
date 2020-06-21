import {GitHub} from '@actions/github'
import {error} from '@actions/core'
import {RepositoryIssueOrPullRequest, Config} from '../types'
import {getIssueOrPullRequestCardNode} from '../libs/getIssueOrPullRequestCardNode'
import {addProjectCard, moveProjectCard} from '../usecases'

export async function moveIssuesOrPullRequests(params: {
  octokit: GitHub
  config: Config
  issuesOrPullrequests: NonNullable<RepositoryIssueOrPullRequest>[]
  targetColumnId: string
}): Promise<PromiseSettledResult<any>[]> {
  const {octokit, config, issuesOrPullrequests, targetColumnId} = params
  const {projectName} = config

  const cardNodes = issuesOrPullrequests.map((issueOrPullRequest) =>
    getIssueOrPullRequestCardNode({
      repositoryIssueOrPullRequest: issueOrPullRequest,
      targetProjectName: projectName
    })
  )

  const moved = await Promise.allSettled(
    cardNodes.map((node) => {
      // if already existed card on the project-board
      if (node.cardNodeId) {
        return moveProjectCard({
          octokit,
          cardId: node.cardNodeId,
          columnId: targetColumnId,
          issueOrPullRequestNumber: node.issueOrPullRequestNumber
        })
      } else {
        return addProjectCard({
          octokit,
          projectColumnId: targetColumnId,
          issueOrPullRequestId: node.issueOrPullRequestNodeId,
          issueOrPullRequestNumber: node.issueOrPullRequestNumber
        })
      }
    })
  )

  const rejectedReasons = moved
    .filter((res): res is PromiseRejectedResult => res.status === 'rejected')
    .map((n) => n.reason)

  if (rejectedReasons.length) {
    for (const reason of rejectedReasons) {
      error(reason)
    }
  }

  return moved
}
