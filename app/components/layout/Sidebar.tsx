"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", icon: "fa-th-large", label: "Dashboard" },
  { href: "/students", icon: "fa-graduation-cap", label: "Students" },
  { href: "/teachers", icon: "fa-chalkboard-teacher", label: "Teachers" },
  { href: "/classes", icon: "fa-school", label: "Classes" },
  { href: "/fees", icon: "fa-file-invoice-dollar", label: "Fee Structure" },
  { href: "/student-fees", icon: "fa-link", label: "Student Fees" },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 w-[260px] bg-[#111] z-40 overflow-y-auto transition-transform duration-300 flex flex-col ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <i className="fas fa-graduation-cap text-white text-sm" />
          </div>
          <div>
            <div className="text-white font-bold text-base tracking-tight">EduVault</div>
            <div className="text-gray-500 text-[10px] font-medium tracking-widest uppercase">Management</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        <div className="px-5 mb-2 text-[10px] font-semibold tracking-widest uppercase text-gray-600">
          Main Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm font-medium border-l-[3px] transition-all duration-200 ${
                active
                  ? "bg-primary/10 border-primary text-primary-light"
                  : "border-transparent text-gray-500 hover:bg-white/[0.04] hover:border-primary/30 hover:text-gray-300"
              }`}
            >
              <i className={`fas ${item.icon} w-5 text-center text-[15px]`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">Admin User</div>
            <div className="text-gray-500 text-xs truncate">admin@school.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}