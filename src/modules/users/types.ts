import UserModel from 'modules/users/model';
import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
  }
});

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: User,
      args: {
        name: { type: GraphQLString },
      },
      resolve: async (source, { name }) => await UserModel.findOne({ name }),
    },
  },
});

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: User,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (source, { name, password }) => (
        await UserModel.create({ name, password })
      ),
    },
  },
});
