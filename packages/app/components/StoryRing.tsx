'use client'

import { Platform, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
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
  const showGradient = hasStory && !isViewed
  const avatarContent = (
    <Avatar className={cn(sizeClasses[size], 'rounded-xl border-2 border-stone-950')}>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-stone-800 text-stone-100">
        {alt.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )

  if (Platform.OS === 'web') {
    return (
      <View
        className={cn(
          'rounded-xl',
          ringClasses[size],
          showGradient && 'bg-gradient-to-tr from-[#3FDCFF] via-[#FF5BFC] to-[#8A40CF]',
          hasStory && isViewed && 'bg-stone-800',
          !hasStory && 'bg-stone-900/60',
          className
        )}
      >
        {avatarContent}
      </View>
    )
  }

  if (showGradient) {
    return (
      <LinearGradient
        colors={['#3FDCFF', '#FF5BFC', '#8A40CF']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 12,
          padding: size === 'sm' ? 2 : 3,
        }}
      >
        {avatarContent}
      </LinearGradient>
    )
  }

  return (
    <View
      className={cn(
        'rounded-xl',
        ringClasses[size],
        hasStory && isViewed && 'bg-stone-800',
        !hasStory && 'bg-stone-900/60',
        className
      )}
    >
      {avatarContent}
    </View>
  )
}
