export interface IProfile {
  id: string;
  isMale: boolean,
  yearOfBirth: number,
  userId: string,
  memberTypeId: 'BASIC' | 'BUSINESS',
}
