export interface CreatePostInput {
  title: string;
  content: string;
  image: Express.Multer.File;
  authorId: string;
}
