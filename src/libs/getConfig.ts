import {getInput, debug, warning} from '@actions/core'
import {Context} from '@actions/github/lib/context'
import {getConfig as getConfigObject} from '@technote-space/github-action-config-helper'
import isObject from 'lodash.isobject'
import {Config, ConfigPath} from '../types'
import {GitHub} from '@actions/github'

export function getGitHubToken(): string {
  const token = getInput('github_token')
  return token
}

export async function getConfig({
  octokit,
  context
}: {
  octokit: GitHub
  context: Context
}): Promise<Config> {
  const configPath: ConfigPath = getInput('config')
  debug(configPath)
  const config = await getConfigObject(configPath, octokit, context)

  if (!config) {
    warning('Please create config file')
  }

  if (!isObject(config) || !(config instanceof Object)) {
    throw Error('config is malformed')
  }

  return config as Config
}
