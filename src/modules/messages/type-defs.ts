export default `
  enum Event {
    USER_CONNECTED
    USER_DISCONNECTED
  }

  type AddMessageResponse {
    message: Message
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

  extend type Mutation {
    addMessage(body: String!): AddMessageResponse
  }

  extend type Subscription {
    messageAdded: AddMessageResponse
  }
`;
