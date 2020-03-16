import Message, { MessageInterface } from './model';
import User, { UserInterface } from 'modules/users/model';
import { getUser } from 'modules/users/resolvers';

export const getAuthor = async (message: any) => (
  await getUser(null, { id: message.authorId })
);

export const addMessage = async (
  root: any,
  { body }: MessageInterface,
  { currentUser }: { currentUser: UserInterface }
) => {
  const message = await Message.create({ authorId: currentUser.id, body });

  return { message };
};

export default {
  Message: {
    author: getAuthor,
  },

  Mutation: {
    addMessage,
  },
};

