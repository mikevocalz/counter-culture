'use client'

import { useMemo } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { CommentThread } from '@components/CommentThread'
import { useCommentLikes } from 'app/hooks'
import { useCommentsSheetStore } from 'app/store'
import { useTrueSheetNavigation } from '@lodev09/react-native-true-sheet/navigation'
import { useRoute, type RouteProp } from '@react-navigation/native'
import type { Comment } from 'app/lib/data'
import type { CommentsSheetParamList } from './CommentsSheetNavigator'

function findCommentById(comments: Comment[], commentId: string): Comment | undefined {
  for (const comment of comments) {
    if (comment.id === commentId) return comment
    if (comment.replies?.length) {
      const found = findCommentById(comment.replies, commentId)
      if (found) return found
    }
  }
  return undefined
}

export function CommentThreadScreen() {
  const navigation = useTrueSheetNavigation<CommentsSheetParamList>()
  const route = useRoute<RouteProp<CommentsSheetParamList, 'Thread'>>()
  const { comments } = useCommentsSheetStore()
  const { isCommentLiked, toggleCommentLike } = useCommentLikes()

  const threadRoot = useMemo(
    () => findCommentById(comments, route.params.commentId),
    [comments, route.params.commentId]
  )

  return (
    <View className="flex-1 bg-stone-950">
      <View className="flex-row items-center gap-3 border-b border-stone-800 px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} className="h-8 w-8 items-center justify-center">
          <ChevronLeft size={20} color="#e7e5e4" />
        </Pressable>
        <Text className="text-base font-semibold text-stone-100">Thread</Text>
      </View>

      <ScrollView className="px-4 py-4">
        {threadRoot ? (
          <CommentThread
            comments={[threadRoot]}
            isCommentLiked={isCommentLiked}
            toggleCommentLike={toggleCommentLike}
          />
        ) : (
          <Text className="text-sm text-stone-500">Thread not found.</Text>
        )}
      </ScrollView>
    </View>
  )
}
