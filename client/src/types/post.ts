export interface PostAuthor {
  id: string;
  name: string;
  avatar?: string | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;

  author: PostAuthor;

  _count: {
    likes: number;
    comments: number;
  };
}
