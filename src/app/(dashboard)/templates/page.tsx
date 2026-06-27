"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const templates = [
  { title: "Luxury Real Estate Tour", niche: "Real Estate", uses: "2.4K" },
  { title: "Fitness Transformation", niche: "Fitness", uses: "5.1K" },
  { title: "Product Unboxing", niche: "Tech", uses: "8.7K" },
  { title: "Food Recipe Reel", niche: "Food", uses: "3.2K" },
  { title: "Travel Vlog Cinematic", niche: "Travel", uses: "6.8K" },
  { title: "Podcast Highlights", niche: "Podcast", uses: "4.5K" },
  { title: "Fashion Lookbook", niche: "Fashion", uses: "3.9K" },
  { title: "Business Tips", niche: "Business", uses: "2.1K" },
  { title: "Gaming Montage", niche: "Gaming", uses: "7.3K" },
  { title: "Wedding Highlights", niche: "Wedding", uses: "1.8K" },
  { title: "Car Review", niche: "Cars", uses: "4.2K" },
  { title: "Motivational Speech", niche: "Motivation", uses: "9.1K" },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Templates</h1><p className="text-sm text-zinc-400 mt-1">Pre-built editing styles for every niche</p></div>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" /><input type="text" placeholder="Search templates..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map((t, i) => (
          <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}>
            <Card variant="glass" hover padding="none" className="overflow-hidden group">
              <div className="aspect-[9/16] max-h-48 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"><Button variant="primary" size="sm" icon={<Sparkles className="w-3 h-3" />}>Use</Button></div>
              </div>
              <div className="p-3"><h3 className="text-sm font-medium text-white truncate">{t.title}</h3><div className="flex items-center justify-between mt-2"><Badge size="sm" variant="purple">{t.niche}</Badge><span className="text-[10px] text-zinc-500">{t.uses} uses</span></div></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
