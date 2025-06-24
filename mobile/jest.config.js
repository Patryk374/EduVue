module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFiles: [require.resolve('react-native/jest/setup')],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|expo-|@expo|@unimodules|react-native|react-native-|sentry-expo)/'
  ]
};
