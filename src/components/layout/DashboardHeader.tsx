"use client";

import { Bell, Search, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="h-16 border-b border-white/5 glass-strong flex items-center justify-between px-6 sticky top-0 z-30">
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
        <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center"><span className="text-sm font-bold text-white">J</span></button>
      </div>
    </header>
  );
}
