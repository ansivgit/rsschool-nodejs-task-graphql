import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { prismaClient } from '../prismaClient.js';

import { UUIDType } from './uuid.js';
import { IProfile } from '../interfaces/Profile.js';
import { MemberTypeIdEnum, MemberTypeType } from './memberType.js';
import { UserType } from './user.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: UserType,
      resolve: async ({ userId }: IProfile) =>
        prismaClient.user.findFirst({ where: { id: userId } }),
    },
    memberTypeId: { type: MemberTypeIdEnum },
    memberType: {
      type: MemberTypeType,
      resolve: async ({ memberTypeId }: IProfile) => {
        return await prismaClient.memberType.findFirst({ where: { id: memberTypeId } });
      },
    },
  }),
});
