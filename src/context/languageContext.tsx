"use client";

import { createContext, useContext, useEffect, useState } from "react";
type lang = "en" | "fa";

interface LanguageContext {
  lang: lang;
  setLang: (lang: lang) => void;
}

const languageContext = createContext<LanguageContext | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLang?: lang;
}

export const LanguageProvider = ({
  children,
  defaultLang = "en",
}: LanguageProviderProps) => {
  const [lang, setLangState] = useState<lang>(defaultLang);

  const switchFontClass = (newLang: lang) => {
    if (newLang === "en") {
      document.body.classList.remove("fa-font");
      document.body.classList.add("en-font");
    } else {
      document.body.classList.remove("en-font");
      document.body.classList.add("fa-font");
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as lang;
    if (savedLang === "fa" || savedLang === "en") {
      setLangState(savedLang);
    }
  }, []);
  const setLang = (newLang: lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);

    // Update HTML attribute
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "en" ? "ltr" : "rtl";
    switchFontClass(newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    switchFontClass(lang);
  }, [lang]);

  return (
    <languageContext.Provider value={{ lang, setLang }}>
      {children}
    </languageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(languageContext);

  if (!context) throw new Error("The main context does not exist");

  return context;
};
