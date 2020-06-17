import {GitHub} from '@actions/github'
import {RepositoryProjects} from '../types'
import {repositoryProjects} from '../queries/repositoryProjects.graphql'

export async function getProjects(params: {
  octokit: GitHub
  repoName: string
  ownerLogin: string
}): Promise<RepositoryProjects> {
  const {octokit, ownerLogin, repoName} = params
  try {
    const res = await octokit.graphql({
      query: repositoryProjects,
      name: repoName,
      owner: ownerLogin
    })
    return res as RepositoryProjects
  } catch (error) {
    throw Error(error)
  }
}
