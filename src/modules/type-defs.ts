import Auth from 'modules/auth/type-defs';
import Messages from 'modules/messages/type-defs';
import Users from 'modules/users/type-defs';

const Query = `
  type Query {
    none: String
  }

  type Mutation {
    none: String
  }

  type Subscription {
    none: String
  }
`;

export default [
  Query,
  Auth,
  Messages,
  Users,
];
