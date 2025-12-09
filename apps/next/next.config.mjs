import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @type {import('next').NextConfig}
 */
const withWebpack = {
  webpack(config, { isServer }) {
    if (!config.resolve) {
      config.resolve = {}
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@payload-config': path.resolve(__dirname, 'payload.config.ts'),
      'react-native': 'react-native-web',
      'react-native$': 'react-native-web',
      'lucide-react-native': 'lucide-react',
      '@rn-primitives/avatar': './shims/avatar.tsx',
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'shims/codegenNativeComponent.js'),
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
      'react-native-safe-area-context': 'react-native-safe-area-context/src/index.tsx',
    }

    // For server builds, alias reanimated to a no-op to prevent worklet errors
    if (isServer) {
      config.resolve.alias['react-native-reanimated'] = path.resolve(__dirname, './lib/reanimated-noop.js')
      config.resolve.alias['react-native-worklets'] = path.resolve(__dirname, './lib/worklets-noop.js')
    }

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(config.resolve?.extensions ?? []),
    ]

    return config
  },
}

// Turbopack configuration removed; using webpack only.

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native$': 'react-native-web',
      'lucide-react-native': 'lucide-react',
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'shims/codegenNativeComponent.js'),
    },
  },
  images: {
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.fitwithpulse.ai',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.github.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
      },
    ],
  },
  transpilePackages: [
    'ReactNativeSVG.web.js',
    'react-native-svg',
    'react-native',
    'react-native-web',
    'react-native-safe-area-context',
    'solito',
    'react-native-reanimated',
    'moti',
    'react-native-gesture-handler',
    'react-native-worklets',
    '@expo/html-elements',
    'clsx',
    'tailwind-merge',
    'nativewind',
    'react-native-css-interop',
    'ReactNativeSVG.web.js',
    'react-native-vector-icons',
    '@legendapp/list',
    '@rn-primitives/avatar',
    'lucide-react-native',
    'payload-better-auth',
    'better-auth',
    'ui',
    'app',
    'design',
    '@expo/vector-icons',
    'expo-image',
    'expo-modules-core',
    'expo-constants',
    '@rn-primitives/slot',
  ],

  serverExternalPackages: ['undici', 'sharp', '@payloadcms/db-postgres', 'pg'],

  compiler: {
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    },
  },
  reactStrictMode: false, // reanimated doesn't support this on web
  ...withWebpack,
}

export default withPayload(nextConfig)
