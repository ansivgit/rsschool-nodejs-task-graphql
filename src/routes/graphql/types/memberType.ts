import { GraphQLObjectType, GraphQLFloat, GraphQLList, GraphQLEnumType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { ProfileType } from './profile.js';
import { IMember } from '../interfaces/Member.js';
import { prismaClient } from '../prismaClient.js';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const MemberTypeIdNonNull = new GraphQLNonNull(MemberTypeIdEnum);

export const MemberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async ({ id }: IMember) => {
        return await prismaClient.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});
