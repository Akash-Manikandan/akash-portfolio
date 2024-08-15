import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Akash M",
  description: "Portfolio of Akash M",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fredoka.className + ' mt-20'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
