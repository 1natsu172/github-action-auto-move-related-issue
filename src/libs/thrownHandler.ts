import {info, ExitCode, error as core_error, setFailed} from '@actions/core'
import {isSkipAction, prettyStringify} from '../utils'

export function thrownHandler(error: Error): void {
  core_error(prettyStringify(error))
  if (isSkipAction(error?.message)) {
    info(error.message)
    process.exitCode = ExitCode.Success
  } else {
    setFailed(`Action failed with error ${error}`)
  }
}
