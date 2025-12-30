import nextDynamic from 'next/dynamic'

export const dynamic = 'force-dynamic'

const FeedPostDetailsClient = nextDynamic(
  () => import('./feed-post-details-client'),
  { ssr: false }
)

export default function FeedPostDetailsPage() {
  return <FeedPostDetailsClient />
}
