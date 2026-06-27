"use client";

import { useState } from "react";
import { Play, Pause, Download, Share2, Monitor, Copy, Check, Volume2, Maximize2 } from "lucide-react";
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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Preview & Export</h1>
          <p className="text-sm text-zinc-400 mt-1">Real Estate Luxury Villa Tour — Ready to export</p>
        </div>
        <Button variant="primary" size="md" icon={<Download className="w-4 h-4" />} onClick={handleExport} loading={exporting}>
          {exported ? "Exported ✓" : "Export All"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Preview */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="glass" padding="none" className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-violet-950/50 via-zinc-900 to-indigo-950/50 relative group">
              {/* Sample Video Embed */}
              {isPlaying ? (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&modestbranding=1"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Thumbnail State */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl mb-4 opacity-40">🏠</div>
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors hover:scale-110 transform duration-200"
                    >
                      <Play className="w-7 h-7 text-white ml-1" />
                    </button>
                    <p className="text-sm text-zinc-500 mt-3">Click to play preview</p>
                  </div>
                </>
              )}

              {/* Caption Preview */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm">
                  <span className="text-white text-sm font-medium">
                    Welcome to this <span className="text-violet-400 font-bold">stunning</span> oceanfront property
                  </span>
                </div>
              </div>

              {/* Controls */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="w-full h-1 rounded-full bg-white/20 mb-3 cursor-pointer">
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsPlaying(false)}>
                        <Pause className="w-4 h-4 text-white" />
                      </button>
                      <Volume2 className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs text-zinc-400">1:24 / 4:32</span>
                    </div>
                    <Maximize2 className="w-4 h-4 text-zinc-400 cursor-pointer" />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Quality Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Viral Score", value: "87%", color: "text-emerald-400" },
              { label: "Retention", value: "73%", color: "text-cyan-400" },
              { label: "Watch Time", value: "3:12", color: "text-amber-400" },
              { label: "SEO Score", value: "92%", color: "text-violet-400" },
            ].map((score) => (
              <Card key={score.label} variant="glass" padding="sm" className="text-center">
                <p className="text-[10px] text-zinc-500 uppercase">{score.label}</p>
                <p className={`text-xl font-bold ${score.color} mt-0.5`}>{score.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Export Sidebar */}
        <div className="space-y-4">
          {/* Platform Selection */}
          <Card variant="glass" padding="md">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-violet-400" />Export for Platform
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPlatform(p.name)}
                  className={`p-2.5 rounded-xl text-left transition-all ${
                    selectedPlatform === p.name
                      ? "bg-violet-500/10 border border-violet-500/30"
                      : "bg-white/5 border border-transparent hover:border-white/10"
                  }`}
                >
                  <span className="text-lg">{p.icon}</span>
                  <p className="text-[10px] font-medium text-white mt-1 truncate">{p.name}</p>
                  <p className="text-[9px] text-zinc-500">{p.ratio}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Quality Selection */}
          <Card variant="glass" padding="md">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-violet-400" />Quality
            </h3>
            <div className="space-y-2">
              {[
                { label: "720p", desc: "HD • Fast export", size: "~45MB" },
                { label: "1080p", desc: "Full HD • Recommended", size: "~120MB" },
                { label: "4K HDR", desc: "Ultra HD • Maximum", size: "~800MB" },
              ].map((q) => (
                <div key={q.label} className="p-2.5 rounded-xl bg-white/5 border border-transparent hover:border-white/10 cursor-pointer flex justify-between items-center">
                  <div>
                    <p className="text-sm text-white font-medium">{q.label}</p>
                    <p className="text-[10px] text-zinc-500">{q.desc}</p>
                  </div>
                  <span className="text-[10px] text-zinc-600">{q.size}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Generated Titles */}
          <Card variant="glass" padding="md">
            <h3 className="text-sm font-medium text-white mb-3">AI Generated Titles</h3>
            <div className="space-y-2">
              {titles.map((title, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-start justify-between gap-2 group hover:border-violet-500/20 transition-colors cursor-pointer"
                  onClick={() => handleCopy(title, i)}
                >
                  <p className="text-xs text-zinc-300 leading-relaxed">{title}</p>
                  <button className="text-zinc-600 group-hover:text-zinc-400 shrink-0">
                    {copiedIndex === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Export Button */}
          <Button
            variant="primary"
            size="xl"
            className="w-full"
            icon={exported ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
            onClick={handleExport}
            loading={exporting}
          >
            {exporting ? "Exporting..." : exported ? "Exported Successfully!" : `Export ${selectedPlatform}`}
          </Button>

          {exported && (
            <p className="text-xs text-emerald-400 text-center">✓ Video exported successfully! Check your downloads.</p>
          )}
        </div>
      </div>
    </div>
  );
}
