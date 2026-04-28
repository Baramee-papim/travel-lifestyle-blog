export interface BlogPost {
  id: number
  image: string
  category: string
  title: string
  description: string
  author?: string
  date: string
  likes?: number
  likes_count?: number
  /** Present on article detail when server resolves viewer; false for guests. */
  liked_by_me?: boolean
  content?: string
  status?: string
}

export interface PostsApiResponse {
  posts: BlogPost[]
}
