import dynamic from 'next/dynamic'

const EventsClient = dynamic(() => import('./events-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function EventsPage() {
  return <EventsClient />
}
