export interface IUser {
  id: string;
  name: string;
  balance: number;
}

export interface IUserSubscribedTo {
  userId: string;
  authorId: string;
}

export interface INewUser {
  dto: {
    name: string;
    balance: number;
  }
}

export interface IUserInput {
  id: string;
  dto: {
    name: string;
    balance: number;
  }
}
