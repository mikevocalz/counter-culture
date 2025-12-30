import dynamic from 'next/dynamic'

const FeedPostDetailsClient = dynamic(
  () => import('./feed-post-details-client'),
  { ssr: false }
)

export const dynamic = 'force-dynamic'

export default function FeedPostDetails() {
  return <FeedPostDetailsClient />
}
