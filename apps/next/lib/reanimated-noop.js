// No-op module for react-native-reanimated on server-side builds
// This prevents worklet errors during SSR

export const useSharedValue = (init) => ({ value: init })
export const useAnimatedStyle = () => ({})
export const useDerivedValue = (fn) => ({ value: fn() })
export const useAnimatedProps = () => ({})
export const withTiming = (value) => value
export const withSpring = (value) => value
export const withDecay = (value) => value
export const withDelay = (_, animation) => animation
export const withSequence = (...animations) => animations[0]
export const withRepeat = (animation) => animation
export const cancelAnimation = () => {}
export const runOnJS = (fn) => fn
export const runOnUI = (fn) => fn
export const interpolate = (value) => value
export const Extrapolate = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' }
export const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' }
export const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  quad: (t) => t,
  cubic: (t) => t,
  poly: () => (t) => t,
  sin: (t) => t,
  circle: (t) => t,
  exp: (t) => t,
  elastic: () => (t) => t,
  back: () => (t) => t,
  bounce: (t) => t,
  bezier: () => (t) => t,
  in: (fn) => fn,
  out: (fn) => fn,
  inOut: (fn) => fn,
}

export default {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedProps,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withSequence,
  withRepeat,
  cancelAnimation,
  runOnJS,
  runOnUI,
  interpolate,
  Extrapolate,
  Extrapolation,
  Easing,
}
