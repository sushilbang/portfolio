import type { Metadata } from "next";
import {Inter_Tight, Instrument_Serif} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter_Tight({
  weight: '400',
  style: 'normal',
  subsets: ['latin']
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-instrument-serif'
})

export const metadata: Metadata = {
  title: "Sushil's Portfolio",
  description: "Cloned with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${instrumentSerif.variable}`} suppressHydrationWarning={true}
      >
        <Analytics/>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
