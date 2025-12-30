import { FeedDetailsScreen } from 'app/features/feed-post/detail-screen'
import { useLocalSearchParams, Stack } from 'expo-router'
import { PROFILE_USERNAME } from 'app/lib/profile-posts'
import { Text, View } from 'react-native'

export default function FeedPostDetails() {
  const params = useLocalSearchParams()
  const username = params.username as string || 'Post'
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: username,
          headerBackTitle: ' ',
          headerBackVisible: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontFamily: 'RepublicaMinor', letterSpacing: 0.6, color: '#fff', maxWidth: 280 }}
              >
                {username}
              </Text>
            </View>
          ),
        }} 
      />
      <FeedDetailsScreen />
    </>
  )
}
