import { useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { LegendList, type LegendListRenderItemProps } from '@legendapp/list'
import { useRouter } from 'solito/navigation'

import { Post } from './types/Post'
import { PostCard } from './PostCard'

export function PostGrid({ initialPosts, username }: { initialPosts: Post[]; username?: string }) {
  const { width: windowWidth } = useWindowDimensions()
  const router = useRouter()

  const [posts] = useState(initialPosts)
  const gap = 8
  const numColumns = windowWidth >= 768 ? 4 : 3
  const handleOpen = (post: Post) => {
    if (!username) return
    router.push(`/${encodeURIComponent(username)}/${post.id}`)
  }

  const renderItem = ({ item }: LegendListRenderItemProps<Post>) => (
    <View
      style={{
        flex: 1,
        paddingHorizontal: gap / 2,
        marginBottom: gap,
      }}
    >
      <PostCard post={item} onPress={username ? () => handleOpen(item) : undefined} />
    </View>
  )

  return (
    <LegendList
      contentContainerStyle={{ paddingBottom: 200, paddingHorizontal: gap / 2 }}
      scrollEnabled={false}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      key={numColumns}
      showsVerticalScrollIndicator={false}
      recycleItems
    />
  )
}
