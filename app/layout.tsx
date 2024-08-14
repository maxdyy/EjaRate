import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

// Components
import { ProgressBarWrapper } from "@/components/ui/ProgressBarWrapper";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/Toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EjaRate",
  description: "Rate your rental experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ProgressBarWrapper>
          <Header />
          <main className="min-h-[calc(100vh-128px)] lg:min-h-[calc(100vh-110px)]">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ProgressBarWrapper>
      </body>
    </html>
  );
}
