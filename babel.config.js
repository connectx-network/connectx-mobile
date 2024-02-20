module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@base': './src/base',
          '@redux': './src/redux',
          '@services': './src/services',
          '@types': './src/types',
          '@languages': './src/languages',
          '@navigation': './src/navigation',
          '@model': './src/model',
          '@hooks': './src/hooks',
          '@twd/react-query': './src/react-query',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
