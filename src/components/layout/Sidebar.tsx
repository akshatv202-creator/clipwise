"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Upload, FolderOpen, Palette, BarChart3, Settings, Crown, HelpCircle, LogOut, Clock, Film } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/projects" },
  { icon: Upload, label: "New Upload", href: "/upload" },
  { icon: FolderOpen, label: "Projects", href: "/projects" },
  { icon: Clock, label: "Processing", href: "/processing" },
  { icon: Film, label: "Templates", href: "/templates" },
  { icon: Palette, label: "Brand Kit", href: "/brand-kit" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-zinc-800/50 flex flex-col z-40" style={{ backgroundColor: "#09090b" }}>
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
        <Link href="/projects" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
          <span className="text-lg font-bold text-white">ClipWise</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href}>
              <motion.div whileHover={{ x: 2 }} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200", isActive ? "bg-violet-500/10 text-violet-300 border border-violet-500/20" : "text-zinc-400 hover:text-white hover:bg-white/5")}>
                <item.icon className={cn("w-4 h-4", isActive && "text-violet-400")} />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-zinc-800/50 space-y-1">
        <div className="mb-3 p-3 rounded-xl bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-violet-500/20">
          <div className="flex items-center gap-2 mb-2"><Crown className="w-4 h-4 text-violet-400" /><span className="text-xs font-semibold text-white">Upgrade to Pro</span></div>
          <p className="text-[10px] text-zinc-400 mb-2">Unlock 4K exports, unlimited videos & more</p>
          <Link href="/settings"><button className="w-full py-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-xs font-medium text-violet-300 transition-colors">View Plans</button></Link>
        </div>
        <Link href="/settings"><div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Settings className="w-4 h-4" /><span>Settings</span></div></Link>
        <Link href="/projects"><div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><HelpCircle className="w-4 h-4" /><span>Help</span></div></Link>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"><LogOut className="w-4 h-4" /><span>Sign Out</span></button>
      </div>
    </aside>
  );
}
