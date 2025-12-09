import type { Config } from 'tailwindcss'

declare module 'nativewind/preset' {
  const preset: Config
  export default preset
}
