import { ThemeProvider } from "next-themes";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Header from "@/src/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={` dark:bg-[#080808f7] bg-white`}>
        <ThemeProvider enableSystem defaultTheme="system" attribute="class">
          <ClientLayout>
            <Header />
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
