'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { LegendList, type LegendListRenderItemProps } from '@legendapp/list'
import { useRouter } from 'solito/navigation'
import { useFocusEffect } from '@react-navigation/native'
import { StoriesBar } from '@components/StoriesBar'
import { FeedPost } from '@components/FeedPost'
import { BottomNav } from '@components/BottomNav'
import { feedPosts } from 'app/lib/data'
import { useScrollRestoration } from 'app/hooks'
import { cn } from 'app/lib/utils'
import { Motion } from '@legendapp/motion'

export function HomeScreen() {
  const router = useRouter()
  const blockNavigationRef = useRef(false)
  const listRef = useRef<LegendList<(typeof feedPosts)[number]>>(null)
  const [isScreenFocused, setIsScreenFocused] = useState(true)
  useScrollRestoration('feed')

  const useFocusEffectSafe =
    Platform.OS === 'web'
      ? (effect: () => void | (() => void)) => {
          useEffect(() => effect(), [effect])
        }
      : useFocusEffect

  useFocusEffectSafe(
    useCallback(() => {
      setIsScreenFocused(true)
      return () => {
        setIsScreenFocused(false)
      }
    }, [])
  )
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-3xl' : 'w-full'

  const storageIdKey = useMemo(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return ''
    return `feed-id:${window.location.pathname}${window.location.search}`
  }, [])

  useEffect(() => {
    if (Platform.OS !== 'web' || !storageIdKey) return
    const savedId = sessionStorage.getItem(storageIdKey)
    if (!savedId) return
    const item = feedPosts.find((post) => post.id === savedId)
    if (!item) return
    const index = feedPosts.findIndex((post) => post.id === savedId)
    const restore = () => {
      listRef.current?.scrollItemIntoView({ item, animated: false })
      if (index >= 0) {
        listRef.current?.scrollIndexIntoView({ index, animated: false })
      }
    }
    requestAnimationFrame(restore)
    setTimeout(restore, 0)
    setTimeout(restore, 120)
  }, [storageIdKey])

  const handleControlPress = useCallback(() => {
    blockNavigationRef.current = true
    setTimeout(() => {
      blockNavigationRef.current = false
    }, 0)
  }, [])

  const handleNavigate = useCallback(
    (username: string, postId: string) => {
      if (blockNavigationRef.current) return
      if (storageIdKey) {
        sessionStorage.setItem(storageIdKey, postId)
      }
      router.push(`/username/${postId}`)
    },
    [router, storageIdKey]
  )

  return (
    <View className="flex-1 bg-stone-950">
      <View className={cn(containerClass)}>
        <LegendList
          ref={listRef}
          data={feedPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }: LegendListRenderItemProps<(typeof feedPosts)[number]>) => (
            <Motion.View
              className="px-[4px] py-3"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: index * 0.1
              }}
            >
              <Pressable
                onPress={() => handleNavigate(item.author.username, item.id)}
                className="rounded-2xl"
              >
                <FeedPost post={item} enableMediaPress={true} onControlPress={handleControlPress} isScreenFocused={isScreenFocused} />
              </Pressable>
            </Motion.View>
          )}
          ListHeaderComponent={
            <View>
              <StoriesBar />
            </View>
          }
          contentContainerStyle={{ paddingBottom: 96 }}
          waitForInitialLayout
          estimatedItemSize={520}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomNav />
    </View>
  )
}
