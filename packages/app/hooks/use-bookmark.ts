'use client'

import { useCallback, useState } from 'react'

interface UseBookmarkOptions {
  initialSaved?: boolean
  onSave?: (isSaved: boolean) => void
}

export function useBookmark({ initialSaved = false, onSave }: UseBookmarkOptions = {}) {
  const [isSaved, setIsSaved] = useState(initialSaved)

  const toggleSave = useCallback(() => {
    setIsSaved((prev) => {
      const next = !prev
      onSave?.(next)
      return next
    })
  }, [onSave])

  return { isSaved, toggleSave }
}
