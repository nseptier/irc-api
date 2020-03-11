export default `
  type User {
    id: ID!
    name: String!
    password: String!
  }

  type LoginResponse {
    token: String
    user: User
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    register(name: String!, password: String!): User
    logIn(name: String!, password: String!): LoginResponse
  }
`;
