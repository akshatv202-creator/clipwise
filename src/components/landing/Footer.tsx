"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/50 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">ClipWise</span>
          </Link>
          <p className="text-sm text-zinc-600">&copy; 2025 ClipWise. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">YouTube</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
