export default `
  type ConnectResponse {
    user: User
  }

  type User {
    id: ID!
    name: String!
  }

  type UserConnectedResponse {
    message: Message
    user: User
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    connect(name: String!): ConnectResponse
  }

  extend type Subscription {
    userConnected: UserConnectedResponse
  }
`;
