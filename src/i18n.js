import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import LocalStorageBackend from 'i18next-localstorage-backend';

// Import your translation files
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

// Define your resources object
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(LocalStorageBackend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('userLanguage') || 'es', // Use stored language or default to 'es'
    resources,
    fallbackLng: 'en', // Default language
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    interpolation: {
      escapeValue: false // React already protects from XSS
    }
  });

export default i18n;
