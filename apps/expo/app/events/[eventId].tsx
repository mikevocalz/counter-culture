import { useLocalSearchParams, Stack } from 'expo-router'
import { Text, View } from 'react-native'
import EventDetailScreen from 'app/features/events/detail-screen'

export default function EventDetailRoute() {
  const { eventId, eventName } = useLocalSearchParams<{ eventId?: string | string[]; eventName?: string }>()
  const resolvedId = Array.isArray(eventId) ? eventId[0] : eventId
  const title = eventName || 'Event'

  if (!resolvedId) {
    return null
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: title,
          headerBackTitle: ' ',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontFamily: 'RepublicaMinor', letterSpacing: 0.6, color: '#fff', maxWidth: 280 }}
              >
                {title}
              </Text>
            </View>
          ),
        }} 
      />
      <EventDetailScreen eventId={resolvedId} />
    </>
  )
}
