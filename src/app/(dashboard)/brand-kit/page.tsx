"use client";

import { Palette, Type, Image, Plus, Upload } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BrandKitPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-white">Brand Kit</h1><p className="text-sm text-zinc-400 mt-1">Define your brand identity</p></div><Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>New Brand</Button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glass" padding="lg">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"><Palette className="w-5 h-5 text-violet-400" /></div><div><h3 className="text-white font-medium">Brand Colors</h3><p className="text-xs text-zinc-500">Used for captions and accents</p></div></div>
          <div className="grid grid-cols-5 gap-3">
            {["#8B5CF6","#06B6D4","#FFFFFF","#000000","#F59E0B"].map((c) => (<div key={c} className="text-center"><div className="w-full aspect-square rounded-xl border border-white/10" style={{ backgroundColor: c }} /><span className="text-[10px] text-zinc-500 mt-1 block">{c}</span></div>))}
          </div>
        </Card>
        <Card variant="glass" padding="lg">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center"><Type className="w-5 h-5 text-cyan-400" /></div><div><h3 className="text-white font-medium">Typography</h3><p className="text-xs text-zinc-500">Fonts for titles and captions</p></div></div>
          <div className="space-y-3"><div className="p-3 rounded-xl bg-white/5 border border-white/5"><p className="text-xs text-zinc-500">Heading</p><p className="text-lg font-bold text-white mt-1">SF Pro Display Bold</p></div><div className="p-3 rounded-xl bg-white/5 border border-white/5"><p className="text-xs text-zinc-500">Caption</p><p className="text-base font-semibold text-white mt-1">Inter Semi-Bold</p></div></div>
        </Card>
        <Card variant="glass" padding="lg">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Image className="w-5 h-5 text-amber-400" /></div><div><h3 className="text-white font-medium">Logo & Watermark</h3><p className="text-xs text-zinc-500">Auto-added to videos</p></div></div>
          <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center hover:border-violet-500/30 transition-colors cursor-pointer"><Upload className="w-8 h-8 text-zinc-600 mx-auto mb-2" /><p className="text-sm text-zinc-400">Upload logo</p><p className="text-xs text-zinc-600">PNG or SVG</p></div>
        </Card>
        <Card variant="glass" padding="lg">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Image className="w-5 h-5 text-emerald-400" /></div><div><h3 className="text-white font-medium">Intro & Outro</h3><p className="text-xs text-zinc-500">Custom for your videos</p></div></div>
          <div className="grid grid-cols-2 gap-3"><div className="border-2 border-dashed border-zinc-800 rounded-xl p-6 text-center hover:border-violet-500/30 transition-colors cursor-pointer"><p className="text-xs text-zinc-400">Upload Intro</p></div><div className="border-2 border-dashed border-zinc-800 rounded-xl p-6 text-center hover:border-violet-500/30 transition-colors cursor-pointer"><p className="text-xs text-zinc-400">Upload Outro</p></div></div>
        </Card>
      </div>
    </div>
  );
}
