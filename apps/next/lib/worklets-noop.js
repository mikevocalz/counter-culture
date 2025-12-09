// No-op module for react-native-worklets on server-side builds
// This prevents worklet errors during SSR

export const createWorklet = (fn) => fn
export const runOnJS = (fn) => fn
export const runOnUI = (fn) => fn
export const useWorklet = () => ({})
export const useRunOnJS = (fn) => fn
export const useSharedValue = (init) => ({ value: init })

export default {
  createWorklet,
  runOnJS,
  runOnUI,
  useWorklet,
  useRunOnJS,
  useSharedValue,
}
