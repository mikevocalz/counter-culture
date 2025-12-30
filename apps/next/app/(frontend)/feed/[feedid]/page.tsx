import nextDynamic from 'next/dynamic'

const FeedPostDetailsClient = nextDynamic(
  () => import('./feed-post-details-client'),
  { ssr: false }
)

export const dynamic = 'force-dynamic'

export default function FeedPostDetails() {
  return <FeedPostDetailsClient />
}
