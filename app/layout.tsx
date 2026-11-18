import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { preferencesBootScript } from "@/lib/use-portfolio-preferences";
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
    // The boot script sets lang/data-theme before hydration, so the attributes can differ from the server HTML.
    <html lang="id" data-theme="normal" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesBootScript }} />
      </head>
      <body className={manrope.variable} suppressHydrationWarning>{children}</body>
    </html>
  );
}
