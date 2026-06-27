"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Download, Video } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const stats = [
  { icon: Video, label: "Total Videos", value: "47", change: "+8" },
  { icon: Download, label: "Total Exports", value: "142", change: "+23" },
  { icon: Clock, label: "Time Saved", value: "186h", change: "+42h" },
  { icon: TrendingUp, label: "Avg Viral Score", value: "84%", change: "+5%" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Analytics</h1><p className="text-sm text-zinc-400 mt-1">Track your performance</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <Card variant="glass" padding="md">
              <div className="flex items-start justify-between">
                <div><p className="text-xs text-zinc-500">{stat.label}</p><p className="text-2xl font-bold text-white mt-1">{stat.value}</p><Badge variant="success" size="sm" className="mt-1">{stat.change} this month</Badge></div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><stat.icon className="w-5 h-5 text-violet-400" /></div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card variant="glass" padding="lg">
        <h3 className="text-lg font-semibold text-white mb-6">Export Activity</h3>
        <div className="h-64 flex items-end justify-between gap-2 px-4">
          {[40,65,45,80,55,90,70,85,60,95,75,88,50,72].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} className="flex-1 rounded-t-lg bg-gradient-to-t from-violet-600/50 to-violet-400/50 hover:from-violet-600 hover:to-violet-400 transition-colors cursor-pointer" />
          ))}
        </div>
      </Card>
    </div>
  );
}
