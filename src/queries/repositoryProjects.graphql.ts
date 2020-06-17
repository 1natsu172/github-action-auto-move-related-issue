export const repositoryProjects = `
  query repositoryProjects($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      projects(first: 100) {
        nodes {
          name
          number
        }
      }
    }
  }
`
