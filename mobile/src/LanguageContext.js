import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from './i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(Localization.locale || 'en');

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
