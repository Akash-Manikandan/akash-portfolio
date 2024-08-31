import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster"
// import CustomCursor from "@/components/custom/cursor/CustomCursor";

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
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={fredoka.className + " mt-20"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {/* <CustomCursor /> */}
          {children}
          <p className="text-center pt-3 mb-2">Akash M © {currentYear}</p>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
