import EventDetailScreen from 'app/features/events/detail-screen'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params

  return <EventDetailScreen eventId={eventId} />
}
