import { useCallback, useEffect, useState, useRef } from 'react'
import { Pressable, View, Text, type GestureResponderEvent } from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video'
import type { StyleProp, ViewStyle } from 'react-native'
import { Pause, Volume2, VolumeX, Play } from 'lucide-react-native'
import { Motion } from '@legendapp/motion'
import { useVideoStore } from 'app/store'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { useSharedValue, runOnJS } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

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
  const player = useVideoPlayer(source, (playerInstance) => {
    playerInstance.loop = true
    playerInstance.timeUpdateEventInterval = 0.25
  })
  const [isPlaying, setIsPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const positionSaveIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const seekBarWidth = useSharedValue(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const { setPosition, getPosition, muted, toggleMuted, activePostId } = useVideoStore()

  const playSafe = useCallback(() => {
    try {
      player.play()
      setIsPlaying(true)
    } catch (error) {
      console.log('Error playing video:', error)
    }
  }, [player])

  const pauseSafe = useCallback(() => {
    try {
      player.pause()
      setIsPlaying(false)
    } catch (error) {
      console.log('Error pausing video:', error)
    }
  }, [player])

  const savePosition = useCallback(() => {
    if (!postId) return
    try {
      const currentTime = player.currentTime
      if (currentTime > 0) {
        setPosition(postId, currentTime)
      }
    } catch (error) {
      // Player may be destroyed
    }
  }, [player, postId, setPosition])

  const updatePlayerTime = useCallback((seekTime: number) => {
    player.currentTime = seekTime
    setProgress(seekTime)
  }, [player])

  const handleSeek = useCallback((x: number) => {
    'worklet'
    const width = seekBarWidth.value
    if (width > 0 && duration > 0) {
      const percentage = Math.max(0, Math.min(1, x / width))
      const seekTime = percentage * duration
      runOnJS(updatePlayerTime)(seekTime)
    }
  }, [duration, seekBarWidth, updatePlayerTime])

  const handleSeekStart = useCallback(() => {
    'worklet'
    runOnJS(setIsSeeking)(true)
  }, [])

  const handleSeekEnd = useCallback(() => {
    'worklet'
    runOnJS(setIsSeeking)(false)
  }, [])

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      handleSeekStart()
      handleSeek(event.x)
    })
    .onUpdate((event) => {
      handleSeek(event.x)
    })
    .onEnd(() => {
      handleSeekEnd()
    })
    .onFinalize(() => {
      handleSeekEnd()
    })

  useEffect(() => {
    if (isActive) {
      playSafe()
    } else {
      savePosition()
      pauseSafe()
    }
  }, [isActive, pauseSafe, playSafe, savePosition])

  useEffect(() => {
    if (!player) return
    const statusSub = player.addListener('statusChange', ({ status }) => {
      if (isActive && status === 'readyToPlay') playSafe()
    })
    const sourceSub = player.addListener('sourceLoad', () => {
      if (isActive) playSafe()
    })
    const playingSub = player.addListener('playingChange', ({ isPlaying: nextPlaying }) => {
      setIsPlaying(nextPlaying)
    })
    if (isActive && player.status === 'readyToPlay') {
      playSafe()
    }

    return () => {
      statusSub.remove()
      sourceSub.remove()
      playingSub.remove()
    }
  }, [isActive, playSafe, player])

  useEffect(() => {
    if (!postId || !activePostId) return
    if (activePostId !== postId) {
      savePosition()
      pauseSafe()
    } else if (isActive) {
      playSafe()
    }
  }, [activePostId, isActive, pauseSafe, playSafe, postId, savePosition])

  useEffect(() => {
    if (postId) {
      const savedPosition = getPosition(postId)
      if (savedPosition && savedPosition > 0) {
        try {
          player.currentTime = savedPosition
        } catch (error) {
          console.log('Error setting video position:', error)
        }
      }
    }
  }, [postId, getPosition, player])

  useEffect(() => {
    if (postId && isActive) {
      positionSaveIntervalRef.current = setInterval(() => {
        savePosition()
      }, 1000)
    }

    return () => {
      if (positionSaveIntervalRef.current) {
        clearInterval(positionSaveIntervalRef.current)
      }
    }
  }, [postId, isActive, savePosition])

  useEffect(() => {
    return () => {
      savePosition()
      try {
        player.pause()
      } catch (error) {
        // Player may already be destroyed
      }
    }
  }, [player, savePosition])

  useEffect(() => {
    player.muted = muted
  }, [muted, player])

  useEffect(() => {
    if (isActive) {
      progressIntervalRef.current = setInterval(() => {
        try {
          setProgress(player.currentTime)
          if (duration === 0 && player.duration > 0) {
            setDuration(player.duration)
          }
        } catch (error) {
          // Player may be destroyed
        }
      }, 100)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isActive, player, duration])

  const toggleMute = useCallback((event?: GestureResponderEvent) => {
    event?.stopPropagation?.()
    onControlPress?.()
    toggleMuted()
  }, [onControlPress, toggleMuted])

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 2000)
  }, [])

  const togglePlayback = useCallback((event?: GestureResponderEvent) => {
    event?.stopPropagation?.()
    onControlPress?.()
    showControlsTemporarily()
    if (isPlaying) {
      savePosition()
      pauseSafe()
    } else {
      playSafe()
    }
  }, [isPlaying, onControlPress, pauseSafe, playSafe, savePosition, showControlsTemporarily])

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  if (!player) {
    return (
      <View style={[{ width: '100%', height: '100%', backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }, style]}>
        <Text style={{ color: '#fff' }}>Loading video...</Text>
      </View>
    )
  }

  return (
    <View style={[{ width: '100%', height: '100%' }, style]}>
      <VideoView
        player={player}
        contentFit="cover"
        style={{ width: '100%', height: '100%' }}
      />
      <Pressable
        onPress={showControlsTemporarily}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
        accessibilityLabel="Show video controls"
      />
      {enablePlayToggle && showControls ? (
        <Motion.View
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'timing', duration: 200 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -28,
            marginTop: -28,
            zIndex: 2,
          }}
        >
          <Pressable
            onPress={togglePlayback}
            style={{
              height: 56,
              width: 56,
              borderRadius: 28,
              backgroundColor: 'rgba(0,0,0,0.45)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause size={24} color="#f5f5f4" />
            ) : (
              <Play size={24} color="#f5f5f4" fill="#f5f5f4" />
            )}
          </Pressable>
        </Motion.View>
      ) : null}
      {showMuteButton ? (
        <Pressable
          onPress={toggleMute}
          style={{
            position: 'absolute',
            right: 12,
            bottom: 22 ,
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
        </Pressable>
      ) : null}
      <GestureDetector gesture={panGesture}>
        <View
          onLayout={(event) => {
            seekBarWidth.value = event.nativeEvent.layout.width
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            justifyContent: 'flex-end',
            paddingBottom: 4,
            zIndex: 2,
          }}
        >
          {isSeeking && (
            <View style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.3)', width: '100%' }}>
              <LinearGradient
                colors={['#3FDCFF', '#FF5BFC', '#8A40CF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 8,
                  width: duration > 0 ? `${(progress / duration) * 100}%` : '0%',
                }}
              />
            </View>
          )}
        </View>
      </GestureDetector>
    </View>
  )
}
