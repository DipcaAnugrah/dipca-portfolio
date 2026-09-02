import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dipca Anugrah — Digital Problem Solver",
  description:
    "Portfolio of Dipca Anugrah, a digital problem solver building websites, systems, automations, and AI-assisted solutions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
