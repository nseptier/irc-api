import UserModel from './model';

type UserArgs = {
  name: string,
};


type AddUserArgs = {
  name: string,
  password: string,
};

export default {
  Query: {
    user: async (source: any, { name }: UserArgs) => (
      await UserModel.findOne({ name })
    ),
  },
  Mutation: {
    addUser: async (root: any, user: AddUserArgs) => (
      await UserModel.create(user)
    ),
  }
};
