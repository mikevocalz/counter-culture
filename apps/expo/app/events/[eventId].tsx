import { useLocalSearchParams } from 'expo-router'
import EventDetailScreen from 'app/features/events/detail-screen'

export default function EventDetailRoute() {
  const { eventId } = useLocalSearchParams<{ eventId?: string | string[] }>()
  const resolvedId = Array.isArray(eventId) ? eventId[0] : eventId

  if (!resolvedId) {
    return null
  }

  return <EventDetailScreen eventId={resolvedId} />
}
