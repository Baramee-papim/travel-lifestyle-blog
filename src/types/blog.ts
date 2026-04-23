export interface BlogPost {
  id: number
  image: string
  category: string
  title: string
  description: string
  author: string
  date: string
  likes?: number
  content?: string
}

export interface PostsApiResponse {
  posts: BlogPost[]
}
