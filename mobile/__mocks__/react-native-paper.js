const React = require('react');
const { View, Text: RNText, TextInput: RNTextInput, Button: RNButton } = require('react-native');

const MockComponent = ({ children, ...props }) => React.createElement(View, props, children);
const MockText = ({ children, ...props }) => React.createElement(RNText, props, children);
const MockButton = ({ onPress, children, ...props }) => React.createElement(RNButton, { onPress, title: typeof children === 'string' ? children : 'Button', ...props });
const MockTextInput = props => React.createElement(RNTextInput, props);
const Menu = ({ children }) => React.createElement(View, null, children);
Menu.Item = ({ title, onPress }) => React.createElement(RNButton, { onPress, title });

const Provider = ({ children }) => React.createElement(View, null, children);
const Card = ({ children, ...props }) => React.createElement(View, props, children);
Card.Cover = MockComponent;
Card.Title = ({ title, children, ...props }) =>
  React.createElement(View, props, React.createElement(RNText, null, title), children);
Card.Content = ({ children, ...props }) => React.createElement(View, props, children);
Card.Actions = ({ children, ...props }) => React.createElement(View, props, children);

module.exports = {
  MD3DarkTheme: { dark: true, colors: {} },
  MD3LightTheme: { dark: false, colors: {} },
  Provider,
  Card,
  Text: MockText,
  Button: MockButton,
  IconButton: MockButton,
  TextInput: MockTextInput,
  Menu,
};
