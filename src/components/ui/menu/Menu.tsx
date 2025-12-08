"use client";
``;

import { AnimatePresence } from "framer-motion";
import { BookOpenText, Code2, Github, Stars, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/languageContext";
interface MainMenuType {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
}

export default function MainMenu({ showMenu, setShowMenu }: MainMenuType) {
  const { lang } = useLanguage();
  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          className={`absolute ${
            lang == "en" ? "left-0" : "right-0"
          } w-[250px] flex flex-col items-center p-1 rounded-lg dark:bg-[#18181B] bg-white border dark:border-neutral-700 border-neutral-300 bottom-16`}
        >
          <div className="w-full flex items-center justify-between rounded-md p-3 transition-all cursor-pointer hover:dark:bg-neutral-800 hover:dark:border-neutral-600 border border-transparent">
            <div className="flex items-center gap-x-2 dark:text-neutral-200 text-neutral-900">
              <div className="dark:text-[#FFD700] text-[#ff3300]">
                <Code2 size={15} />
              </div>
              <h3
                className="text-sm font-bold"
              >
                {lang === "en" ? "About Developer" : "دربارۀ برنامه‌نویس"}
              </h3>
            </div>
            <OpenIcon />
          </div>
          <div className="w-full flex items-center justify-between rounded-md p-3 transition-all cursor-pointer hover:dark:bg-neutral-800 hover:dark:border-neutral-600 border border-transparent">
            <div className="flex items-center gap-x-2 dark:text-neutral-200 text-neutral-900">
              <div className="dark:text-[#b66ceb] text-[#8b00ee]">
                <Stars size={15} />
              </div>
              <h3
                className="text-sm font-bold"
              >
                {lang === "en" ? "Collector Information" : "گردآورندۀ کتاب"}
              </h3>
            </div>
            <OpenIcon />
          </div>
          <span className="w-full h-[0.5px] bg-neutral-300 dark:bg-neutral-800 my-1.5" />
          <div className="w-full flex items-center justify-between rounded-md p-3 transition-all cursor-pointer hover:dark:bg-neutral-800 hover:dark:border-neutral-600 border border-transparent">
            <div className="flex items-center gap-x-2 dark:text-neutral-200 text-neutral-900">
              <Github size={15} />
              <h3
                className="text-sm"
              >
                {lang === "en" ? "Source Code" : "سورس کد"}
              </h3>
            </div>
            <OpenIcon />
          </div>
          <div className="w-full flex items-center justify-between rounded-md p-3 transition-all cursor-pointer hover:dark:bg-neutral-800 hover:dark:border-neutral-600 border border-transparent">
            <div className="flex items-center gap-x-2 dark:text-neutral-200 text-neutral-900">
              <Users2 size={15} />
              <h3
                className="text-sm"
              >
                {lang === "en" ? "Contributors" : "مشارکت کنندان"}
              </h3>
            </div>
            <OpenIcon />
          </div>
          <span className="w-full h-[0.5px] bg-neutral-300 dark:bg-neutral-800 my-1.5" />
          <div className="w-full flex items-center justify-between rounded-md p-3 transition-all cursor-pointer hover:dark:bg-neutral-800 hover:dark:border-neutral-600 border border-transparent">
            <div className="flex items-center gap-x-2 dark:text-neutral-200 text-neutral-900">
              <BookOpenText size={15} />
              <h3  className="text-sm">{lang === "en"? "Book Information": "اطلاعات کامل کتاب"}</h3>
            </div>
            <OpenIcon />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const OpenIcon = () => {
  return (
    <span>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </span>
  );
};
