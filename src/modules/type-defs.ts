import Messages from 'modules/messages/type-defs';
import Users from 'modules/users/type-defs';

const Query = `
  type Query {
    none: String
  }

  type Mutation {
    none: String
  }
`;

export default [
  Query,
  Messages,
  Users,
];
