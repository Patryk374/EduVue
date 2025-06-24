import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import i18n from '../src/i18n';
import { ThemeProvider } from '../src/ThemeContext';
import { LanguageProvider } from '../src/LanguageContext';

// Test 2: HomeScreen – renderowanie i nawigacja
it('renders correctly and navigates to Courses', () => {
  const navigate = jest.fn();
  const setOptions = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <LanguageProvider>
        <HomeScreen navigation={{ navigate, setOptions }} />
      </LanguageProvider>
    </ThemeProvider>
  );
  expect(getByText(i18n.t('home.title'))).toBeTruthy();
  fireEvent.press(getByText(i18n.t('home.startLearning')));
  expect(navigate).toHaveBeenCalledWith('Courses');
});
