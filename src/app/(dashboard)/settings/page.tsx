"use client";

import { Crown, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Settings</h1><p className="text-sm text-zinc-400 mt-1">Manage your account</p></div>
      <Card variant="glow" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><Crown className="w-6 h-6 text-violet-400" /><div><h3 className="text-lg font-semibold text-white">Pro Plan</h3><p className="text-sm text-zinc-400">$29/month</p></div></div>
          <Badge variant="purple" size="md">Active</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div><p className="text-xs text-zinc-500">Exports</p><p className="text-sm font-medium text-white mt-0.5">142 / Unlimited</p></div>
          <div><p className="text-xs text-zinc-500">Storage</p><p className="text-sm font-medium text-white mt-0.5">34.2 / 100 GB</p><ProgressBar value={34.2} size="sm" className="mt-1" /></div>
          <div><p className="text-xs text-zinc-500">AI Credits</p><p className="text-sm font-medium text-white mt-0.5">2,340 / 5,000</p><ProgressBar value={46.8} size="sm" className="mt-1" /></div>
          <div><p className="text-xs text-zinc-500">Team</p><p className="text-sm font-medium text-white mt-0.5">1 / 1</p></div>
        </div>
        <Button variant="primary" size="sm" className="mt-6" icon={<Sparkles className="w-3 h-3" />}>Upgrade to Business</Button>
      </Card>
      <Card variant="glass" padding="lg">
        <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue="John Doe" />
          <Input label="Email" defaultValue="john@example.com" />
          <Input label="Username" defaultValue="@johndoe" />
          <Input label="Company" defaultValue="Creative Agency" />
        </div>
        <div className="flex justify-end mt-6"><Button variant="primary" size="md">Save Changes</Button></div>
      </Card>
    </div>
  );
}
