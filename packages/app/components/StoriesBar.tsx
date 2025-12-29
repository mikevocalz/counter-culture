'use client'

import { Text, Pressable, View, Platform } from 'react-native'
import { LegendList, type LegendListRenderItemProps } from '@legendapp/list'
import { Section } from '@expo/html-elements'
import { PlusSquare } from 'lucide-react-native'
import { StoryRing } from '@components/StoryRing'
import { cn } from 'app/lib/utils'

const stories = [
  {
    id: 'your-story',
    username: 'Your story',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: false,
    isYou: true,
  },
  {
    id: '1',
    username: 'emma_w',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
  },
  {
    id: '2',
    username: 'alex.dev',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
  },
  {
    id: '3',
    username: 'sarah.art',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
    isViewed: false,
  },
  {
    id: '4',
    username: 'mike_photo',
    avatar: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
  },
  {
    id: '5',
    username: 'lisa.music',
    avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
    isViewed: false,
  },
  {
    id: '6',
    username: 'john_fit',
    avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
  },
  {
    id: '7',
    username: 'amy.cook',
    avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
    isViewed: true,
  },
]

export function StoriesBar() {
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-3xl' : 'w-full'

  return (
    <Section aria-label="Stories" className="border-b border-stone-800">
      <View className={cn(containerClass)}>
        <View style={{ height: 154 }}>
          <LegendList
          horizontal
          data={stories}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 6, gap: 16 }}
          renderItem={({ item }: LegendListRenderItemProps<(typeof stories)[number]>) => (
            <Pressable className="items-center gap-1.5">
              <View className="relative">
                <StoryRing
                  src={item.avatar}
                  alt={item.username}
                  hasStory={item.hasStory}
                  isViewed={item.isViewed}
                />
                {item.isYou ? (
                  <View className="absolute -bottom-0.5 -right-0.5 h-5 w-5 items-center justify-center rounded-lg bg-emerald-500">
                    <PlusSquare size={12} color="#0c0a09" />
                  </View>
                ) : null}
              </View>
              <Text className="max-w-[64px] text-xs text-stone-400" numberOfLines={1}>
                {item.isYou ? 'Your story' : item.username}
              </Text>
            </Pressable>
          )}
          />
        </View>
      </View>
    </Section>
  )
}
