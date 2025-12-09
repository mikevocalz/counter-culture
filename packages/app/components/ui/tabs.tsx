'use client'

import * as React from 'react'
import { Platform } from 'react-native'
import * as TabsPrimitive from '@rn-primitives/tabs'

const mergeClassNames = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ')

const Tabs = React.forwardRef<TabsPrimitive.RootRef, TabsPrimitive.RootProps>(
  ({ className, ...props }, ref) => {
    return (
      <TabsPrimitive.Root
        ref={ref}
        className={mergeClassNames('flex flex-col gap-2', className)}
        {...props}
      />
    )
  }
)

Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<TabsPrimitive.ListRef, TabsPrimitive.ListProps>(
  ({ className, ...props }, ref) => {
    return (
      <TabsPrimitive.List
        ref={ref}
        className={mergeClassNames(
          'bg-muted flex h-9 flex-row items-center justify-center rounded-lg p-[3px]',
          Platform.select({ web: 'inline-flex w-fit', default: 'mr-auto' }),
          className
        )}
        {...props}
      />
    )
  }
)

TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<TabsPrimitive.TriggerRef, TabsPrimitive.TriggerProps>(
  ({ className, disabled, value, ...props }, ref) => {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        value={value}
        disabled={disabled}
        className={mergeClassNames(
          'flex h-[calc(100%-1px)] flex-row items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 shadow-none shadow-black/5',
          Platform.select({
            web: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex cursor-default whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
            default: undefined,
          }),
          disabled ? 'opacity-50' : undefined,
          className
        )}
        {...props}
      />
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<TabsPrimitive.ContentRef, TabsPrimitive.ContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <TabsPrimitive.Content
        ref={ref}
        className={mergeClassNames(
          Platform.select({ web: 'flex-1 outline-none', default: undefined }),
          className
        )}
        {...props}
      />
    )
  }
)

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
