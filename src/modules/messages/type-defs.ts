export default `
  type Message {
    author: User
    body: String!
    createdAt: String!
    id: ID!
  }

  type AddMessageResponse {
    message: Message
  }

  extend type Query {
    author: User
  }

  extend type Mutation {
    addMessage(body: String!): AddMessageResponse
  }
`;
