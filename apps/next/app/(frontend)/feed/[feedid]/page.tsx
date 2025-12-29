'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'solito/navigation'
import { FeedDetailsScreen } from 'app/features/feed-post/detail-screen'
import { feedPosts } from 'app/lib/data'

export default function FeedPostDetails() {
  const router = useRouter()
  const params = useParams<{ feedid: string }>()
  const feedId = params?.feedid

  useEffect(() => {
    if (!feedId) return
    const post = feedPosts.find((item) => item.id === feedId)
    if (!post) return
    router.replace(`/${encodeURIComponent(post.author.username)}/${post.id}`)
  }, [feedId, router])

  return <FeedDetailsScreen />
}
