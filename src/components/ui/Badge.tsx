"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "purple" | "cyan";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    purple: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border font-medium", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
