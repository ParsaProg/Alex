import { Metadata } from "next";

const title = "Collector Information";
const desc = "Rahim-Saedi (Main Collector of the book) information";
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
  return <>{children}</>;
}
