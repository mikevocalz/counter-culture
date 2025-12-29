'use client'

import { Pressable, ScrollView, Text, View } from 'react-native'
import { SolitoImage } from 'solito/image'
import ScreenScrollView from '@components/ScreenScrollView'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { BottomNav } from '@components/BottomNav'
import { useFollowList, useTabs } from 'app/hooks'
import { cn } from 'app/lib/utils'

const TABS = ['All', 'Follows', 'Likes', 'Comments', 'Mentions'] as const

type Notification = {
  id: string
  type: 'follow' | 'like' | 'comment' | 'mention'
  user: {
    username: string
    avatar: string
  }
  content?: string
  post?: {
    id: string
    thumbnail: string
  }
  timeAgo: string
  isFollowing?: boolean
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'follow',
    user: {
      username: 'sarah_design',
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    timeAgo: '2m',
    isFollowing: false,
  },
  {
    id: '2',
    type: 'like',
    user: {
      username: 'mike_photo',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    post: {
      id: 'p1',
      thumbnail: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    timeAgo: '15m',
  },
  {
    id: '3',
    type: 'comment',
    user: {
      username: 'travel_jane',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    content: 'Amazing shot! Where was this taken?',
    post: {
      id: 'p2',
      thumbnail: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    timeAgo: '1h',
  },
  {
    id: '4',
    type: 'mention',
    user: {
      username: 'foodie_alex',
      avatar: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    content: 'Check out this restaurant with @you!',
    post: {
      id: 'p3',
      thumbnail: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    timeAgo: '2h',
  },
  {
    id: '5',
    type: 'follow',
    user: {
      username: 'john_fitness',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    timeAgo: '3h',
    isFollowing: true,
  },
]

export function NotificationsScreen() {
  const { activeTab, selectTab, isActive } = useTabs({ tabs: TABS, defaultTab: 'All' })
  const { toggleFollow, getFollowState } = useFollowList()

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Follows') return notification.type === 'follow'
    if (activeTab === 'Likes') return notification.type === 'like'
    if (activeTab === 'Comments') return notification.type === 'comment'
    if (activeTab === 'Mentions') return notification.type === 'mention'
    return true
  })

  return (
    <View className="flex-1 bg-stone-950">
      <ScreenScrollView className="flex-1 pb-24">
        <View className="divide-y divide-stone-800">
          {filteredNotifications.map((notification) => (
            <View key={notification.id} className="flex-row items-center gap-3 px-4 py-4">
              <Avatar className="h-11 w-11">
                <AvatarImage src={notification.user.avatar} />
                <AvatarFallback>{notification.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <View className="flex-1">
                <Text className="text-sm text-stone-200">
                  <Text className="font-semibold text-stone-100">{notification.user.username} </Text>
                  {notification.type === 'follow' && 'started following you.'}
                  {notification.type === 'like' && 'liked your post.'}
                  {notification.type === 'comment' && `commented: ${notification.content}`}
                  {notification.type === 'mention' && `mentioned you: ${notification.content}`}
                  <Text className="text-stone-500"> {notification.timeAgo}</Text>
                </Text>
              </View>

              {notification.type === 'follow' ? (
                <Pressable
                  onPress={() => toggleFollow(notification.id, notification.isFollowing)}
                  className={cn(
                    'rounded-full px-4 py-2',
                    getFollowState(notification.id, notification.isFollowing) ? 'bg-stone-800' : 'bg-emerald-500'
                  )}
                >
                  <Text
                    className={cn(
                      'text-xs font-semibold',
                      getFollowState(notification.id, notification.isFollowing)
                        ? 'text-stone-100'
                        : 'text-stone-950'
                    )}
                  >
                    {getFollowState(notification.id, notification.isFollowing) ? 'Following' : 'Follow'}
                  </Text>
                </Pressable>
              ) : notification.post ? (
                <View className="h-11 w-11 overflow-hidden rounded-lg bg-stone-900">
                  <SolitoImage
                    src={notification.post.thumbnail}
                    alt="Post"
                    width={44}
                    height={44}
                    contentFit="cover"
                  />
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScreenScrollView>

      <BottomNav />
    </View>
  )
}
