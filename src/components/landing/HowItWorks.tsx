"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Wand2, Download } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload", description: "Drop your raw footage — any format, any length.", color: "from-violet-500 to-purple-600" },
  { icon: Brain, title: "AI Analyzes", description: "AI detects niche, language, emotions, scenes, and 30+ parameters.", color: "from-purple-500 to-pink-600" },
  { icon: Wand2, title: "Auto Edit", description: "Professional edits, transitions, captions, music, color grading — all automatic.", color: "from-pink-500 to-rose-600" },
  { icon: Download, title: "Export", description: "Download in 4K HDR for any platform. Thumbnails and titles included.", color: "from-rose-500 to-orange-600" },
];

export default function HowItWorks() {
  return (
    <section id="workflow" className="relative py-32 px-6">
      <div className="relative max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">How it works</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Four Steps to Viral Content</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">From raw footage to professionally edited, platform-ready content in minutes.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-violet-500/50 via-pink-500/50 to-orange-500/50" />
          {steps.map((step, index) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }} className="relative text-center">
              <div className="relative inline-flex mb-6">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} p-[1px]`}>
                  <div className="w-full h-full rounded-3xl bg-zinc-950 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
