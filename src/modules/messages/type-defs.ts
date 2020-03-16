export default `
  type Message {
    author: User
    body: String!
    createdAt: String!
    id: ID!
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
`;
