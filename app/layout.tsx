import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
// import CustomCursor from "@/components/custom/cursor/CustomCursor";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Akash M — Full-Stack Developer Portfolio",
  description:
    "Explore Akash M's full-stack developer portfolio with selected projects, case studies, and experience. Built with Next.js, TypeScript, and Prisma. Open to collaboration and roles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={fredoka.className + " mt-20 transition-colors duration-500"}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {/* <CustomCursor /> */}
          {children}
          <p className="text-center pt-3 mb-2">Akash M © {currentYear}</p>
          <Toaster />
        </ThemeProvider>
        <Analytics />

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
