import React from 'react';
import { render } from '@testing-library/react-native';
import i18n from '../src/i18n';
import courses from '../src/mockCourses';
import CoursesScreen from '../src/screens/CoursesScreen';
import { ThemeProvider } from '../src/ThemeContext';
import { LanguageProvider } from '../src/LanguageContext';
 
// Test 3: CoursesScreen – ładowanie i renderowanie listy kursów
it('displays list of courses with titles', () => {
  const setOptions = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <LanguageProvider>
        <CoursesScreen navigation={{ navigate: jest.fn(), setOptions }} />
      </LanguageProvider>
    </ThemeProvider>
  );
  courses.forEach(course => {
    const title = i18n.locale === 'en' ? course.title_en : course.title;
    expect(getByText(title)).toBeTruthy();
  });
});
 
