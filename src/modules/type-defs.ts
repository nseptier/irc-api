import User from 'modules/users/type-def';

const Query = `
  type Query {
    none: String
  }

  type Mutation {
    none: String
  }
`;

export default [Query, User];
