export const addProjectCard = `
  mutation addProjectCard(
    $projectColumnId: ID!
    $contentId: ID
  ) {
    addProjectCard(
      input: { projectColumnId: $projectColumnId, contentId: $contentId }
    ) {
      __typename
      cardEdge {
        node {
          id
          column {
            id
          }
        }
      }
    }
  }
`
