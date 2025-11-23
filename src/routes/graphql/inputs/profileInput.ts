import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDTypeNonNull } from '../types/uuid.js';
import { MemberTypeIdEnum } from '../types/memberType.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: UUIDTypeNonNull },
    memberTypeId: { type: MemberTypeIdEnum },
  }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  }),
});
