import nextDynamic from 'next/dynamic'

const NotificationsClient = nextDynamic(
  () => import('./notifications-client'),
  { ssr: false }
)

export const dynamic = 'force-dynamic'

export default function NotificationsPage() {
  return <NotificationsClient />
}
