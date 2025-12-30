'use client'

import { Text, Pressable, View, Platform } from 'react-native'
import { LegendList, type LegendListRenderItemProps } from '@legendapp/list'
import { Section } from '@expo/html-elements'
import { Plus } from 'lucide-react-native'
import { StoryRing } from '@components/StoryRing'
import { cn } from 'app/lib/utils'
import { Motion } from '@legendapp/motion'

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
    isViewed: false,
  },
  {
    id: '2',
    username: 'alex.dev',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
    isViewed: false,
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
    isViewed: false,
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
    isViewed: false,
  },
  {
    id: '7',
    username: 'amy.cook',
    avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasStory: true,
    isViewed: false,
  },
]

export function StoriesBar() {
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-3xl' : 'w-full'

  const yourStory = stories.find(s => s.isYou)
  const otherStories = stories.filter(s => !s.isYou)

  return (
    <Section aria-label="Stories" className="border-b border-stone-800">
      <View className={cn(containerClass)}>
        <View style={{ height: 154, flexDirection: 'row' }}>
          {yourStory && (
            <View style={{ paddingVertical: 6, paddingLeft: 4, paddingRight: 10 }}>
              <Pressable className="items-center gap-1.5">
                <View className="relative">
                  <View className="h-[110px] w-20 items-center justify-center rounded-xl border-2 border-stone-800 bg-stone-900">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                      <Plus size={24} color="#0c0a09" strokeWidth={3} />
                    </View>
                  </View>
                </View>
                <Text
                  className="max-w-[64px] text-[9px] font-bold text-stone-400"
                  numberOfLines={1}
                >
                  Your Story
                </Text>
              </Pressable>
            </View>
          )}
          <LegendList
            horizontal
            data={otherStories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={{ paddingLeft: 10, paddingRight: 40 }}
            contentContainerStyle={{
              paddingVertical: 6,
              gap: 16,
              paddingRight: 40,
            }}
            renderItem={({
              item,
              index,
            }: LegendListRenderItemProps<(typeof otherStories)[number]>) => (
              <Motion.View
                initial={{
                  opacity: 0,
                  x: -100,
                  scale: 0.9,
                  zIndex: otherStories.length - index,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  zIndex: otherStories.length - index,
                }}
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 90,
                  delay: index * 0.15,
                }}
              >
                <Pressable className="items-center gap-1.5">
                  <View className="relative">
                    <StoryRing
                      src={item.avatar}
                      alt={item.username}
                      hasStory={item.hasStory}
                      isViewed={item.isViewed}
                    />
                  </View>
                  <Text
                    className="max-w-[64px] text-xs text-stone-400"
                    numberOfLines={1}
                  >
                    {item.username}
                  </Text>
                </Pressable>
              </Motion.View>
            )}
          />
        </View>
      </View>
    </Section>
  )
}
