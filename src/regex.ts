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
// IssueでもissueでもIssuesでもissuesでもOK
// これもOK
// ### hoge\r\n\r\n* hoge\r\n\r\n### Fuga\r\n\r\nfuga\r\n\r\n# Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\n### piyo\r\n\r\n🐤

// これもOK
// # Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\n
export const matchIssueParagraph = /(#+.issue).*?(?=#+\D|$)/im

/**
 * match: https://github.com/sushi-kun/github-projects-lab/issues/6
 * don't match: fix https://github.com/sushi-kun/github-projects-lab/pull/2
 */
// ref: match url pattern => https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
// # Issue\r\n\r\n#1\r\nfix https://github.com/sushi-kun/github-projects-lab/pull/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nhttps://example.com/sushi-kun/github-projects-lab/issues/5
export const matchIssueURLWithoutKeyword = /(?<!(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved) )(https?:\/\/(www\.)?github\.com{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gim

/**
 * from: https://github.com/sushi-kun/github-projects-lab/pull/2
 * match: 2
 */
export const matchIssueNumberFromGitHubURL = /(?<=pull\/|issues\/)\d/gim
