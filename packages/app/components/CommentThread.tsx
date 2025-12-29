'use client'

import { View, Text, Pressable } from 'react-native'
import { Heart } from 'lucide-react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { cn } from 'app/lib/utils'
import type { Comment } from 'app/lib/data'

type CommentThreadProps = {
  comments: Comment[]
  isCommentLiked: (commentId: string) => boolean
  toggleCommentLike: (commentId: string) => void
  depth?: number
}

export function CommentThread({ comments, isCommentLiked, toggleCommentLike, depth = 0 }: CommentThreadProps) {
  return (
    <View className="gap-4">
      {comments.map((comment) => {
        const liked = isCommentLiked(comment.id)
        return (
          <View
            key={comment.id}
            className={cn('flex-row gap-3', depth > 0 && 'border-l border-stone-800 pl-3')}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback>{comment.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <View className="flex-1">
              <Text className="text-sm leading-relaxed text-stone-200">
                <Text className="font-semibold text-stone-100">{comment.username} </Text>
                {comment.text}
              </Text>
              <View className="mt-1 flex-row items-center gap-4">
                <Text className="text-xs text-stone-500">{comment.timeAgo}</Text>
                <Text className="text-xs text-stone-500">
                  {comment.likes + (liked ? 1 : 0)} likes
                </Text>
                <Text className="text-xs text-stone-500">Reply</Text>
              </View>

              {comment.replies?.length ? (
                <View className="mt-3">
                  <CommentThread
                    comments={comment.replies}
                    isCommentLiked={isCommentLiked}
                    toggleCommentLike={toggleCommentLike}
                    depth={depth + 1}
                  />
                </View>
              ) : null}
            </View>

            <Pressable
              onPress={() => toggleCommentLike(comment.id)}
              className="self-start"
              accessibilityLabel="Like comment"
            >
              <Heart size={16} color={liked ? '#f43f5e' : '#a8a29e'} fill={liked ? '#f43f5e' : 'transparent'} />
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}
