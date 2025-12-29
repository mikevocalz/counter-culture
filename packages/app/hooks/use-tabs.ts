'use client'

import { useCallback, useState } from 'react'

interface UseTabsOptions<T extends string> {
  tabs: readonly T[]
  defaultTab?: T
}

export function useTabs<T extends string>({ tabs, defaultTab }: UseTabsOptions<T>) {
  const [activeTab, setActiveTab] = useState<T>(defaultTab ?? tabs[0])

  const selectTab = useCallback((tab: T) => {
    setActiveTab(tab)
  }, [])

  const isActive = useCallback((tab: T) => activeTab === tab, [activeTab])

  return { activeTab, selectTab, isActive, tabs }
}
