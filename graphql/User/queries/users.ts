import gql from "graphql-tag";

export const usersQuery = gql`
  query Users($id: ID) {
    users(id: $id) {
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
