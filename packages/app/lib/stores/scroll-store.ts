import { useEffect, useState } from 'react'

type Listener = () => void

const positions = new Map<string, number>()
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((listener) => listener())
}

export function saveScrollPosition(key: string, value: number) {
  positions.set(key, value)
  emit()
}

export function getScrollPosition(key: string) {
  return positions.get(key) ?? 0
}

export function useScrollStore() {
  const [, setVersion] = useState(0)

  useEffect(() => {
    const listener = () => {
      setVersion((value) => value + 1)
    }
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return { saveScrollPosition, getScrollPosition }
}
