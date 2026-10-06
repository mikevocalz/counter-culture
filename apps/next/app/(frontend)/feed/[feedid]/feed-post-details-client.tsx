'use client'

import nextDynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useParams, useRouter } from 'solito/navigation'
import { feedPosts } from 'app/lib/data'

const FeedDetailsScreen = nextDynamic(
  () => import('app/features/feed-post/detail-screen').then((m) => m.FeedDetailsScreen),
  { ssr: false }
)

export default function FeedPostDetailsClient() {
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
