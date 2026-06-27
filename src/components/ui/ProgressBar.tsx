"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "glow";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export default function ProgressBar({ value, max = 100, size = "md", variant = "gradient", showLabel = false, label, className }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = { sm: "h-1", md: "h-2", lg: "h-3" };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-zinc-400">{label}</span>
          <span className="text-sm font-medium text-white">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-zinc-800/50 overflow-hidden", sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            variant === "gradient" && "bg-gradient-to-r from-violet-600 to-cyan-500",
            variant === "default" && "bg-violet-600",
            variant === "glow" && "bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/30"
          )}
        />
      </div>
    </div>
  );
}
