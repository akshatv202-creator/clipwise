"use client";

import { motion } from "framer-motion";
import { Brain, Scissors, Palette, Type, Image, Share2, Wand2, Zap, Music, Camera, Layers, Globe } from "lucide-react";
import Card from "@/components/ui/Card";

const features = [
  { icon: Brain, title: "AI Video Analysis", description: "Detects language, speakers, emotions, objects, faces, camera movement, and 30+ parameters instantly.", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Scissors, title: "Smart Auto-Edit", description: "Removes dead silence, mistakes, filler words, shaky footage, and duplicates automatically.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: Palette, title: "Cinematic Color Grading", description: "Professional LUTs, color correction, and grading applied based on your detected niche.", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: Type, title: "AI Caption Engine", description: "50+ languages, 10+ caption styles including Hormozi, MrBeast, and luxury aesthetics.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Image, title: "Thumbnail Generator", description: "AI creates 10 CTR-optimized thumbnails with face enhancement and background replacement.", color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Share2, title: "Multi-Platform Export", description: "One-click export for Instagram, TikTok, YouTube Shorts, LinkedIn, X, and 8+ platforms.", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Wand2, title: "Niche Detection", description: "AI identifies your content niche from 30+ categories and applies the perfect editing style.", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: Music, title: "Beat Sync & SFX", description: "Background music matched to your content with beat-synchronized transitions and sound effects.", color: "text-rose-400", bg: "bg-rose-500/10" },
  { icon: Camera, title: "AI Camera Effects", description: "Zoom effects, speed ramps, motion blur, slow-mo, and cinematic camera movements.", color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: Layers, title: "Auto B-Roll", description: "AI suggests and inserts relevant B-roll footage, stock videos, and background replacements.", color: "text-teal-400", bg: "bg-teal-500/10" },
  { icon: Zap, title: "Quality Control", description: "AI checks resolution, audio, subtitle sync, copyright, virality score, and retention prediction.", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { icon: Globe, title: "AI Translation & Dubbing", description: "Translate and dub your video to any language with AI voice cloning and lip sync.", color: "text-indigo-400", bg: "bg-indigo-500/10" },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Everything Your Video Needs</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Professional-grade editing powered by AI. No timeline. No complexity. Just results.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
              <Card variant="glass" hover padding="lg" className="h-full">
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
