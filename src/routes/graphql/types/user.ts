import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { prismaClient } from '../prismaClient.js';

import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { IUser } from '../interfaces/User.js';
import { IProfile } from '../interfaces/Profile.js';
import { IPost } from '../interfaces/Post.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: Pick<IUser, 'id'>) =>
        await prismaClient.profile.findFirst({ where: { userId: id } }),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: Pick<IUser, 'id'>) =>
        await prismaClient.post.findMany({ where: { authorId: id } }),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: Pick<IUser, 'id'>) => {
        const result = await prismaClient.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        });

        return result.map((record) => record.author);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: Pick<IUser, 'id'>) => {
        const result = await prismaClient.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        });
        return result.map((record) => record.subscriber);
      },
    },
  }),
});

export const UsersType = new GraphQLList(UserType);
