/** Row shape from GET/POST `/api/article/:id/comments`. */
export type ArticleCommentRow = {
  id: number;
  content: string;
  created_at: string;
  author_name: string | null;
  author_username: string;
  author_avatar: string | null;
};

/** Normalized for list UI. `avatar` null → show default user icon (see Navbar). */
export type ArticleCommentDisplay = {
  id: number;
  author: string;
  avatar: string | null;
  date: string;
  content: string;
};
