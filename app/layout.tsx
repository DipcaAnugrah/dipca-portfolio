import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dipca Anugrah — Digital Problem Solver",
  description:
    "Portfolio of Dipca Anugrah, a digital problem solver building websites, systems, automations, and AI-assisted solutions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={manrope.variable} suppressHydrationWarning>{children}</body>
    </html>
  );
}
