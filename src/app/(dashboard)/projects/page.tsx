"use client";

import { useState } from "react";
import { Plus, Play, CheckCircle, TrendingUp, Video, HardDrive, Zap, Clock, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import Link from "next/link";

const projects = [
  { id: "1", title: "Real Estate Luxury Villa Tour", duration: "4:32", status: "ready", niche: "Real Estate", progress: 100, date: "2 hours ago", viralScore: 87, gradient: "from-violet-900/40 via-indigo-900/30 to-blue-900/40", emoji: "🏠" },
  { id: "2", title: "Fitness Morning Routine VLOG", duration: "12:45", status: "processing", niche: "Fitness", progress: 67, date: "5 hours ago", viralScore: null, gradient: "from-emerald-900/40 via-teal-900/30 to-cyan-900/40", emoji: "💪" },
  { id: "3", title: "Product Review - iPhone 16 Pro", duration: "8:21", status: "ready", niche: "Technology", progress: 100, date: "1 day ago", viralScore: 92, gradient: "from-blue-900/40 via-cyan-900/30 to-teal-900/40", emoji: "📱" },
  { id: "4", title: "Podcast Ep 45 - AI in Business", duration: "45:10", status: "analyzing", niche: "Podcast", progress: 23, date: "1 day ago", viralScore: null, gradient: "from-purple-900/40 via-violet-900/30 to-fuchsia-900/40", emoji: "🎙️" },
  { id: "5", title: "Street Food Tour - Bangkok", duration: "15:33", status: "ready", niche: "Travel", progress: 100, date: "3 days ago", viralScore: 78, gradient: "from-orange-900/40 via-amber-900/30 to-yellow-900/40", emoji: "🍜" },
  { id: "6", title: "Fashion Lookbook Summer 2025", duration: "3:48", status: "ready", niche: "Fashion", progress: 100, date: "5 days ago", viralScore: 84, gradient: "from-pink-900/40 via-rose-900/30 to-red-900/40", emoji: "👗" },
];

const stats = [
  { icon: Video, label: "Total Projects", value: "47", change: "+12 this month", color: "text-violet-400" },
  { icon: TrendingUp, label: "Avg Viral Score", value: "84%", change: "+5% vs last month", color: "text-emerald-400" },
  { icon: Zap, label: "AI Credits", value: "2,340", change: "of 5,000 used", color: "text-cyan-400" },
  { icon: HardDrive, label: "Storage Used", value: "34.2 GB", change: "of 100 GB", color: "text-amber-400" },
];

export default function ProjectsPage() {
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [exportedIds, setExportedIds] = useState<string[]>([]);

  const handleExport = (id: string) => {
    setExportingId(id);
    setTimeout(() => {
      setExportingId(null);
      setExportedIds((prev) => [...prev, id]);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">Welcome back, John.</p>
        </div>
        <Link href="/upload"><Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>Upload New Video</Button></Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="glass" padding="md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-zinc-400 mt-1">{stat.change}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} variant="glass" hover padding="none" className="overflow-hidden">
              {/* Thumbnail with gradient + emoji */}
              <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative group`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-30">{project.emoji}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-medium px-1.5 py-0.5 rounded bg-black/60 text-white">{project.duration}</span>
                <div className="absolute top-2 left-2">
                  <Badge variant={project.status === "ready" ? "success" : project.status === "processing" ? "purple" : "cyan"}>
                    {project.status === "ready" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {project.status === "processing" && <Clock className="w-3 h-3 mr-1" />}
                    {project.status}
                  </Badge>
                </div>
                {project.viralScore && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px]">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">{project.viralScore}%</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-white truncate">{project.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge size="sm" variant="default">{project.niche}</Badge>
                  <span className="text-[11px] text-zinc-500">{project.date}</span>
                </div>

                {/* Progress for non-ready */}
                {project.status !== "ready" && (
                  <div className="mt-3">
                    <ProgressBar value={project.progress} size="sm" variant="gradient" />
                  </div>
                )}

                {/* Actions for ready */}
                {project.status === "ready" && (
                  <div className="mt-3 flex gap-2">
                    <Link href="/preview" className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        <Play className="w-3 h-3" /> Preview
                      </Button>
                    </Link>
                    {exportedIds.includes(project.id) ? (
                      <Button variant="secondary" size="sm" className="flex-1" icon={<Download className="w-3 h-3" />}>
                        Downloaded ✓
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        loading={exportingId === project.id}
                        onClick={() => handleExport(project.id)}
                      >
                        {exportingId === project.id ? "Exporting..." : "Export"}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
