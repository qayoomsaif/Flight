module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@all-types': './src/all-types',
          '@all-assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@redux': './src/redux',
          '@theme': './src/theme',
          '@utilities': './src/utilities',
        },
      },
    ],
  ],
};
