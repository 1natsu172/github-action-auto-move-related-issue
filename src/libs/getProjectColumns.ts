import {GitHub} from '@actions/github'
import {RepositoryProjectColumns} from '../types'
import {repositoryProjectColumns} from '../queries/repositoryProjectColumns.graphql'

export async function getProjectColumns(params: {
  octokit: GitHub
  repoName: string
  ownerLogin: string
  projectNumber: number
}): Promise<RepositoryProjectColumns> {
  const {octokit, ownerLogin, repoName, projectNumber} = params
  try {
    const res = await octokit.graphql({
      query: repositoryProjectColumns,
      name: repoName,
      owner: ownerLogin,
      projectNumber
    })
    return res as RepositoryProjectColumns
  } catch (error) {
    throw Error(error)
  }
}
