import {
  matchIssueNumberFromGitHubURL,
  matchIssueParagraph,
  matchIssueURLWithoutKeyword,
  matchNumberOfShortNotationIssue,
  matchShortNotationIssueWithoutKeyword
} from './regex'
import {context} from '../fixtures/context.json'

const bodyFixture = context.payload.pull_request.body
const issueParagraph = bodyFixture.match(matchIssueParagraph)?.join('') || ''

describe('matchIssueParagraph', () => {
  test('toMatchRegex', () => {
    expect(bodyFixture).toMatch(matchIssueParagraph)
  })

  test(`If not a paragraph of Issue, it shouldn't match.`, () => {
    const body = `# Hello\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nfixed https://github.com/sushi-kun/github-projects-lab/issues/8\r\n\r\n`

    expect(body.match(matchIssueParagraph)).toBeNull()
  })

  test('Match the first position Issue paragraph', () => {
    const body = `# Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nfixed https://github.com/sushi-kun/github-projects-lab/issues/8\r\n\r\n### piyo\r\n\r\n🐤 \r\n\r\n### hoge\r\n\r\n* hoge\r\n\r\n### Fuga\r\n\r\nfuga\r\n\r\n`

    expect(JSON.stringify(body.match(matchIssueParagraph))).toEqual(
      JSON.stringify([
        `# Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nfixed https://github.com/sushi-kun/github-projects-lab/issues/8\r\n\r\n`
      ])
    )
  })
  test('Match the middle position Issue paragraph', () => {
    const body = `### hoge\r\n\r\n* hoge\r\n\r\n### Fuga\r\n\r\nfuga\r\n\r\n# Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nfixed https://github.com/sushi-kun/github-projects-lab/issues/8\r\n\r\n### piyo\r\n\r\n🐤 `

    expect(JSON.stringify(body.match(matchIssueParagraph))).toEqual(
      JSON.stringify([
        `# Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nfixed https://github.com/sushi-kun/github-projects-lab/issues/8\r\n\r\n`
      ])
    )
  })

  test('Match the last position Issue paragraph', () => {
    const body = `# Hello\r\n\r\nsome text\r\n\r\n# Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nfixed https://github.com/sushi-kun/github-projects-lab/issues/8\r\n\r\n`

    expect(JSON.stringify(body.match(matchIssueParagraph))).toEqual(
      JSON.stringify([
        `# Issue\r\n\r\n#1\r\nhttps://github.com/sushi-kun/github-projects-lab/issues/2\r\n\r\n#3 https://github.com/sushi-kun/github-projects-lab/issues/6\r\n\r\nfixed #4 https://github.com/sushi-kun/github-projects-lab/issues/5\r\n#7\r\n\r\nfixed https://github.com/sushi-kun/github-projects-lab/issues/8\r\n\r\n`
      ])
    )
  })
})

describe('matchIssueURLWithoutKeyword', () => {
  test('toMatchRegex', () => {
    expect(issueParagraph).toMatch(matchIssueURLWithoutKeyword)
  })
  test('pick only issue url without keyword', () => {
    expect(
      JSON.stringify(issueParagraph.match(matchIssueURLWithoutKeyword))
    ).toBe(
      JSON.stringify([
        'https://github.com/sushi-kun/github-projects-lab/issues/2',
        'https://github.com/sushi-kun/github-projects-lab/issues/6',
        'https://github.com/sushi-kun/github-projects-lab/issues/5',
        'https://github.com/sushi-kun/github-projects-lab/issues/88',
        'https://github.com/sushi-kun/github-projects-lab/issues/888',
        'https://github.com/sushi-kun/github-projects-lab/issues/8888'
      ])
    )
  })
  test('No URLs other than github.com should be matched.', () => {
    expect(issueParagraph.match(matchIssueURLWithoutKeyword)?.join('')).toEqual(
      expect.not.stringMatching(/example.com/)
    )
  })
})

describe('matchIssueNumberFromGitHubURL', () => {
  const urls = issueParagraph.match(matchIssueURLWithoutKeyword)?.join()
  test('toMatchRegex', () => {
    expect(urls).toMatch(matchIssueNumberFromGitHubURL)
  })
  test('match issue number from github-url', () => {
    expect(JSON.stringify(urls?.match(matchIssueNumberFromGitHubURL))).toBe(
      JSON.stringify(['2', '6', '5', '88', '888', '8888'])
    )
  })
})

describe('matchShortNotationIssueWithoutKeyword', () => {
  test('toMatchRegex', () => {
    expect(issueParagraph).toMatch(matchShortNotationIssueWithoutKeyword)
  })
  test('pick only short-notation issue without keyword', () => {
    expect(
      JSON.stringify(
        issueParagraph.match(matchShortNotationIssueWithoutKeyword)
      )
    ).toBe(JSON.stringify(['#1', '#3', '#7', '#77', '#777', '#7777']))
  })
})

describe('matchNumberOfShortNotationIssue', () => {
  const shortNotationIssue = issueParagraph
    .match(matchShortNotationIssueWithoutKeyword)
    ?.join()
  test('toMatchRegex', () => {
    expect(shortNotationIssue).toMatch(matchNumberOfShortNotationIssue)
  })
  test('pick issue number of short-notation issue', () => {
    expect(
      JSON.stringify(shortNotationIssue?.match(matchNumberOfShortNotationIssue))
    ).toBe(JSON.stringify(['1', '3', '7', '77', '777', '7777']))
  })
})
