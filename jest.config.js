module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation|@react-native|react-native-safe-area-context|react-native-screens|react-native-linear-gradient)/)',
  ],
  verbose: true,
  moduleNameMapper: {
    'react-native-linear-gradient':
      '<rootDir>/src/__mocks__/react-native-linear-gradient.js',
    './src/navigation/AppNavigator': '<rootDir>/src/__mocks__/AppNavigator.js',
  },
};
