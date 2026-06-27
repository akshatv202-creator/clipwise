"use client";

import { Sparkles, ArrowRight, Star, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm text-zinc-300">AI-Powered Video Editing — No Skills Required</span>
          <ArrowRight className="w-3 h-3 text-violet-400" />
        </div>

        <h1 className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6" style={{ animationDelay: "0.1s" }}>
          <span className="text-white">Upload.</span><br />
          <span className="gradient-text">AI Edits.</span><br />
          <span className="text-white">Go Viral.</span>
        </h1>

        <p className="animate-fade-up text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Drop your raw footage. Our AI editor with 15+ years of expertise automatically detects your niche, applies professional edits, and exports ready-to-post content for every platform.
        </p>

        <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" style={{ animationDelay: "0.3s" }}>
          <Link href="/signup"><Button variant="primary" size="xl" icon={<Sparkles className="w-5 h-5" />}>Start Editing Free</Button></Link>
          <Button variant="secondary" size="xl" icon={<Play className="w-5 h-5" />}>Watch Demo</Button>
        </div>

        <div className="animate-fade-up flex flex-col items-center gap-4" style={{ animationDelay: "0.4s" }}>
          <div className="flex -space-x-2">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 border-2 border-black flex items-center justify-center text-[10px] font-bold text-white">{String.fromCharCode(64+i)}</div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">{[1,2,3,4,5].map((i) => (<Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />))}</div>
            <span className="text-sm text-zinc-400">Trusted by <span className="text-white font-semibold">50,000+</span> creators</span>
          </div>
        </div>
      </div>
    </section>
  );
}
