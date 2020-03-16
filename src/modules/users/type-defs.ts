export default `
  type User {
    id: ID!
    name: String!
  }

  type ConnectResponse {
    user: User
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    connect(name: String!): ConnectResponse
  }
`;
