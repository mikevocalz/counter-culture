'use client'

import { useCallback, useRef } from 'react'

interface UseDoubleTapOptions {
  onDoubleTap: () => void
  onSingleTap?: () => void
  delay?: number
}

export function useDoubleTap({ onDoubleTap, onSingleTap, delay = 300 }: UseDoubleTapOptions) {
  const lastTapRef = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTap = useCallback(() => {
    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (timeSinceLastTap < delay && timeSinceLastTap > 0) {
      onDoubleTap()
      lastTapRef.current = 0
      return
    }

    lastTapRef.current = now
    if (onSingleTap) {
      timeoutRef.current = setTimeout(() => {
        onSingleTap()
        timeoutRef.current = null
      }, delay)
    }
  }, [delay, onDoubleTap, onSingleTap])

  return { onTap: handleTap }
}
