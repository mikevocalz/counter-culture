'use client'

import { useRef } from 'react'
import { View, Platform } from 'react-native'
import { LegendList, LegendListRef, LegendListRenderItemProps } from '@legendapp/list'
import { FeedPost } from '@components/feed-post'
import ScreenScrollView from '@components/ScreenScrollView'

interface Post {
  id: string
  user: {
    name: string
    avatar: string
    username: string
  }
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  location?: string
  commentPreviews?: Array<{
    user: string
    avatar: string
    text: string
  }>
}

// Sample feed data
const FEED_DATA: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      username: '@sarahchen',
    },
    timestamp: '2h ago',
    content:
      'Just launched my new portfolio site! Built with Next.js and it feels incredibly fast. The developer experience is amazing 🚀',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 234,
    comments: 18,
    shares: 12,
    location: 'San Francisco, CA',
    commentPreviews: [
      {
        user: 'Alex Kim',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Looks incredible! Love the animations',
      },
      {
        user: 'Jamie Lee',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: "Can't wait to see the final version!",
      },
      {
        user: 'Maria Garcia',
        avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'The design is so clean!',
      },
      {
        user: 'Tom Wilson',
        avatar: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Great work on this!',
      },
    ],
  },
  {
    id: '2',
    user: {
      name: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      username: '@marcusj',
    },
    timestamp: '5h ago',
    content:
      'Golden hour at the coast never gets old. Nature is the best designer 🌅',
    image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 1243,
    comments: 87,
    shares: 45,
    location: 'Big Sur, California',
    commentPreviews: [
      {
        user: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Absolutely stunning capture!',
      },
      {
        user: 'Chris Martinez',
        avatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Where is this spot?',
      },
      {
        user: 'Nina Chen',
        avatar: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Perfect timing! 🌅',
      },
      {
        user: 'Ryan Lopez',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'This is goals!',
      },
    ],
  },
  {
    id: '3',
    user: {
      name: 'Priya Patel',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      username: '@priyapatel',
    },
    timestamp: '8h ago',
    content:
      'New coffee spot in the neighborhood. Their cold brew is perfection ☕️✨',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 456,
    comments: 23,
    shares: 8,
    location: 'Brooklyn, NY',
    commentPreviews: [
      {
        user: 'David Park',
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Adding this to my list!',
      },
      {
        user: 'Sofia Rodriguez',
        avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'We should go together!',
      },
      {
        user: 'Kevin Brown',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Best coffee in Brooklyn!',
      },
      {
        user: 'Lisa Anderson',
        avatar: 'https://images.pexels.com/photos/3765550/pexels-photo-3765550.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Their pastries are amazing too!',
      },
    ],
  },
]

const isWeb = Platform.OS === 'web'

export function HomeScreen() {
  const listRef = useRef<LegendListRef | null>(null)

  const renderItem = ({ item }: LegendListRenderItemProps<Post>) => {
    return (
      <View className="w-full items-center">
        <FeedPost post={item} />
      </View>
    )
  }

  return (
    <ScreenScrollView
      showsHorizontalScrollIndicator={false}
      contentInsetAdjustmentBehavior="always"
      className="flex-1 w-full !pt-[50px] md:pb-[400px] h-full !bg-stone-950 !self-center max-w-7xl min-w-screen flex-grow"
    >
      <LegendList
        data={FEED_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-[30px]" />}
        estimatedItemSize={400}
        drawDistance={1000}
        className="grow-1 w-full px-2 py-2 pb-[300px] md:pb-[800px] bg-stone-950"
        ref={listRef}
        maintainVisibleContentPosition={!isWeb}
      />
    </ScreenScrollView>
  )
}
