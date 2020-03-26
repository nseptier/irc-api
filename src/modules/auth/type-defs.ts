export default `
  type AuthResponse {
    token: String!
    tokenExpiry: String!
  }

  type ConnectResponse {
    token: String!
    tokenExpiry: String!
    user: User
  }

  extend type Query {
    accessToken: AuthResponse!
  }

  extend type Mutation {
    connect(name: String!): ConnectResponse
  }
`;
