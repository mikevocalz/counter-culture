module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
      'nativewind/babel',
    ],
    plugins: [
      'react-native-worklets/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            'solito/image': 'solito/image/expo',
            '@': './',
            '@components': '../../packages/app/components',
            app: '../../packages/app',
          },
          extensions: ['.cjs', '.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  }
}
