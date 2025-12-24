import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationFR from './translations/fr.json';
import translationEN from './translations/en.json';

const resources = {
  fr: {
    translation: translationFR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Default language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;