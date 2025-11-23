export interface IProfile {
  id: string;
  isMale: boolean,
  yearOfBirth: number,
  userId: string,
  memberTypeId: 'BASIC' | 'BUSINESS',
}

export interface INewProfile {
  dto: {
    isMale: boolean,
    yearOfBirth: number,
    userId: string,
    memberTypeId: 'BASIC' | 'BUSINESS',
  }
}

export interface IProfileInput {
  id: string;
  dto: {
    isMale: boolean,
    yearOfBirth: number,
    memberTypeId: 'BASIC' | 'BUSINESS',
  }
}

