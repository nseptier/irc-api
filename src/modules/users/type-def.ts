export default `
  type User {
    id: ID!
    name: String!
    password: String!
  }

  extend type Query {
    user(name: String!): User
  }

  extend type Mutation {
    addUser(name: String!, password: String!): User
  }
`;
