import i18n from '../src/i18n';

// Test 8: i18n – poprawność tłumaczeń
it('returns correct translations for en and pl', () => {
  i18n.locale = 'en';
  expect(i18n.t('nav.home')).toBe('Home');
  i18n.locale = 'pl';
  expect(i18n.t('nav.home')).toBe('Strona główna');
});
