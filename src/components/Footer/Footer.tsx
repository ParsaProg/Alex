"use client";

import { useLanguage } from "@/src/context/languageContext";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <div className="dark:border-t-neutral-800 border-t-neutral-300 border-t py-5 font-bold text-lg text-center">
      {lang === "en" ? (
        <h1>
          Powered by <strong className="text-blue-500">Parsa-Shaabani</strong>
        </h1>
      ) : (
        <h1>ساخته شده توسط <strong className="text-blue-500">پارسا‌شعبانی</strong></h1>
      )}
     <h3 className="font-thin text-sm mt-1 dark:text-neutral-300 text-neutral-700">
         © {lang === "en"? "All rights reserved": "تمامی حقوق محفوظ است"}
     </h3>
    </div>
  );
}
