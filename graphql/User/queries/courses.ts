import gql from "graphql-tag";

export const coursesQuery = gql`
  query Courses($id: ID) {
    courses(id: $id) {
      id
      title
      description
      duration
      thumbnail
      vimeoId
      status
    }
  }
`;
