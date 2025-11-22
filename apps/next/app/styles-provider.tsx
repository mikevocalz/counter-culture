'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { useRef, ReactNode } from 'react'
import { StyleSheet } from 'react-native'

export function StylesProvider({ children }: { children: ReactNode }) {
  const isServerInserted = useRef(false)
  useServerInsertedHTML(() => {
    if (isServerInserted.current) return

    isServerInserted.current = true
    const sheet = StyleSheet.getSheet()

    return (
      <style
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    )
  })
  return <>{children}</>
}
