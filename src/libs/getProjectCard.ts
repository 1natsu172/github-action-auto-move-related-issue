import {context} from '@actions/github'
import {Webhooks} from '@octokit/webhooks'

export function getProjectCardNodeId(): string | undefined {
  return (context.payload
    ?.project_card as Webhooks.WebhookPayloadProjectCardProjectCard)?.node_id
}
