import { Text, Pressable, View } from 'react-native'
import { MessageCircleMore, Settings } from 'lucide-react'
import { SolitoImage } from 'solito/image'
import { Header, H1, Section } from '@expo/html-elements'

const mergeClassNames = (...values: Array<string | undefined | false>) =>
  values.filter(Boolean).join(' ')

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
    <Header className="mx-auto w-full max-w-5xl px-2 py-6 text-stone-100">
      <Section className="w-full flex flex-col gap-5 rounded-2xl border border-stone-900/70 bg-stone-950/80 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:gap-6 md:p-6">
        <View className="flex flex-col gap-5 md:flex-row md:gap-7">
          <View className="shrink-0 justify-center md:block">
            <SolitoImage
              contentFit="cover"
              priority
              src={
                avatarUrl ||
                'https://images.pexels.com/photos/6626882/pexels-photo-6626882.jpeg'
              }
              width={90}
              height={90}
              className="h-20  w-20 aspect-square md:h-36 md:w-36 rounded-lg object-cover"
              alt={`${username}'s avatar`}
            />
          </View>

          <View className="flex-1 gap-4">
            <View className="flex flex-wrap items-start gap-3">
              <View className="flex-row items-center gap-2">
                <H1 className="text-2xl font-semibold text-left text-stone-50">{username}</H1>
                <Text className="px-2 py-[2px] rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-500/40">
                  Creator
                </Text>
              </View>

              <View className="flex-row flex-wrap gap-2">
                <Pressable
                  onPress={onToggleFollow}
                  className={mergeClassNames(
                    'px-4 py-2 rounded-full shadow-lg shadow-fuchsia-600/15 flex-row items-center justify-center',
                    following
                      ? 'bg-stone-800/80 border border-stone-700'
                      : 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-500'
                  )}
                >
                  <Text className="text-white text-center font-semibold">
                    {following ? 'Following' : 'Follow'}
                  </Text>
                </Pressable>

                <Pressable className="flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-stone-900/70 border border-stone-800">
                  <MessageCircleMore size={18} color="#f5f5f4" />
                  <Text className="text-stone-100 font-medium">Message</Text>
                </Pressable>

                <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-stone-900/70 border border-stone-800">
                  <Settings size={18} color="#f5f5f4" />
                </Pressable>
              </View>
            </View>

            <View className="flex-row flex-wrap items-center gap-3 text-sm text-stone-100">
              <Text className="px-3 py-1 text-white rounded-full bg-stone-900/80 border border-stone-800">
                Digital product visionary
              </Text>
              <Text className="px-3 py-1 text-white rounded-full bg-stone-900/80 border border-stone-800">
                Crafting adaptive experiences
              </Text>
              <Text className="px-3 py-1 text-white rounded-full bg-stone-900/80 border border-stone-800">
                📍 San Francisco
              </Text>
            </View>

            <View className="mt-4 flex-row justify-between rounded-xl border border-stone-800/70 bg-stone-900/70 px-4 py-3 text-sm text-stone-200 md:gap-8">
              <View className="items-center text-center md:text-left">
                <Text className="font-semibold text-stone-50">2,648</Text>
                <Text className="block md:inline md:ml-1 text-stone-200"> posts</Text>
              </View>

              <View className="items-center text-center md:text-left">
                <Text className="font-semibold text-stone-50">4,747</Text>
                <Text className="block md:inline md:ml-1 text-stone-200"> followers</Text>
              </View>

              <View className="items-center text-center md:text-left">
                <Text className="font-semibold text-stone-50">4,008</Text>
                <Text className="block md:inline md:ml-1 text-stone-200"> following</Text>
              </View>
            </View>

            <View className="mt-4 flex-row flex-wrap gap-4 text-sm leading-snug text-stone-200">
              <Text className="font-semibold text-stone-50">Latisha Brown</Text>

              <Text className="text-stone-200">Founder • Fitness • Lifestyle</Text>

              <Text className="text-blue-400 font-medium">tstringsllc.com</Text>
            </View>
          </View>
        </View>
      </Section>
    </Header>
  )
}
