/** Row shape from GET/POST `/api/article/:id/comments`. */
export type ArticleCommentRow = {
  id: number;
  content: string;
  created_at: string;
  author_name: string | null;
  author_username: string;
  author_avatar: string | null;
};

/** Normalized for list UI. */
export type ArticleCommentDisplay = {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
};

export const COMMENT_PLACEHOLDER_AVATAR =
  "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg";
