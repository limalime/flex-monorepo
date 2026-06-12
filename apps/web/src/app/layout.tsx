import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme";
import { WalletProvider } from "@/providers/wagmi";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Flex",
  description: "Flexible AI Prediction Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={dmSans.variable}>
        <ThemeProvider>
          <WalletProvider>
             {children}
            <Toaster
            richColors
            position="top-center"
            closeButton />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}