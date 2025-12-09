import { Metadata } from "next";
import { Suspense } from "react";

const title = "About Developer";
const desc =
  "Parsa-Shaabani | Developer and Programmer information of the rahim-saedi's book's website and book's cover";
export const metadata: Metadata = {
  title: title,
  description: desc,
  openGraph: {
    title: title,
    description: desc,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Suspense>{children}</Suspense>;
}
