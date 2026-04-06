"use client";

import { usePathname } from "next/navigation";
import { SearchBar } from "../ui/SearchBar";

const TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/students": "Students",
  "/teachers": "Teachers",
  "/classes": "Classes",
  "/fees": "Fee Structure",
  "/student-fees": "Student Fees",
};

export function Header({ onMenuClick, searchValue, onSearchChange }: {
  onMenuClick: () => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
}) {
  const pathname = usePathname();
  const title = TITLES[pathname] || "Dashboard";
  const showSearch = pathname !== "/";

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[#F5F4EF]/80 border-b border-[#E5E5E0] px-6 py-4 flex items-center gap-4">
      <button
        className="lg:hidden w-8 h-8 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-800"
        onClick={onMenuClick}
      >
        <i className="fas fa-bars text-lg" />
      </button>
      <h1 className="font-dm-serif text-xl text-[#1A1A1A]">{title}</h1>
      <div className="flex-1" />
      {showSearch && (
        <SearchBar value={searchValue ?? ""} onChange={onSearchChange ?? (() => {})} />
      )}
    </header>
  );
}