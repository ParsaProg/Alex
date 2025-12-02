"use client"

import { useTheme } from "next-themes"

export default function Home(){
  const {theme, setTheme} = useTheme();
  return <div className="w-full">
    <button onClick={() => {
      theme === "light" ? setTheme("dark"): setTheme("light")
    }} className="rounded-lg m-3 p-3 font-bold dark:text-white text-black dark:border-slate-700 border-slate-400 border">Change Theme</button>
  </div>
}