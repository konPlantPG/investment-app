/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPOST = /* GraphQL */ `
  mutation CreatePOST(
    $input: CreatePOSTInput!
    $condition: ModelPOSTConditionInput
  ) {
    createPOST(input: $input, condition: $condition) {
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
export const updatePOST = /* GraphQL */ `
  mutation UpdatePOST(
    $input: UpdatePOSTInput!
    $condition: ModelPOSTConditionInput
  ) {
    updatePOST(input: $input, condition: $condition) {
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
export const deletePOST = /* GraphQL */ `
  mutation DeletePOST(
    $input: DeletePOSTInput!
    $condition: ModelPOSTConditionInput
  ) {
    deletePOST(input: $input, condition: $condition) {
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
