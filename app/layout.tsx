import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import CustomCursor from "@/components/custom/cursor/CustomCursor";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "700"] });

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={fredoka.className + " mt-20"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
