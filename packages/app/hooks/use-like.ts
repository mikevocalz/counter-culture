'use client'

import { useCallback, useState } from 'react'

interface UseLikeOptions {
  initialLiked?: boolean
  initialCount: number
  onLike?: (isLiked: boolean) => void
}

export function useLike({ initialLiked = false, initialCount, onLike }: UseLikeOptions) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialCount)

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => {
      const next = !prev
      setLikeCount((count) => (next ? count + 1 : count - 1))
      onLike?.(next)
      return next
    })
  }, [onLike])

  const like = useCallback(() => {
    if (!isLiked) {
      setIsLiked(true)
      setLikeCount((count) => count + 1)
      onLike?.(true)
    }
  }, [isLiked, onLike])

  return { isLiked, likeCount, toggleLike, like }
}
