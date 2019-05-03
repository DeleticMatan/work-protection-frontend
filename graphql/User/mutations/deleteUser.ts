import gql from "graphql-tag";

export const deleteUserMutation = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
