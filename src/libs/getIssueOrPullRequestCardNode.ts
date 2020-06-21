import {RepositoryIssueOrPullRequest} from '../types'

type ReturnValue = {
  issueOrPullRequestNodeId: string
  issueOrPullRequestNumber: number
  cardNodeId: string | undefined
}

export function getIssueOrPullRequestCardNode(params: {
  repositoryIssueOrPullRequest: NonNullable<RepositoryIssueOrPullRequest>
  targetProjectName: string
}): ReturnValue {
  const {repositoryIssueOrPullRequest, targetProjectName} = params

  const {
    id: issueOrPullRequestNodeId,
    number: issueOrPullRequestNumber,
    projectCards
  } = repositoryIssueOrPullRequest.repository.issueOrPullRequest

  const [targetCardNode] = projectCards.nodes.filter(
    (node) => node?.project.name === targetProjectName
  )

  return {
    issueOrPullRequestNodeId,
    issueOrPullRequestNumber,
    cardNodeId: targetCardNode?.id
  }
}
