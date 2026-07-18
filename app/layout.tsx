import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "shop",
  description: "shopping app",
};

const vazirFont = localFont({
  src: "../public/fonts/Vazir.woff2",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      dir="rtl"
      lang="fa"
      suppressHydrationWarning
      className={`h-full ${vazirFont.className} overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider 
        attribute='class'
        defaultTheme="light"
        enableSystem
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
