import {info} from '@actions/core'
import {GitHub} from '@actions/github'
import {prettyStringify} from '../utils'
import {addProjectCard as addProjectCardMutation} from '../mutations/addProjectCard.graphql'

// FIXME: infer return type mutation result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = any

export async function addProjectCard(params: {
  octokit: GitHub
  projectColumnId: string
  issueOrPullRequestId: string
  issueOrPullRequestNumber?: number
}): Promise<Result> {
  const {
    octokit,
    projectColumnId,
    issueOrPullRequestId,
    issueOrPullRequestNumber
  } = params

  info(
    `addProjectCard:try:' ${prettyStringify({
      issueOrPullRequestId,
      issueOrPullRequestNumber
    })}`
  )

  try {
    const res = await octokit.graphql({
      query: addProjectCardMutation,
      projectColumnId,
      contentId: issueOrPullRequestId
    })

    info(`addProjectCard:res: ${prettyStringify(res)}`)

    return res as Result
  } catch (error) {
    throw Error(error)
  }
}
