const path = require('path')
/**
 * @type {import('next').NextConfig}
 */
const withWebpack = {
  webpack(config) {
    if (!config.resolve) {
      config.resolve = {}
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'shims/codegenNativeComponent.js'),
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
      'react-native-safe-area-context': 'react-native-safe-area-context/src/index.tsx',
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

/**
 * @type {import('next').NextConfig}
 */
const withTurpopack = {
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'shims/codegenNativeComponent.js'),
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
      'react-native-safe-area-context': 'react-native-safe-area-context/src/index.tsx',
    },
    resolveExtensions: [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',

      '.js',
      '.mjs',
      '.tsx',
      '.ts',
      '.jsx',
      '.json',
      '.wasm',
    ],
    root: path.resolve(__dirname, '../..'),
  },
}

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
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
    'react-native-svg',
    'ReactNativeSVG.web.js',
    'react-native-vector-icons',
  ],

  compiler: {
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    },
  },
  reactStrictMode: false, // reanimated doesn't support this on web

  ...withWebpack,
  ...withTurpopack,
}
