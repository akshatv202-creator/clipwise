"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "glow";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  className,
  variant = "default",
  hover = false,
  padding = "md",
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-zinc-900/50 border border-zinc-800/50",
    glass: "glass",
    gradient: "gradient-border",
    glow: "bg-zinc-900/50 border border-zinc-800/50 glow",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        paddings[padding],
        hover && "cursor-pointer hover:border-violet-500/30",
        className
      )}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  );
}
