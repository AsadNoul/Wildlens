module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation|@react-native|react-native-safe-area-context|react-native-screens|react-native-linear-gradient)/)',
  ],
  verbose: true,
};
