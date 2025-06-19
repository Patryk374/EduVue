import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

// English and Polish translations
const en = {
  nav: { home: 'Home', courses: 'Courses' },
  home: {
    title: 'Learn Programming with EduVue',
    subtitle: 'Master programming through interactive courses',
    startLearning: 'Start Learning'
  },
  courses: {
    title: 'Available Courses',
    search: 'Search courses...',
    enroll: 'Enroll',
    returnToHome: 'Return to Home'
  },
  toggleTheme: 'Toggle Theme',
  menu: {
    dark: 'Dark Theme',
    light: 'Light Theme',
    language: 'Change Language'
  }
};

const pl = {
  nav: { home: 'Strona główna', courses: 'Kursy' },
  home: {
    title: 'Ucz się programowania z EduVue',
    subtitle: 'Opanuj programowanie dzięki interaktywnym kursom',
    startLearning: 'Rozpocznij naukę'
  },
  courses: {
    title: 'Dostępne kursy',
    search: 'Szukaj kursów...',
    enroll: 'Zapisz się',
    returnToHome: 'Powrót do strony głównej'
  },
  toggleTheme: 'Przełącz motyw',
  menu: {
    dark: 'Ciemny motyw',
    light: 'Jasny motyw',
    language: 'Zmień język'
  }
};

const i18n = new I18n({ en, pl });
i18n.enableFallback = true;
i18n.locale = Localization.locale || 'en';

export default i18n;
