export function promiseRejectedReasonHandler<T>(
  promiseSettledResult: PromiseSettledResult<T>[],
  handle: (arg: string | Error) => unknown
): void {
  const rejectedReasons = promiseSettledResult
    .filter((res): res is PromiseRejectedResult => res.status === 'rejected')
    .map((n) => n.reason)

  if (rejectedReasons.length) {
    for (const reason of rejectedReasons) {
      handle(reason)
    }
  }
}
