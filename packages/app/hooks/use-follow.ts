'use client'

import { useCallback, useState } from 'react'

interface UseFollowOptions {
  initialFollowing?: boolean
  onFollow?: (isFollowing: boolean) => void
}

export function useFollow({ initialFollowing = false, onFollow }: UseFollowOptions = {}) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)

  const toggleFollow = useCallback(() => {
    setIsFollowing((prev) => {
      const next = !prev
      onFollow?.(next)
      return next
    })
  }, [onFollow])

  return { isFollowing, toggleFollow }
}

export function useFollowList(initialState: Record<string, boolean> = {}) {
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>(initialState)

  const toggleFollow = useCallback((id: string, currentStatus?: boolean) => {
    setFollowStatus((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : !currentStatus,
    }))
  }, [])

  const getFollowState = useCallback(
    (id: string, fallback?: boolean) =>
      followStatus[id] !== undefined ? followStatus[id] : fallback ?? false,
    [followStatus]
  )

  return { followStatus, toggleFollow, getFollowState }
}
