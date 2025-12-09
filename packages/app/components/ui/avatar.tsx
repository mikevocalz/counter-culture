'use client'

import * as React from 'react'
import { Text } from 'react-native'
import * as AvatarPrimitive from '@rn-primitives/avatar'

type AvatarImageProps = AvatarPrimitive.ImageProps & {
  src?: string
}

const mergeClassNames = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ')

const Avatar = React.forwardRef<AvatarPrimitive.RootRef, AvatarPrimitive.RootProps>(
  ({ alt = 'Avatar', className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        alt={alt}
        className={mergeClassNames('h-10 w-10 overflow-hidden rounded-full bg-gray-200', className)}
        {...props}
      />
    )
  }
)

Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<AvatarPrimitive.ImageRef, AvatarImageProps>(
  ({ className, src, source, ...props }, ref) => {
    const resolvedSource = source ?? (src ? { uri: src } : undefined)

    return (
      <AvatarPrimitive.Image
        ref={ref}
        source={resolvedSource}
        className={mergeClassNames('h-full w-full', className)}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<AvatarPrimitive.FallbackRef, AvatarPrimitive.FallbackProps>(
  ({ className, children, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={mergeClassNames(
        'h-10 w-10 items-center justify-center rounded-full bg-gray-200',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-semibold text-gray-700">{children}</Text>
      ) : (
        children
      )}
    </AvatarPrimitive.Fallback>
  )
)

AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
