import React from 'react';
import { render } from '@testing-library/react-native';
import CourseDetailScreen from '../src/screens/CourseDetailScreen';
import courses from '../src/mockCourses';
import i18n from '../src/i18n';
import { ThemeProvider } from '../src/ThemeContext';
import { LanguageProvider } from '../src/LanguageContext';
 
// Test 5: CourseDetailScreen – wyświetla dane kursu
it('shows details for given course', () => {
  const course = courses[0];
  const setOptions = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <LanguageProvider>
        <CourseDetailScreen route={{ params: { course } }} navigation={{ setOptions }} />
      </LanguageProvider>
    </ThemeProvider>
  );
  const title = i18n.locale === 'en' ? course.title_en : course.title;
  const desc = i18n.locale === 'en' ? course.description_en : course.description;
  expect(getByText(title)).toBeTruthy();
  expect(getByText(desc)).toBeTruthy();
});
