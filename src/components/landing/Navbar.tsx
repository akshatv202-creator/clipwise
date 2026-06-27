"use client";

import { Zap, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ClipWise</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 border border-violet-500/30">AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
          <a href="#workflow" className="text-sm text-zinc-400 hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"><Button variant="ghost" size="md">Sign In</Button></Link>
          <Link href="/signup"><Button variant="primary" size="md">Get Started Free</Button></Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/5 px-6 py-4 space-y-4">
          <a href="#features" className="block text-zinc-300 hover:text-white">Features</a>
          <a href="#pricing" className="block text-zinc-300 hover:text-white">Pricing</a>
          <div className="flex gap-3 pt-4">
            <Link href="/login"><Button variant="secondary" size="md">Sign In</Button></Link>
            <Link href="/signup"><Button variant="primary" size="md">Get Started</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
}
