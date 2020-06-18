import {startGroup, debug, endGroup, getInput} from '@actions/core'
import {context} from '@actions/github'
import {getDestination} from './getDestination'
import {getIssuesOrPullrequests} from './getIssuesOrPullRequestNumbers'
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

    const issuesOrPullrequests = await getIssuesOrPullrequests({
      octokit,
      context
    })

    const destination = await getDestination({context, config, octokit})

    debug(prettyStringify(issuesOrPullrequests))
    debug(prettyStringify(destination))
  } catch (error) {
    thrownHandler(error)
  }
}

run()
