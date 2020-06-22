import {context} from '@actions/github'
import {SUPPORT_WEBHOOK_EVENT} from '../constants'

export function isSupportActionEvent(): boolean {
  const isSupportWebhookEvent = SUPPORT_WEBHOOK_EVENT.some(
    (event) => event === context.eventName
  )
  return isSupportWebhookEvent
}
