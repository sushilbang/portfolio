import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sushil's Portfolio",
  description: "I enjoy building things that live on the internet. Currently focused on contributing to open source and crafting side projects that solve real problems.",
  openGraph: {
    title: "Sushil Bang - Engineer",
    description: "21-year-old engineer building products that matter.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushil Bang - Engineer",
    description: "21-year-old engineer building products that matter.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Full height border container */}
          <div className="relative min-h-screen">
            {/* Left border line */}
            <div className="fixed left-0 top-0 bottom-0 w-px bg-border md:left-[calc(50%-384px)] lg:left-[calc(50%-448px)]" />
            {/* Right border line */}
            <div className="fixed right-0 top-0 bottom-0 w-px bg-border md:right-[calc(50%-384px)] lg:right-[calc(50%-448px)]" />

            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
