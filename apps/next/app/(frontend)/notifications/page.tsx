import dynamic from 'next/dynamic'

const NotificationsClient = dynamic(
  () => import('./notifications-client'),
  { ssr: false }
)

export const dynamic = 'force-dynamic'

export default function NotificationsPage() {
  return <NotificationsClient />
}
