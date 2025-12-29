const path = require('path')
const join = path.join

const aliasPathJoin = (moduleFolders) =>
  join(process.cwd(), '..', '..', 'node_modules', join(...moduleFolders))

const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

// 1. Enable CSS for Expo.
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
})

// This is for monorepo setup
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')
config.watchFolders = [workspaceRoot]
config.resolver.disableHierarchicalLookup = true
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_conditionNames = [
  'require',
  'default',
  'browser',
  'react-native',
]

// Update the config with additional settings
const updateConfig = async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname)

  // Set transformer options
  config.transformer = {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    minifierPath: 'metro-minify-terser',
    minifierConfig: {},
    allowOptionalDependencies: true,
    unstable_allowRequireContext: true,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  }

  // Set resolver options
  const normalizeBlockList = (blockList) => {
    if (!blockList) {
      return []
    }
    const list = Array.isArray(blockList) ? blockList : [blockList]
    const flattened = []
    for (const item of list) {
      if (Array.isArray(item)) {
        flattened.push(...item)
      } else {
        flattened.push(item)
      }
    }
    return flattened
  }
  const blockListPatterns = normalizeBlockList(config.resolver.blockList)
  config.resolver = {
    ...config.resolver,
    alias: {
      'react-native$': 'react-native-web',
      './ReactNativeSVG': aliasPathJoin([
        'react-native-svg',
        'lib',
        'module',
        'ReactNativeSVG.web.js',
      ]),
    },
    blockList: [
      ...blockListPatterns,
      /node_modules[\\/]react-responsive-carousel[\\/].*/,
    ],
    assetExts: [
      ...assetExts.filter((ext) => ext !== 'svg'),
      'obj',
      'mtl',
      'jpg',
      'vrx',
      'hdr',
      'png',
      'jpeg',
      'gltf',
      'glb',
      'bin',
      'arobject',
      'gif',
      'svg',
      'pdf',
      'ttf',
      'webp',
      'riv'
    ],
    sourceExts: [...sourceExts, 'ts', 'tsx', 'js', 'jsx', 'json', 'cjs', 'svg'],
  }

  return config
}

// Export the final config with NativeWind
module.exports = (async () => {
  const updatedConfig = await updateConfig()
  return withNativeWind(updatedConfig, {
    input: './global.css',
    projectRoot,
    inlineRem: false,
  })
})()
