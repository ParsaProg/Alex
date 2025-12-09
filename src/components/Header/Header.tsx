"use client";

import { useLanguage } from "@/src/context/languageContext";
import { Languages, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mount, setMount] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setMount(true);
  }, []);
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
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, top: -200 },
          visible: { opacity: 1, top: 0 },
        }}
        transition={{ delay: 0.3 }}
        className="dark:bg-[#08080845] bg-[#ffffffa9] z-9999 backdrop-blur-sm flex fixed top-0 w-full py-5 border-b dark:border-b-neutral-900 border-b-slate-300 "
      >
        <div className="sm:w-[80%] w-[90%] h-full mx-auto flex items-center justify-between">
          <Link href={"/"}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -200 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ delay: 0.6 }}
              className="flex items-start flex-col"
            >
              <h1 className="sm:text-2xl text-transparent bg-clip-text bg-linear-to-l font-bold dark:from-white from-black dark:to-blue-600 to-blue-600 text-xl">
                {lang === "en" ? "Rahim Saedi's Book" : "کتاب رحیم ساعدی"}
              </h1>
              <h5 className="sm:text-md text-sm dark:text-slate-300 font-thin text-slate-600">
                {lang === "en"
                  ? "How to speak english fluently"
                  : "چطور انگلیسی را روان، صحبت کنیم"}
              </h5>
            </motion.div>
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: 200 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-x-2"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={themeToggle}
              className="p-2.5 rounded-xl dark:text-white text-black border dark:border-neutral-800 border-neutral-300"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, rotate: 45 },
                      visible: { opacity: 1, rotate: 0 },
                    }}
                    key={"sun"}
                  >
                    <Sun size={18} />
                  </motion.div>
                )}
                {theme === "light" && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, rotate: 45 },
                      visible: { opacity: 1, rotate: 0 },
                    }}
                    key={"moon"}
                  >
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
              <Languages size={18} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
