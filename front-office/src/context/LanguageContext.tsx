import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('agrohelp-language');
    return (savedLanguage as Language) || 'fr';
  });

  useEffect(() => {
    const changeLanguage = async () => {
      await i18n.changeLanguage(language);
      localStorage.setItem('agrohelp-language', language);
      document.documentElement.lang = language;
    };
    
    changeLanguage();
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};