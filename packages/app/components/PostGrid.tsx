import { useState } from 'react'
import { FlatList, useWindowDimensions, View } from 'react-native'

import { Post } from './types/Post'
import { PostCard } from './PostCard'
import { PostSkeleton } from './PostSkeleton'

export function PostGrid({ initialPosts }: { initialPosts: Post[] }) {
  const { width } = useWindowDimensions()
  const numColumns = width < 420 ? 3 : 4

  const [posts] = useState(initialPosts)

  return (
    <FlatList
    contentContainerStyle={{paddingBottom:200}}
      scrollEnabled={false}
      removeClippedSubviews={false}
      data={posts}
      renderItem={({ item }) => (
        <View
          style={{
            width: `${100 / numColumns}%`,
            padding: 6,
          }}
        >
          <PostCard post={item} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      key={numColumns}
      showsVerticalScrollIndicator={false}
    />
  )
}
