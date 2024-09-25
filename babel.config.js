module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    "nativewind/babel",
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv']
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
