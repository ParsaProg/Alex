"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/src/context/languageContext";

export default function TopScrollButton() {
  const { lang } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [showButton, setShowButton] = useState<boolean | undefined>(false);

  useEffect(() => {
    const checkScrollButton = () => {
      if (window.scrollY >= 100) setShowButton(true);
      else setShowButton(false);
    };
    checkScrollButton();
    window.addEventListener("scroll", checkScrollButton);

    return () => window.removeEventListener("scroll", checkScrollButton);
  }, []);
  return (
    <AnimatePresence>
      {showButton ? (
        <motion.div
          onClick={scrollToTop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          key="scroll-to-top"
          whileTap={{ scale: 0.91 }}
          className={`z-500 fixed bottom-8 ${
            lang === "en" ? "sm:left-10 left-5" : "sm:right-10 right-5"
          } bg-blue-600 rounded-full text-white p-3`}
        >
          <ArrowUp size={20} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
