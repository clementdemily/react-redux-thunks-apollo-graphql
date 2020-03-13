import gql from "graphql-tag";

export const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGN_IN = gql`
mutation($email: String!, $password: String!) {
  signIn(userIdentifier: $email, password: $password") {
      token,
      user {
        id,
        email,
        username
      }
  }
}
`;
