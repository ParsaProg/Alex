import { Metadata } from "next";

const title = "Book Information";
const desc = "Rahim-Saedi's book information | contributors and time-lines";
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
