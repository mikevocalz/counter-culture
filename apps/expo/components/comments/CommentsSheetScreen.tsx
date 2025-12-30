'use client'

import { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { X } from 'lucide-react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { CommentThread } from '@components/CommentThread'
import { useCommentLikes } from 'app/hooks'
import { useCommentsSheetStore } from 'app/store'
import { useTrueSheetNavigation } from '@lodev09/react-native-true-sheet/navigation'
import type { Comment } from 'app/lib/data'
import type { CommentsSheetParamList } from './CommentsSheetNavigator'

export function CommentsSheetScreen() {
  const navigation = useTrueSheetNavigation<CommentsSheetParamList>()
  const { comments, commentCount } = useCommentsSheetStore()
  const { isCommentLiked, toggleCommentLike } = useCommentLikes()
  const [draft, setDraft] = useState('')

  const handleThreadPress = useCallback(
    (comment: Comment) => {
      navigation.navigate('Thread', { commentId: comment.id })
    },
    [navigation]
  )

  return (
    <View className="flex-1 bg-stone-950">
      <View className="flex-row items-center justify-between border-b border-stone-800 px-4 py-3">
        <Text className="text-base font-semibold text-stone-100">Comments ({commentCount})</Text>
        <Pressable onPress={() => navigation.goBack()} className="h-8 w-8 items-center justify-center">
          <X size={18} color="#e7e5e4" />
        </Pressable>
      </View>

      <ScrollView className="px-4 py-4">
        {comments.length === 0 ? (
          <Text className="text-sm text-stone-500">No comments yet. Be the first to comment.</Text>
        ) : (
          <CommentThread
            comments={comments}
            isCommentLiked={isCommentLiked}
            toggleCommentLike={toggleCommentLike}
            maxDepth={0}
            onThreadPress={handleThreadPress}
          />
        )}
      </ScrollView>

      <View className="flex-row items-center gap-3 border-t border-stone-800 px-4 py-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Add a comment..."
          placeholderTextColor="#78716c"
          className="flex-1 text-sm text-stone-100"
        />
        <Pressable
          disabled={!draft.trim()}
          onPress={() => setDraft('')}
          className={draft.trim() ? 'opacity-100' : 'opacity-40'}
        >
          <Text className="text-sm font-semibold text-emerald-400">Post</Text>
        </Pressable>
      </View>
    </View>
  )
}
