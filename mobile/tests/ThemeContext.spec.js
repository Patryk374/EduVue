import React from 'react';
import { Text, Button, Appearance } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../src/ThemeContext';
 
jest.spyOn(Appearance, 'addChangeListener').mockImplementation(() => ({
  remove: jest.fn(),
}));
 
function TestTheme() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <>
      <Text testID="mode">{isDark ? 'dark' : 'light'}</Text>
      <Button title="toggle" onPress={toggleTheme} />
    </>
  );
}
 
 // Test 6: ThemeContext – przełączenie trybu jasny/ciemny
it('toggles theme from light to dark', () => {
  const { getByTestId, getByText } = render(
    <ThemeProvider>
      <TestTheme />
    </ThemeProvider>
  );
  expect(getByTestId('mode').props.children).toBe('light');
  fireEvent.press(getByText('toggle'));
  expect(getByTestId('mode').props.children).toBe('dark');
});
