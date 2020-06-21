export const moveProjectCard = `
  mutation moveProjectCard(
    $cardId: ID!
    $columnId: ID!
  ) {
    moveProjectCard(
      input: {
        cardId: $cardId
        columnId: $columnId
      }
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
