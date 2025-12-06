import { ThemeProvider } from "next-themes";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={` dark:bg-[#080808f7] bg-white mx-auto`}>
        <ThemeProvider enableSystem defaultTheme="system" attribute="class">
          <ClientLayout>
            <Header />
            <div className="mt-[130px]"></div>
            {children} <div className="mt-[50px]"></div>

            <Footer />
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
