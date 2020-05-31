import * as core from '@actions/core'
import {context} from '@actions/github'
import {getLinkedIssue} from './getLinkedIssue'
import {
  isSupportActionEvent,
  isAssignableCard,
  createSkipActionMessage,
  prettyStringify
} from './utils'
import {thrownHandler} from './libs'

async function run(): Promise<void> {
  core.startGroup('::debug::context')
  core.debug(prettyStringify(context))
  core.endGroup()
  core.startGroup('::debug::config')
  core.debug(prettyStringify(core.getInput('config')))
  core.endGroup()

  try {
    await getLinkedIssue()
  } catch (error) {
    thrownHandler(error)
  }
}

run()
