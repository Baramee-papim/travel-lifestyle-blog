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
  content?: string
  status?: string
}

export interface PostsApiResponse {
  posts: BlogPost[]
}
