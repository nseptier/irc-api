import { GraphQLSchema } from 'graphql';
import { Mutation, Query } from './types';

export const schema = new GraphQLSchema({
  mutation: Mutation,
  query: Query,
});
