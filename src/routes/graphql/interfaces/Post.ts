export interface IPost {
  id: string,
  title: string,
  content: string,
  authorId: string,
}

export interface INewPost {
  dto: {
    title: string,
    content: string,
    authorId: string,
  }
}

export interface IPostInput {
  id: string;
  dto: {
    title: string,
    content: string,
    authorId: string,
  }
}
