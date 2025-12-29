'use client'

import { useState } from 'react'
import { Modal, Platform, View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import { X } from 'lucide-react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { useCommentLikes } from 'app/hooks'
import { CommentThread } from '@components/CommentThread'
import type { Comment } from 'app/lib/data'

type CommentsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  comments: Comment[]
  commentCount: number
}

export function CommentsDialog({ open, onOpenChange, comments, commentCount }: CommentsDialogProps) {
  const { isCommentLiked, toggleCommentLike } = useCommentLikes()
  const [draft, setDraft] = useState('')
  const isWeb = Platform.OS === 'web'

  if (isWeb) {
    if (!open) return null
    return (
      <View className="fixed inset-0 z-50">
        <View className="flex-1 justify-end bg-black/70">
          <View className="max-h-[80%] rounded-t-3xl border border-stone-800 bg-stone-950">
            <View className="flex-row items-center justify-between border-b border-stone-800 px-4 py-3">
              <Text className="text-base font-semibold text-stone-100">Comments ({commentCount})</Text>
              <Pressable onPress={() => onOpenChange(false)} className="h-8 w-8 items-center justify-center">
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
        </View>
      </View>
    )
  }

  return (
    <Modal visible={open} animationType="slide" transparent onRequestClose={() => onOpenChange(false)}>
      <View className="flex-1 justify-end bg-black/70">
        <View className="max-h-[80%] rounded-t-3xl border border-stone-800 bg-stone-950">
          <View className="flex-row items-center justify-between border-b border-stone-800 px-4 py-3">
            <Text className="text-base font-semibold text-stone-100">Comments ({commentCount})</Text>
            <Pressable onPress={() => onOpenChange(false)} className="h-8 w-8 items-center justify-center">
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
      </View>
    </Modal>
  )
}
