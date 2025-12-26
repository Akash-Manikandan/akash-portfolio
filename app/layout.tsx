import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
// import CustomCursor from "@/components/custom/cursor/CustomCursor";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "700"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://akash-m.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Akash M — Full-Stack Developer Portfolio",
  description:
    "Explore Akash M's full-stack developer portfolio with selected projects, case studies, and experience. Built with Next.js, TypeScript, and Prisma. Open to collaboration and roles.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Akash M Portfolio",
    title: "Akash M — Full-Stack Developer Portfolio",
    description:
      "Explore Akash M's full-stack developer portfolio with selected projects, case studies, and experience. Built with Next.js, TypeScript, and Prisma. Open to collaboration and roles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash M — Full-Stack Developer Portfolio",
    description:
      "Explore Akash M's full-stack developer portfolio with selected projects, case studies, and experience. Built with Next.js, TypeScript, and Prisma. Open to collaboration and roles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Footer />
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
