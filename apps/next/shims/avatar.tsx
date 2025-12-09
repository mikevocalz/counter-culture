import React from 'react'
import { View, Text, Image as RNImage } from 'react-native'

export type RootRef = View
export interface RootProps {
  alt: string
  className?: string
  children?: React.ReactNode
}

export const Root = React.forwardRef<RootRef, RootProps>(
  ({ alt, className, children, ...props }, ref) => {
    return (
      <View ref={ref} className={className} {...props}>
        {children}
      </View>
    )
  }
)

Root.displayName = 'AvatarRoot'

export type ImageRef = RNImage
export interface ImageProps {
  src?: string
  source?: any
  className?: string
}

export const Image = React.forwardRef<ImageRef, ImageProps>(
  ({ src, source, className, ...props }, ref) => {
    const resolvedSource = source ?? (src ? { uri: src } : undefined)
    
    return (
      <RNImage
        ref={ref}
        source={resolvedSource}
        className={className}
        {...props}
      />
    )
  }
)

Image.displayName = 'AvatarImage'

export type FallbackRef = View
export interface FallbackProps {
  className?: string
  children?: React.ReactNode
}

export const Fallback = React.forwardRef<FallbackRef, FallbackProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={className} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-sm font-semibold">{children}</Text>
      ) : (
        children
      )}
    </View>
  )
)

Fallback.displayName = 'AvatarFallback'
