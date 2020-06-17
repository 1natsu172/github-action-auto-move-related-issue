import {GitHub} from '@actions/github'
import {resolveTargetColumn, resolveTargetProject} from './libs'
import {Config} from './types'
import {Context} from '@actions/github/lib/context'
import {AsyncReturnType} from 'type-fest'

export async function getDestination(params: {
  octokit: GitHub
  context: Context
  config: Config
}): Promise<NonNullable<AsyncReturnType<typeof resolveTargetColumn>>> {
  const {octokit, context, config} = params
  const targetProjectNode = await resolveTargetProject({
    config,
    octokit,
    context
  })
  if (!targetProjectNode) {
    throw new Error('can not find your target github-project')
  }

  const targetProjectColumn = await resolveTargetColumn({
    config,
    context,
    octokit,
    projectNumber: targetProjectNode.number
  })
  if (!targetProjectColumn) {
    throw new Error('can not find your target column in the project')
  }
  return targetProjectColumn
}
