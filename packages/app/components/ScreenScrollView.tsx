import { ComponentProps, useEffect, useMemo, useRef } from 'react'
import { View, ScrollView, Platform } from 'react-native'

type Props = ComponentProps<typeof ScrollView> & {
  useWindowScrolling?: boolean
}

function ScreenScrollView({ useWindowScrolling = true, ...props }: Props) {
  const storageKey = useMemo(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return ''
    return `scroll:${window.location.pathname}${window.location.search}`
  }, [])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (Platform.OS !== 'web' || !useWindowScrolling) return
    const saved = sessionStorage.getItem(storageKey)
    if (saved) {
      const y = Number(saved)
      if (!Number.isNaN(y)) {
        const restore = () => window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
        requestAnimationFrame(restore)
        setTimeout(restore, 0)
        setTimeout(restore, 120)
      }
    }

    const handleScroll = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        sessionStorage.setItem(storageKey, String(window.scrollY))
      })
    }

    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      sessionStorage.setItem(storageKey, String(window.scrollY))
      window.history.scrollRestoration = previousRestoration
    }
  }, [storageKey, useWindowScrolling])

  if (Platform.OS === 'web' && useWindowScrolling) {
    return <View {...props} />
  }

  return <ScrollView {...props} />
}

export default ScreenScrollView
