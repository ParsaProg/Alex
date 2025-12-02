import { ThemeProvider } from "next-themes";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`en-font dark:bg-[#080808f7] bg-white`}>
        <ThemeProvider enableSystem defaultTheme="system" attribute="class">
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
