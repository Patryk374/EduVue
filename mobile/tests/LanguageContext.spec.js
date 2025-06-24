import React from 'react';
import { Text, Button } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { LanguageProvider, useLanguage } from '../src/LanguageContext';
import i18n from '../src/i18n';
 
function TestLang() {
  const { language, changeLanguage } = useLanguage();
  return (
    <>
      <Text testID="greeting">{i18n.t('nav.home')}</Text>
      <Button title="switch" onPress={() => changeLanguage(language.startsWith('en') ? 'pl' : 'en')} />
    </>
  );
}
 
 // Test 7: LanguageContext – zmiana języka interfejsu
it('updates text after changing language', () => {
  i18n.locale = 'en';
  const { getByTestId, getByText } = render(
    <LanguageProvider>
      <TestLang />
    </LanguageProvider>
  );
  expect(getByTestId('greeting').props.children).toBe('Home');
  fireEvent.press(getByText('switch'));
  expect(getByTestId('greeting').props.children).toBe('Strona główna');
});
