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

  type UserConnectedResponse {
    message: Message
    user: User
  }

  extend type Query {
    refreshAccessToken: AuthResponse!
  }

  extend type Mutation {
    connect(name: String!): ConnectResponse
  }

  extend type Subscription {
    userConnected: UserConnectedResponse
  }
`;
