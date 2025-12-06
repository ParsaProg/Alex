import { ThemeProvider } from "next-themes";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import type { Metadata, Viewport } from "next";
import TopScrollButton from "@/src/components/ui/TopScrollButton";

export const metadata: Metadata = {
  // Fixed typo here
  icons: {
    icon: "/favicon.ico",
  },
  title: "Rahim Saedi's Book",
  description: "Rahim Saedi's book modern webapp",
  openGraph: {
    title: "Rahim Saedi's Book",
    description: "Rahim Saedi's book modern webapp",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={` dark:bg-[#080808f7] bg-white mx-auto`}>
        <ThemeProvider
          disableTransitionOnChange
          defaultTheme="dark"
          attribute="class"
        >
          <ClientLayout>
            <Header />
            <div className="mt-[130px]"></div>
            {children} <div className="mt-[50px]"></div>
            <Footer />
            <TopScrollButton />
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
