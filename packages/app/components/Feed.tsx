'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { feedPosts } from 'app/lib/data'
import { FeedPost } from '@components/FeedPost'
import { useRouter } from 'solito/navigation'
import { cn } from 'app/lib/utils'
import { LegendList, type LegendListRenderItemProps } from '@legendapp/list'

export function Feed() {
  const router = useRouter()
  const blockNavigationRef = useRef(false)
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-2xl' : 'w-full'
  const storageKey = useMemo(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return ''
    return `feed-scroll:${window.location.pathname}${window.location.search}`
  }, [])

  const handleControlPress = () => {
    blockNavigationRef.current = true
    setTimeout(() => {
      blockNavigationRef.current = false
    }, 0)
  }

  useEffect(() => {
    if (Platform.OS !== 'web' || !storageKey) return
    const saved = sessionStorage.getItem(storageKey)
    if (!saved) return
    const y = Number(saved)
    if (!Number.isNaN(y)) {
      const restore = () => window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
      requestAnimationFrame(restore)
      setTimeout(restore, 0)
      setTimeout(restore, 120)
    }
  }, [storageKey])

  const handleNavigate = (username: string, postId: string) => {
    if (blockNavigationRef.current) return
    if (Platform.OS === 'web' && storageKey) {
      sessionStorage.setItem(storageKey, String(window.scrollY))
    }
    router.push(`/${encodeURIComponent(username)}/${postId}`)
  }
  return (
    <View className="pb-24">
      <View className={cn(containerClass)}>
        <LegendList
          data={feedPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: LegendListRenderItemProps<(typeof feedPosts)[number]>) => (
            <View className="px-4 py-3">
              <Pressable
                onPress={() => handleNavigate(item.author.username, item.id)}
                className="rounded-2xl border border-stone-900/70 bg-stone-950/80 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl"
              >
                <FeedPost
                  post={item}
                  enableMediaPress={false}
                  enablePlayToggle={false}
                  onControlPress={handleControlPress}
                />
              </Pressable>
            </View>
          )}
          scrollEnabled={false}
          estimatedItemSize={520}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
