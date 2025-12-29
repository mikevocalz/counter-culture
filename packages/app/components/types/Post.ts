export type Post = {
  id: number
  image: string
  type?: 'image' | 'video' | 'carousel'
  images?: string[]
  videoUrl?: string
  caption: string
  likes: number
  comments: number
  commentList?: Array<{
    id: string
    username: string
    text: string
    timeAgo: string
    likes: number
    replies?: Array<{
      id: string
      username: string
      text: string
      timeAgo: string
      likes: number
      replies?: Array<{
        id: string
        username: string
        text: string
        timeAgo: string
        likes: number
      }>
    }>
  }>
  timestamp: string
}
