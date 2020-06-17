import {GitHub} from '@actions/github'
import {Context} from '@actions/github/lib/context'
import {getRepoInfo} from '../libs/getRepoInfo'
import {Config, RepositoryProjects} from '../types'
import {getProjects} from '../libs'

export async function resolveTargetProject(params: {
  octokit: GitHub
  context: Context
  config: Config
}): Promise<
  RepositoryProjects['repository']['projects']['nodes'][0] | undefined
> {
  const {octokit, context, config} = params
  const {repo, owner} = getRepoInfo(context)

  const projects = await getProjects({
    octokit,
    ownerLogin: owner,
    repoName: repo
  }).then((res) => res.repository.projects.nodes)

  const targetProjectName = config.projectName
  const resolved = projects.find(
    (project) => project.name === targetProjectName
  )
  return resolved
}
