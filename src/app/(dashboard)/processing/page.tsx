"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, Eye, Scissors, Palette, Type, Music, CheckCircle, Loader2, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

const steps = [
  { icon: Eye, label: "Scanning Video", description: "Analyzing frames and metadata", status: "complete" },
  { icon: Brain, label: "Niche Detection", description: "Detected: Real Estate (Luxury)", status: "complete" },
  { icon: Scissors, label: "Smart Editing", description: "Removing silences, filler words", status: "active" },
  { icon: Palette, label: "Color Grading", description: "Applying cinematic luxury LUT", status: "pending" },
  { icon: Type, label: "Caption Generation", description: "Generating animated subtitles", status: "pending" },
  { icon: Music, label: "Audio Enhancement", description: "Adding music, SFX, voice enhancement", status: "pending" },
];

export default function ProcessingPage() {
  const [progress, setProgress] = useState(52);
  useEffect(() => {
    const interval = setInterval(() => { setProgress((p) => p >= 100 ? (clearInterval(interval), 100) : p + 0.5); }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">AI Processing</h1><p className="text-sm text-zinc-400 mt-1">Real Estate Luxury Villa Tour.mp4</p></div>
        <Badge variant="purple" size="md"><Sparkles className="w-3 h-3 mr-1" /> Processing</Badge>
      </div>
      <Card variant="glow" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center pulse-glow"><Brain className="w-5 h-5 text-violet-400" /></div>
            <div><h3 className="text-white font-medium">AI Editor at Work</h3><p className="text-xs text-zinc-400">Applying 15+ years of editing expertise</p></div>
          </div>
          <div className="text-right"><span className="text-2xl font-bold text-white">{Math.round(progress)}%</span><p className="text-xs text-zinc-500">~3 min remaining</p></div>
        </div>
        <ProgressBar value={progress} size="lg" variant="glow" />
      </Card>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div key={step.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
            <Card variant={step.status === "active" ? "glow" : "glass"} padding="sm" className="flex items-center gap-4 px-4 py-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${step.status === "complete" ? "bg-emerald-500/10" : step.status === "active" ? "bg-violet-500/10" : "bg-zinc-800/50"}`}>
                {step.status === "complete" ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : step.status === "active" ? <Loader2 className="w-4 h-4 text-violet-400 animate-spin" /> : <step.icon className="w-4 h-4 text-zinc-600" />}
              </div>
              <div className="flex-1"><span className={`text-sm font-medium ${step.status === "complete" ? "text-zinc-300" : step.status === "active" ? "text-white" : "text-zinc-600"}`}>{step.label}</span><p className={`text-xs mt-0.5 ${step.status === "pending" ? "text-zinc-600" : "text-zinc-500"}`}>{step.description}</p></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
