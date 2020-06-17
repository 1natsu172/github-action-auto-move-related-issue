import {Context} from '@actions/github/lib/context'
import {
  getBodyFromContext,
  matchIssueParagraph,
  matchShortNotationIssueWithoutKeyword,
  matchIssueURLWithoutKeyword,
  matchIssueNumberFromGitHubURL,
  matchNumberOfShortNotationIssue
} from '../libs'
import {createSkipActionMessage} from '../utils'

export function getRelatedIssueNumber(params: {context: Context}): number[] {
  const {context} = params
  const body = getBodyFromContext(context)
  if (body) {
    const issueParagraph = body.match(matchIssueParagraph)?.join('')
    const shortNotationIssue = issueParagraph
      ?.match(matchShortNotationIssueWithoutKeyword)
      ?.join('')
    const issueUrl = issueParagraph
      ?.match(matchIssueURLWithoutKeyword)
      ?.join('')
    const issueNumbersFromShortNotation =
      shortNotationIssue?.match(matchNumberOfShortNotationIssue) || []
    const issueNumbersFromUrl =
      issueUrl?.match(matchIssueNumberFromGitHubURL) || []
    const issueNumbers = [
      ...new Set([...issueNumbersFromShortNotation, ...issueNumbersFromUrl])
    ]

    if (issueNumbers.length === 0) {
      throw new Error(createSkipActionMessage('no exist related issue'))
    }

    const convertedIssueNumbers = issueNumbers.map((n) => Number(n))

    return convertedIssueNumbers
  } else {
    throw new Error('not found body from context')
  }
}
