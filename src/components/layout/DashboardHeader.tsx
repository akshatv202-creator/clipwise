"use client";

import { Bell, Search, Plus, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const userInitial = session?.user?.name?.[0] || session?.user?.email?.[0] || "U";

  return (
    <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-6 sticky top-0 z-30" style={{ backgroundColor: "#09090b" }}>
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input type="text" placeholder="Search projects, templates..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all" />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/upload"><Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>New Video</Button></Link>
        <button className="relative w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4 text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
        </button>
        <div className="relative group">
          <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <span className="text-sm font-bold text-white uppercase">{userInitial}</span>
          </button>
          <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl glass-strong border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="px-3 py-2 border-b border-white/5">
              <p className="text-sm font-medium text-white truncate">{session?.user?.name}</p>
              <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
