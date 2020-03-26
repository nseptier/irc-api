export default `
  type User {
    id: ID!
    name: String!
  }

  extend type Query {
    currentUser: User
  }
`;
