import {info} from '@actions/core'
import {GitHub} from '@actions/github'
import {prettyStringify} from '../utils'
import {moveProjectCard as moveProjectCardMutation} from '../mutations/moveProjectCard.graphql'

// FIXME: infer return type mutation result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = any

export async function moveProjectCard(params: {
  octokit: GitHub
  columnId: string
  cardId: string
  issueOrPullRequestNumber?: number
}): Promise<Result> {
  const {octokit, columnId, cardId, issueOrPullRequestNumber} = params

  info(
    `moveProjectCard:try:' ${prettyStringify({
      cardId,
      issueOrPullRequestNumber
    })}`
  )

  try {
    const res = await octokit.graphql({
      query: moveProjectCardMutation,
      cardId,
      columnId
    })

    info(`moveProjectCard:res: ${prettyStringify(res)}`)

    return res as Result
  } catch (error) {
    throw Error(error)
  }
}
