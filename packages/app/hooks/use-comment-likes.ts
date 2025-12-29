'use client'

import { useCallback, useState } from 'react'

export function useCommentLikes(initialLiked: Set<string> = new Set()) {
  const [likedComments, setLikedComments] = useState<Set<string>>(initialLiked)

  const toggleCommentLike = useCallback((commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev)
      if (next.has(commentId)) {
        next.delete(commentId)
      } else {
        next.add(commentId)
      }
      return next
    })
  }, [])

  const isCommentLiked = useCallback((commentId: string) => likedComments.has(commentId), [likedComments])

  return { likedComments, toggleCommentLike, isCommentLiked }
}
