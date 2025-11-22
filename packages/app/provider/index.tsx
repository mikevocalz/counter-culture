import { SafeArea } from 'app/provider/safe-area'
import { NavigationProvider } from './navigation'
import type { ReactElement } from 'react'

export function Provider({ children }: { children: ReactElement }) {
  return (
    <SafeArea>
      <NavigationProvider>{children}</NavigationProvider>
    </SafeArea>
  )
}
