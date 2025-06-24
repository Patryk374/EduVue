global.__fbBatchedBridgeConfig = { remoteModuleConfig: [] };
process.env.EXPO_OS = 'ios';
process.env.SKIP_HOST_COMPONENT_NAMES_DETECTION = '1';
import '@testing-library/jest-native/extend-expect';
// Use the pure implementation to bypass host component detection
const RNTL = require('@testing-library/react-native');
const RNTLPure = require('@testing-library/react-native/pure');
RNTL.render = RNTLPure.render;
if (typeof global.setImmediate !== 'function') {
  global.setImmediate = (fn) => setTimeout(fn, 0);
}

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const NavigationContainer = props =>
    React.createElement(View, props, props.children);
  return { NavigationContainer };
});

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Screen = ({ component: Component, children, ...rest }) => {
    const props = {
      ...rest,
      navigation: { navigate: () => {}, setOptions: () => {} },
      route: { params: {} }
    };
    return React.createElement(
      View,
      rest,
      Component ? React.createElement(Component, props) : children
    );
  };
  const Navigator = props => React.createElement(View, props, props.children);
  return {
    createNativeStackNavigator: jest.fn(() => ({ Navigator, Screen })),
  };
});

jest.mock('react-native-screens', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = props => React.createElement(View, props, props.children);
  return {
    Screen: Mock,
    ScreenContainer: Mock,
    NativeScreen: Mock,
    NativeScreenContainer: Mock,
    enableScreens: jest.fn(),
    screensEnabled: jest.fn().mockReturnValue(false),
  };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaView: props => React.createElement(View, props, props.children),
    SafeAreaProvider: props => React.createElement(View, props, props.children),
    SafeAreaInsetsContext: React.createContext({}),
    SafeAreaFrameContext: React.createContext({}),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 0, height: 0 }),
    initialWindowMetrics: null,
  };
});

jest.mock('expo-localization');
jest.mock('expo-status-bar');
jest.mock('react-native-paper');
