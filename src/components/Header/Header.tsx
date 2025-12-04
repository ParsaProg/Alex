"use client";

import { useLanguage } from "@/src/context/languageContext";
import { Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
    const [mount, setMount] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setMount(true)
    }, [])
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  function themeToggle() {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  }

  const langToggle = () => {
    lang === "en" ? setLang("fa") : setLang("en");
  };


  if (!mount) return null;

  return (
    <div className="flex fixed top-0 w-full py-5 border-b dark:border-b-neutral-900 border-b-slate-300 ">
      <div className="w-[80%] h-full mx-auto flex items-center justify-between">
        <div className="flex items-start flex-col gap-y-2">
          <h1 className="text-transparent bg-clip-text bg-linear-to-l font-bold dark:from-white from-black dark:to-blue-500 to-blue-600 text-2xl">
            {lang === "en" ? "Rahim Saedi's Book" : "کتاب رحیم ساعدی"}
          </h1>
          <h5 className="dark:text-slate-300 font-thin text-slate-600">
            {lang === "en"
              ? "How to speak english fluently"
              : "چطور انگلیسی را روان، صحبت کنیم"}
          </h5>
        </div>
        <div className="flex items-center gap-x-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={themeToggle}
            className="p-2.5 rounded-xl dark:text-white text-black border dark:border-neutral-800 border-neutral-300"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={{
                    "hidden": {opacity: 0, rotate: 45},
                    "visible": {opacity: 1, rotate: 0}
                }} key={"sun"}>
                  <Sun size={18} />
                </motion.div>
              )}
             {theme === "light" && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={{
                    "hidden": {opacity: 0, rotate: 45},
                    "visible": {opacity: 1, rotate: 0}
                }} key={"moon"}>
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={langToggle}
            className="p-2.5 rounded-xl dark:text-white text-black border dark:border-neutral-800 border-neutral-300"
          >
            <Languages size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
