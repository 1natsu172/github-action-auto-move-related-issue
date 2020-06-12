/**
 * match: #1 #12 #123
 * don't match: fixed #1 close #12 resolve #123
 */
export const matchShortNotationIssueWithoutKeyword = /(?<!(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved) )#\d+/gim

/**
 * match: # Issue\r\n\r\n#1
 * don't match: # Foo\r\n\r\n#1
 *
 */
export const matchIssueParagraph = /#+ issue[^]+?(?=#+ )|#+ issue[^]+$/im

/**
 * match: https://github.com/sushi-kun/github-projects-lab/issues/6
 * don't match: fix https://github.com/sushi-kun/github-projects-lab/pull/2
 */
// ref: match url pattern => https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
export const matchIssueURLWithoutKeyword = /(?<!(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved) )(https?:\/\/(www\.)?github\.com{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/gim

/**
 * from: https://github.com/sushi-kun/github-projects-lab/pull/2
 * match: 2
 */
export const matchIssueNumberFromGitHubURL = /(?<=pul\/|issues\/)\d+/gim

/**
 * from #1 #12 #123
 * match: 1 12 123
 */
export const matchNumberOfShortNotationIssue = /(?<=#)\d+/gim
;/(?<!(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved) )(https?:\/\/(www\.)?github\.com{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/gim
