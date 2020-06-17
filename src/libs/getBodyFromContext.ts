import {Context} from '@actions/github/lib/context'

export function getBodyFromContext(context: Context): string | undefined {
  return context.payload?.pull_request?.body || context.payload?.issue?.body
}
