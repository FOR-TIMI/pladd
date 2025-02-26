import { ReactNode, useEffect, useState } from "react";

import i18n from "@/i18n/config";
import { useTranslation } from "react-i18next";
import { AppContext } from "./hooks/context";
import { AppContextType, Language, Theme } from "./types";

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

  useEffect(() => {
    document.body.className = `${theme}-mode`;
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
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
