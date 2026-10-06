'use client'

import nextDynamic from 'next/dynamic'

const FeedDetailsScreen = nextDynamic(
  () => import('app/features/feed-post/detail-screen').then((m) => m.FeedDetailsScreen),
  { ssr: false }
)

export default function FeedPostDetailsClient() {
  return <FeedDetailsScreen />
}
