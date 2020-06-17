import {Context} from '@actions/github/lib/context'

export function getRepoInfo(context: Context): Context['repo'] {
  return context.repo
}
