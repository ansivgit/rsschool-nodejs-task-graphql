import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { IPost } from '../interfaces/Post.js';
import { prismaClient } from '../prismaClient.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    // author: {
    //   type: UserType,
    //   resolve: async ({ authorId }: IPost) => await prismaClient.user.findFirst({ where: { id: authorId } }),
    // },
  }),
});
