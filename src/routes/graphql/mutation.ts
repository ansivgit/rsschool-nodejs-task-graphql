import { GraphQLObjectType, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { prismaClient } from './prismaClient.js';

import { UUIDType } from './types/uuid.js';
import { UserType } from './types/user.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';

import { CreateUserInputType, ChangeUserInputType } from './inputs/userInput.js';
import { CreatePostInputType, ChangePostInputType } from './inputs/postInput.js';
import { CreateProfileInputType, ChangeProfileInputType } from './inputs/profileInput.js';

import { IUser, INewUser, IUserInput, IUserSubscribedTo } from './interfaces/User.js';
import { IPost, INewPost, IPostInput } from './interfaces/Post.js';
import { IProfile, INewProfile, IProfileInput } from './interfaces/Profile.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',

  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInputType) },
      },
      resolve: async (_src, { dto }: INewUser) => {
        const user = await prismaClient.user.create({ data: dto });
        return user as IUser;
      },
    },

    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: UUIDType },
        dto: { type: ChangeUserInputType },
      },
      resolve: async (_src, { id, dto }: IUserInput) => {
        const user = await prismaClient.user.update({ where: { id }, data: dto });
        return user as IUser;
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_src, { id }: Pick<IUser, 'id'>) => {
        try {
          await prismaClient.user.delete({ where: { id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    createPost: {
      type: PostType,
      args: {
        dto: { type: CreatePostInputType },
      },
      resolve: async (_, { dto }: INewPost) => {
        const post = await prismaClient.post.create({ data: dto });
        return post as IPost;
        // return await prismaClient.post.create({ data: dto });
      },
    },

    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: UUIDType },
        dto: { type: ChangePostInputType },
      },
      resolve: async (_src, { id, dto }: IPostInput) => {
        const post = await prismaClient.post.update({ where: { id }, data: dto });
        return post;
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_src, { id }: Pick<IPost, 'id'>) => {
        try {
          await prismaClient.post.delete({ where: { id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInputType) },
      },
      resolve: async (_src, { dto }: INewProfile) => {
        const profile = await prismaClient.profile.create({ data: dto });
        return profile as IProfile;
      },
    },

    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: UUIDType },
        dto: { type: ChangeProfileInputType },
      },
      resolve: async (_src, { id, dto }: IProfileInput) => {
        const profile = await prismaClient.profile.update({ where: { id }, data: dto });
        return profile as IProfile;
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_src, { id }: Pick<IProfile, 'id'>) => {
        try {
          await prismaClient.profile.delete({ where: { id } });
        } catch (err) {
          return false;
        }

        return true;
      },
    },

    subscribeTo: {
      type: new GraphQLNonNull(UserType),
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: async (_, { userId, authorId }: IUserSubscribedTo) => {
        await prismaClient.user.update({
          where: { id: userId },
          data: {
            userSubscribedTo: {
              create: { authorId: authorId },
            },
          },
        });
        return true;
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: async (_, { userId, authorId }: IUserSubscribedTo) => {
        const unsubscribed = await prismaClient.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        });

        return unsubscribed ? true : false;
      },
    },
  }),
});
