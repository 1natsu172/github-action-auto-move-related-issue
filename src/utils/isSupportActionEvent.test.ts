import {context} from '@actions/github'
import {SUPPORT_WEBHOOK_EVENT} from '../constants'
import {isSupportActionEvent} from './isSupportActionEvent'
import {mockGitHubContext} from '../../__tests__/mock/actions-github.mock'
import {createDummyGitHubContext} from '../../__tests__/helper/githubContextHelper'

mockGitHubContext()

describe('isSupportActionEvent', () => {
  test.each(SUPPORT_WEBHOOK_EVENT)(
    'Should be return true by supported events: %p',
    (actionEvent) => {
      // @ts-ignore
      context = createDummyGitHubContext({
        eventName: actionEvent
      })
      expect(isSupportActionEvent()).toBe(true)
    }
  )

  test('Should be return false by un-supported event', () => {
    // @ts-ignore
    context = createDummyGitHubContext({
      eventName: 'issue_comment'
    })
    expect(isSupportActionEvent()).toBe(false)
  })
})
