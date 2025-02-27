import { ReactNode, useEffect, useState } from "react";

import i18n from "@/i18n/config";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context";
import { AppContextType, Language, Theme } from "../app/types";
import useGlobalCursor from "@/hooks/useGlobalCursor";

type AppProviderProps = {
  children: ReactNode;
};

const defaulteLanguage: Language = "en";
const defaultTheme: Theme = "light";

export const AppProvider = ({ children }: AppProviderProps) => {
  const [language, setLanguageState] = useState<Language>(
    (localStorage.getItem("language") as Language) || defaulteLanguage
  );

  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || defaultTheme
  );

  const { t } = useTranslation();
    // Initialize global cursor effect
    useGlobalCursor({
      spotlightSize: '350px',
      spotlightColor: theme === 'dark' 
        ? 'rgba(99, 102, 241, 0.08)' 
        : 'rgba(99, 102, 241, 0.07)',
      enabled: true,
      enableOnTouch: false,
    });

  useEffect(() => {
    document.body.className = `${theme}-mode`;


    if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.remove('light', 'light-mode');
      document.documentElement.classList.add('dark', 'dark-mode');
    } else {
      document.documentElement.classList.remove('dark', 'dark-mode');
      document.documentElement.classList.add('light', 'light-mode');
    }
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang
    localStorage.setItem("language", lang);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fr" : "en";
    setLanguage(newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const contextValue: AppContextType = {
    language,
    setLanguage,
    toggleLanguage,
    theme,
    toggleTheme,
    t,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
