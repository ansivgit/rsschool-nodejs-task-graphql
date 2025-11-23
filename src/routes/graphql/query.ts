import { GraphQLList, GraphQLObjectType } from 'graphql';

import { prismaClient } from './prismaClient.js';
import { UUIDTypeNonNull } from './types/uuid.js';
import { UserType } from './types/user.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';
import { MemberTypeType, MemberTypeIdEnum } from './types/memberType.js';

import { IUser } from './interfaces/User.js';
import { IPost } from './interfaces/Post.js';
import { IProfile } from './interfaces/Profile.js';
import { IMember } from './interfaces/Member.js';

export const Query = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => await prismaClient.user.findMany(),
      // resolve: async (parent, args, context) => {
      // return await context.prisma.user.findMany();
      // },
    },

    user: {
      type: UserType,
      args: { id: { type: UUIDTypeNonNull } },
      resolve: async (_, { id }: IUser) =>
        await prismaClient.user.findFirst({ where: { id } }),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async () => await prismaClient.post.findMany(),
    },

    post: {
      type: PostType,
      args: { id: { type: UUIDTypeNonNull } },
      resolve: async (_, { id }: IPost) =>
        await prismaClient.post.findFirst({ where: { id } }),
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async () => await prismaClient.profile.findMany({}),
    },

    profile: {
      type: ProfileType,
      args: { id: { type: UUIDTypeNonNull } },
      resolve: async (_, { id }: IProfile) =>
        await prismaClient.profile.findFirst({ where: { id } }),
    },

    memberTypes: {
      type: new GraphQLList(MemberTypeType),
      resolve: async () => await prismaClient.memberType.findMany(),
    },

    memberType: {
      type: MemberTypeType,
      args: { id: { type: MemberTypeIdEnum } },
      resolve: async (_, { id }: IMember) =>
        await prismaClient.memberType.findFirst({ where: { id } }),
    },
  }),
});
