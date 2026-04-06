import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/app/components/context/ToastContext";
import { AppShell } from "@/app/components/layout/AppShell";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });

export const metadata: Metadata = {
  title: "EduVault — School Management Dashboard",
  description: "Complete school management system built with Next.js and Prisma",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSerif.variable}`}>
      <body className="font-outfit antialiased">
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}