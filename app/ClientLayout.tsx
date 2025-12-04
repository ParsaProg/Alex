"use client";

import { LanguageProvider } from "@/src/context/languageContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
