"use client";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import { useState } from "react";
import MainMenu from "./Menu";

const MenuButton = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="relative">
      <MainMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
      <motion.button
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        className="relative p-0.5 rounded-full"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #6366f1, #ec4899)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner content */}
        <div className="relative dark:bg-[#080808f7] bg-white rounded-full p-3 dark:text-white text-black">
          <Menu size={20} />
        </div>
      </motion.button>
    </div>
  );
};

export default MenuButton;
