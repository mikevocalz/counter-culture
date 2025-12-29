import { View, Text, Pressable } from 'react-native'
import { MessageCircleMore, Settings } from 'lucide-react-native'
import { SolitoImage } from 'solito/image'

export function UserProfileHeader({
  username,
  following,
  onToggleFollow,
  avatarUrl,
}: {
  username: string
  following: boolean
  onToggleFollow: () => void
  avatarUrl?: string 
}) {
  return (
    <View className="flex-col items-center gap-4 p-4 w-full">
      <View className="flex-row items-center gap-4">
        <SolitoImage
          contentFit="cover"
          priority
          src={
            avatarUrl ||
            'https://images.pexels.com/photos/6626882/pexels-photo-6626882.jpeg'
          }
          width={90}
          height={90}
          style={{ aspectRatio: 1, width: 90, height: 90, borderRadius: 10, overflow: 'hidden' }}
          alt={`${username}'s avatar`}
        />

        <View className="flex-1">
          <Text className="text-[22px] font-bold text-stone-100">{username}</Text>

          <View className="my-2 flex-row items-center gap-3">
            <Pressable
              onPress={onToggleFollow}
              className={`rounded-lg px-3.5 py-1.5 ${following ? 'bg-stone-700' : 'bg-[#a032d6]'}`}
            >
              <Text className="font-semibold text-white">
                {following ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <MessageCircleMore size={22} style={{ marginHorizontal: 6 }} color="#f5f5f4" />
            <Settings size={22} style={{ marginHorizontal: 6 }} color="#f5f5f4" />
          </View>
        </View>
      </View>

      <View>
        <View className="my-2 flex-row gap-4">
          <Text className="text-neutral-200">
            <Text className="font-bold text-stone-100">247</Text> posts
          </Text>
          <Text className="text-neutral-200">
            <Text className="font-bold text-stone-100">12.4k</Text> followers
          </Text>
          <Text className="text-neutral-200">
            <Text className="font-bold text-stone-100">834</Text> following
          </Text>
        </View>

        <Text className="text-[13px] text-neutral-200 opacity-90">
          Product Designer & Creative Developer Crafting digital experiences
          with code & pixels 📍 San Francisco
        </Text>
      </View>
    </View>
  )
}
