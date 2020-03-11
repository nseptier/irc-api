import User from 'modules/users/type-defs';

const Query = `
  type Query {
    none: String
  }

  type Mutation {
    none: String
  }
`;

export default [Query, User];
