import {startGroup, debug, endGroup, getInput} from '@actions/core'
import {context} from '@actions/github'
import {
  getDestination,
  getIssuesOrPullrequests,
  moveIssuesOrPullRequests
} from './services'
import {
  isSupportActionEvent,
  createSkipActionMessage,
  prettyStringify
} from './utils'
import {thrownHandler, getConfig, getOctokit, getGitHubToken} from './libs'

async function run(): Promise<void> {
  startGroup('::debug::context')
  debug(prettyStringify(context))
  debug(prettyStringify(context.repo))
  endGroup()
  startGroup('::debug::config')
  debug(prettyStringify(getInput('config')))
  endGroup()

  try {
    const token = getGitHubToken()
    const octokit = getOctokit(token)
    const config = await getConfig({context, octokit})

    const relatedIssuesOrPullrequests = await getIssuesOrPullrequests({
      octokit,
      context
    })

    const targetColumn = await getDestination({context, config, octokit})

    const moveResult = await moveIssuesOrPullRequests({
      octokit,
      config,
      targetColumnId: targetColumn.id,
      issuesOrPullrequests: relatedIssuesOrPullrequests
    })

    debug(prettyStringify(relatedIssuesOrPullrequests))
    debug(prettyStringify(targetColumn))
    debug(prettyStringify(moveResult))
  } catch (error) {
    thrownHandler(error)
  }
}

run()
