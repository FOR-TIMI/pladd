import { TFunction } from "i18next";

export type Language = "en" | "fr";
export type Theme = "light" | "dark";

export type AppContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;
  t: TFunction<"translation", undefined>;
};
