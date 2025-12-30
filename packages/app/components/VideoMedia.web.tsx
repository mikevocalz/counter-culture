import { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, View, Text, type GestureResponderEvent } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import { Pause, Volume2, VolumeX, Play } from 'lucide-react-native'
import { useVideoStore } from 'app/store'

type VideoMediaProps = {
  source: string
  postId?: string
  isActive?: boolean
  style?: StyleProp<ViewStyle>
  enableTapToMute?: boolean
  enablePlayToggle?: boolean
  onControlPress?: () => void
  videoPointerEvents?: 'auto' | 'none'
  showMuteButton?: boolean
}

export function VideoMedia({
  source,
  postId,
  isActive = true,
  style,
  enableTapToMute = true,
  enablePlayToggle = true,
  onControlPress,
  videoPointerEvents = 'auto',
  showMuteButton = true,
}: VideoMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const { setPosition, getPosition, muted, toggleMuted, activePostId } = useVideoStore()

  const savePosition = useCallback(() => {
    if (!postId) return
    const video = videoRef.current
    if (video && video.currentTime > 0) {
      setPosition(postId, video.currentTime)
    }
  }, [postId, setPosition])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    if (postId) {
      const savedPosition = getPosition(postId)
      if (savedPosition && savedPosition > 0) {
        video.currentTime = savedPosition
      }
    }
  }, [postId, getPosition])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = muted
    if (isActive) {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
      setIsPlaying(true)
    } else {
      savePosition()
      video.pause()
      setIsPlaying(false)
    }
  }, [isActive, muted, savePosition])

  useEffect(() => {
    if (!postId || !activePostId) return
    if (activePostId !== postId) {
      savePosition()
      videoRef.current?.pause()
      setIsPlaying(false)
    } else if (isActive) {
      const playPromise = videoRef.current?.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
      setIsPlaying(true)
    }
  }, [activePostId, isActive, postId, savePosition])

  useEffect(() => {
    if (!postId || !isActive) return
    
    const interval = setInterval(() => {
      savePosition()
    }, 1000)

    return () => clearInterval(interval)
  }, [postId, isActive, savePosition])

  useEffect(() => {
    return () => {
      savePosition()
    }
  }, [savePosition])

  const toggleMute = useCallback((event?: GestureResponderEvent) => {
    event?.stopPropagation?.()
    onControlPress?.()
    toggleMuted()
  }, [onControlPress, toggleMuted])

  const togglePlayback = useCallback((event?: GestureResponderEvent) => {
    event?.stopPropagation?.()
    onControlPress?.()
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setIsPlaying(true)
    } else {
      savePosition()
      video.pause()
      setIsPlaying(false)
    }
  }, [onControlPress, savePosition])

  return (
    <View style={[{ width: '100%', height: '100%' }, style]}>
      <video
        ref={videoRef}
        src={source}
        crossOrigin="anonymous"
        autoPlay
        loop
        playsInline
        preload="auto"
        onCanPlay={() => {
          if (isActive) {
            const playPromise = videoRef.current?.play()
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {})
            }
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: videoPointerEvents,
        }}
      />
      {enableTapToMute ? (
        <Pressable
          onPress={toggleMute}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
          accessibilityLabel={muted ? 'Unmute video' : 'Mute video'}
        />
      ) : null}
      {enablePlayToggle ? (
        <Pressable
          onPress={togglePlayback}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -28,
            marginTop: -28,
            height: 56,
            width: 56,
            borderRadius: 28,
            backgroundColor: 'rgba(0,0,0,0.45)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
          accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause size={24} color="#f5f5f4" />
          ) : (
            <Play size={24} color="#f5f5f4" fill="#f5f5f4" />
          )}
        </Pressable>
      ) : null}
      {showMuteButton ? (
        <Pressable
          onPress={toggleMute}
          style={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            backgroundColor: 'rgba(0,0,0,0.55)',
            borderRadius: 16,
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            zIndex: 3,
          }}
          accessibilityLabel={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? <VolumeX size={16} color="#f5f5f4" /> : <Volume2 size={16} color="#f5f5f4" />}
          <Text style={{ color: '#f5f5f4', fontSize: 11, fontWeight: '600' }}>
            {muted ? 'Muted' : 'Sound'}
          </Text>
        </Pressable>
      ) : null}
    </View>
  )
}
