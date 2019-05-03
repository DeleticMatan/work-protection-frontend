import gql from "graphql-tag";

export const updateUserMutation = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      firstName
      lastName
      name
      companyName
      email
      isActive
      isAdmin
    }
  }
`;
