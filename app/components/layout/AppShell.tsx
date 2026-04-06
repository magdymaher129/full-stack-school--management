"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Background blobs */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-primary top-[5%] right-[-150px] opacity-[0.07] blur-[100px] pointer-events-none z-0" />
      <div className="fixed w-[350px] h-[350px] rounded-full bg-accent bottom-[5%] left-[-100px] opacity-[0.07] blur-[100px] pointer-events-none z-0" />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity lg:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-[260px] min-h-screen flex flex-col relative z-10">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 page-enter">{children}</main>
      </div>
    </>
  );
}