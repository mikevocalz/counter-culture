// app/splash.tsx
import { useRef, useState, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import Rive, { RiveRef } from 'rive-react-native'
import { Motion } from '@legendapp/motion'

type SplashProps = {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashProps) {
  const riveRef = useRef<RiveRef>(null)
  const [exit, setExit] = useState(false)

 
  const handleStateChange = useCallback((event: any) => {
    const stateName = event?.data?.stateName || event?.stateName || event?.name

    if (
      stateName === 'exit' ||
      stateName === 'done' ||
      stateName === 'complete' ||
      stateName === 'finish'
    ) {
      setExit(true)
    }
  }, [])

  return (
    <Motion.View
      style={styles.container}
      initial={{ opacity: 1, scale: 1 }}
      animate={
        exit ? { opacity: 0, scale: 1.15, y: -60 } : { opacity: 1, scale: 1 }
      }
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 160,
        mass: 0.7,
      }}
      onAnimationComplete={() => {
        if (exit) onFinish()
      }}
    >
      <Rive
        ref={riveRef}
        source={require('../assets/video/deviant_cc.riv')}
        stateMachineName="State Machine 1" // ✅ YOUR EXACT NAME
        autoplay
        onStateChange={handleStateChange}
        style={styles.rive}
      />
    </Motion.View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rive: {
    width: 300,
    height: 300,
  },
})
