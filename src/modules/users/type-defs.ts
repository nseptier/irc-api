export default `
  type User {
    id: ID!
    name: String!
  }

  type ConnectResponse {
    token: String
    user: User
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    connect(name: String!): ConnectResponse
  }
`;
