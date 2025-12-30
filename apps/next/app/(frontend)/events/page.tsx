import nextDynamic from 'next/dynamic'

const EventsClient = nextDynamic(() => import('./events-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function EventsPage() {
  return <EventsClient />
}
