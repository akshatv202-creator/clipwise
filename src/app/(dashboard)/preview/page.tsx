"use client";

import { useState } from "react";
import { Play, Pause, Download, Share2, Monitor, Copy } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const platforms = [
  { name: "Instagram Reels", ratio: "9:16", icon: "📱" },
  { name: "YouTube Shorts", ratio: "9:16", icon: "▶️" },
  { name: "TikTok", ratio: "9:16", icon: "🎵" },
  { name: "YouTube", ratio: "16:9", icon: "📺" },
  { name: "LinkedIn", ratio: "1:1", icon: "💼" },
  { name: "X (Twitter)", ratio: "16:9", icon: "𝕏" },
];

const titles = [
  "Luxury Villa Tour: $15M Oceanfront Estate",
  "Inside a $15 Million Dollar Home 🏠",
  "This House Will Blow Your Mind",
  "POV: Your Next Home Costs $15,000,000",
];

export default function PreviewPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram Reels");

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Preview & Export</h1><p className="text-sm text-zinc-400 mt-1">Real Estate Luxury Villa Tour — Ready to export</p></div>
        <Button variant="primary" size="md" icon={<Download className="w-4 h-4" />}>Export All</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card variant="glass" padding="none" className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-950 relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                  {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                </button>
              </div>
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2"><div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm"><span className="text-white text-sm font-medium">Welcome to this <span className="text-violet-400 font-bold">stunning</span> oceanfront property</span></div></div>
            </div>
          </Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{ label: "Viral Score", value: "87%", color: "text-emerald-400" }, { label: "Retention", value: "73%", color: "text-cyan-400" }, { label: "Watch Time", value: "3:12", color: "text-amber-400" }, { label: "SEO Score", value: "92%", color: "text-violet-400" }].map((s) => (
              <Card key={s.label} variant="glass" padding="sm" className="text-center"><p className="text-[10px] text-zinc-500 uppercase">{s.label}</p><p className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</p></Card>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Card variant="glass" padding="md">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2"><Share2 className="w-4 h-4 text-violet-400" />Export for Platform</h3>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((p) => (
                <button key={p.name} onClick={() => setSelectedPlatform(p.name)} className={`p-2 rounded-xl text-left transition-all ${selectedPlatform === p.name ? "bg-violet-500/10 border border-violet-500/30" : "bg-white/5 border border-transparent hover:border-white/10"}`}>
                  <span className="text-sm">{p.icon}</span><p className="text-[10px] font-medium text-white mt-0.5 truncate">{p.name}</p><p className="text-[9px] text-zinc-500">{p.ratio}</p>
                </button>
              ))}
            </div>
          </Card>
          <Card variant="glass" padding="md">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2"><Monitor className="w-4 h-4 text-violet-400" />Quality</h3>
            <div className="space-y-2">
              {["720p", "1080p", "2K", "4K HDR"].map((q) => (
                <button key={q} className="w-full p-2 rounded-xl text-left bg-white/5 border border-transparent hover:border-white/10 text-sm text-white">{q}</button>
              ))}
            </div>
          </Card>
          <Card variant="glass" padding="md">
            <h3 className="text-sm font-medium text-white mb-3">AI Generated Titles</h3>
            <div className="space-y-2">
              {titles.map((title, i) => (
                <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-start justify-between gap-2 group hover:border-violet-500/20 transition-colors">
                  <p className="text-xs text-zinc-300">{title}</p>
                  <button className="text-zinc-600 group-hover:text-zinc-400 shrink-0"><Copy className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          </Card>
          <Button variant="primary" size="xl" className="w-full" icon={<Download className="w-5 h-5" />}>Export {selectedPlatform}</Button>
        </div>
      </div>
    </div>
  );
}
