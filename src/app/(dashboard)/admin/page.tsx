"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, HardDrive, Cpu, Activity, Shield } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const stats = [
  { icon: Users, label: "Total Users", value: "52,847", change: "+1,234 this week", color: "text-violet-400" },
  { icon: DollarSign, label: "Revenue (MRR)", value: "$847K", change: "+12.4% growth", color: "text-emerald-400" },
  { icon: HardDrive, label: "Storage Used", value: "45.2 TB", change: "of 100 TB", color: "text-cyan-400" },
  { icon: Cpu, label: "AI Processing", value: "89.2%", change: "GPU utilization", color: "text-amber-400" },
];

const services = [
  { name: "API Gateway", status: "healthy", uptime: "99.99%", latency: "12ms" },
  { name: "AI Queue", status: "healthy", uptime: "99.95%", latency: "2.3s" },
  { name: "CDN", status: "healthy", uptime: "100%", latency: "8ms" },
  { name: "Database", status: "healthy", uptime: "99.99%", latency: "3ms" },
  { name: "Redis", status: "healthy", uptime: "99.99%", latency: "1ms" },
  { name: "S3 Storage", status: "warning", uptime: "99.9%", latency: "45ms" },
  { name: "GPU Cluster", status: "healthy", uptime: "99.8%", latency: "150ms" },
];

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Shield className="w-6 h-6 text-violet-400" />Admin Panel</h1><p className="text-sm text-zinc-400 mt-1">System overview</p></div>
        <div className="flex gap-3"><Button variant="secondary" size="sm">Export Report</Button><Button variant="primary" size="sm">View Logs</Button></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <Card variant="glass" padding="md">
              <div className="flex items-start justify-between">
                <div><p className="text-xs text-zinc-500">{stat.label}</p><p className="text-2xl font-bold text-white mt-1">{stat.value}</p><p className="text-xs text-zinc-400 mt-1">{stat.change}</p></div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card variant="glass" padding="lg">
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-400" /> System Health</h3><Badge variant="success">All Systems Operational</Badge></div>
        <div className="space-y-2">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full ${s.status === "healthy" ? "bg-emerald-400" : "bg-amber-400"}`} /><span className="text-sm text-zinc-300">{s.name}</span></div>
              <div className="flex items-center gap-4 text-xs text-zinc-500"><span>{s.uptime}</span><span>{s.latency}</span><Badge variant={s.status === "healthy" ? "success" : "warning"} size="sm">{s.status}</Badge></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
