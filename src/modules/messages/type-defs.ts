export default `
  enum Event {
    USER_CONNECTED
    USER_DISCONNECTED
  }

  type Message {
    author: User
    body: String
    createdAt: String!
    event: Event
    id: ID!
    system: Boolean
  }

  extend type Query {
    messages: [Message]
  }

  type AddMessageResponse {
    message: Message
  }

  extend type Mutation {
    addMessage(body: String!): AddMessageResponse
  }

  type UserConnectedResponse {
    message: Message
    user: User
  }

  extend type Subscription {
    messageAdded: AddMessageResponse
    userConnected: UserConnectedResponse
  }
`;
