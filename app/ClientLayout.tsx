"use client";

import MenuButton from "@/src/components/ui/menu/MenuButton";
import TopScrollButton from "@/src/components/ui/TopScrollButton";
import { useLanguage } from "@/src/context/languageContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div
        className={`flex items-center justify-between mx-auto left-[50%] translate-x-[-50%] sm:w-[88%] w-[90%] fixed bottom-8`}
      >
        <div className="flex flex-col items-start">
          <MenuButton />
        </div>
        <div className="flex flex-col items-start">
          <TopScrollButton />
        </div>
      </div>
    </>
  );
}
