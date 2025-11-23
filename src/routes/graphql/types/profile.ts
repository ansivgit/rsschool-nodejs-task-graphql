import { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLInt } from 'graphql';
import { prismaClient } from '../prismaClient.js';

import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { IUser } from '../interfaces/User.js';
import { IProfile } from '../interfaces/Profile.js';
import { MemberTypeIdNonNull, MemberTypeIdEnum, MemberTypeType } from './memberType.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    memberType: {
      type: MemberTypeType,
      resolve: async ({ memberTypeId }: IProfile) => {
        return await prismaClient.memberType.findFirst({ where: { id: memberTypeId } });
      },
    },
  }),
});

// export const ProfilesType = new GraphQLList(ProfileType);
