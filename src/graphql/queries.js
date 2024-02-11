/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPOST = /* GraphQL */ `
  query GetPOST($id: ID!) {
    getPOST(id: $id) {
      id
      name
      price
      dividend
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPOSTS = /* GraphQL */ `
  query ListPOSTS(
    $filter: ModelPOSTFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPOSTS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        dividend
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
