export const repositoryProjectColumns = `
  query repositoryProjectColumns($name: String!, $owner: String!, $projectNumber: Int!) {
    repository(name: $name, owner: $owner) {
      project(number: $projectNumber) {
        columns(first: 100) {
          nodes {
            name
            id
          }
        }
      }
    }
  }
`
