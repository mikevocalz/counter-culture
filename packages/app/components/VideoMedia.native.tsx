import { useCallback, useEffect, useState } from 'react'
import { Pressable, View, Text, type GestureResponderEvent } from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video'
import type { StyleProp, ViewStyle } from 'react-native'
import { Pause, Volume2, VolumeX, Play } from 'lucide-react-native'

type VideoMediaProps = {
  source: string
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
  isActive = true,
  style,
  enableTapToMute = true,
  enablePlayToggle = true,
  onControlPress,
  videoPointerEvents = 'auto',
  showMuteButton = true,
}: VideoMediaProps) {
  const player = useVideoPlayer(source, (playerInstance) => {
    playerInstance.loop = true
  })
  const [muted, setMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (isActive) {
      player.play()
    } else {
      player.pause()
    }
  }, [isActive, player])

  useEffect(() => {
    player.muted = muted
  }, [muted, player])

  const toggleMute = useCallback((event?: GestureResponderEvent) => {
    event?.stopPropagation?.()
    onControlPress?.()
    setMuted((prev) => !prev)
  }, [onControlPress])

  const togglePlayback = useCallback((event?: GestureResponderEvent) => {
    event?.stopPropagation?.()
    onControlPress?.()
    setIsPlaying((prev) => {
      const next = !prev
      if (next) {
        player.play()
      } else {
        player.pause()
      }
      return next
    })
  }, [onControlPress, player])

  return (
    <View style={[{ width: '100%', height: '100%' }, style]}>
      <VideoView
        player={player}
        contentFit="cover"
        pointerEvents={videoPointerEvents}
        style={{ width: '100%', height: '100%' }}
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
