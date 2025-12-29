'use client'

import { View } from 'react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { cn } from 'app/lib/utils'

interface StoryRingProps {
  src?: string
  alt: string
  hasStory?: boolean
  isViewed?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-[88px] w-14',
  md: 'h-[104px] w-20',
  lg: 'h-[120px] w-24',
}

const ringClasses = {
  sm: 'p-[2px]',
  md: 'p-[3px]',
  lg: 'p-[3px]',
}

export function StoryRing({
  src,
  alt,
  hasStory = false,
  isViewed = false,
  size = 'md',
  className,
}: StoryRingProps) {
  return (
    <View
      className={cn(
        'rounded-xl',
        ringClasses[size],
        hasStory && !isViewed && 'bg-gradient-to-tr from-amber-400 via-rose-400 to-emerald-400',
        hasStory && isViewed && 'bg-stone-800',
        !hasStory && 'bg-stone-900/60',
        className
      )}
    >
      <Avatar className={cn(sizeClasses[size], 'rounded-xl border-2 border-stone-950')}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-stone-800 text-stone-100">
          {alt.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </View>
  )
}
