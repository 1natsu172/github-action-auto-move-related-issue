import {GitHub} from '@actions/github'
import {Context} from '@actions/github/lib/context'
import {getRepoInfo} from '../libs/getRepoInfo'
import {Config, RepositoryProjectColumns} from '../types'
import {getProjectColumns} from '../libs'

export async function resolveTargetColumn(params: {
  octokit: GitHub
  context: Context
  config: Config
  projectNumber: number
}): Promise<
  | RepositoryProjectColumns['repository']['project']['columns']['nodes'][0]
  | undefined
> {
  const {octokit, context, config, projectNumber} = params
  const {repo, owner} = getRepoInfo(context)

  const columns = await getProjectColumns({
    octokit,
    ownerLogin: owner,
    repoName: repo,
    projectNumber
  }).then((res) => res.repository.project.columns.nodes)

  const targetColumnName = config.columnName
  const resolved = columns.find((column) => column.name === targetColumnName)
  return resolved
}
