'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useScrollStore } from 'app/lib/stores/scroll-store'

export function useScrollRestoration(key: string) {
  const pathname = usePathname()
  const { saveScrollPosition, getScrollPosition } = useScrollStore()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPosition = getScrollPosition(key)
    if (savedPosition > 0) {
      setTimeout(() => {
        window.scrollTo({ top: savedPosition, behavior: 'instant' as ScrollBehavior })
      }, 0)
    }
  }, [key, getScrollPosition, pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => {
      saveScrollPosition(key, window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [key, saveScrollPosition])

  return null
}
