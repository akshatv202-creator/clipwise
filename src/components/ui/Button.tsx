"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
      secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20",
      ghost: "hover:bg-white/5 text-zinc-400 hover:text-white",
      outline: "border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400",
      danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-lg",
      md: "px-4 py-2 text-sm rounded-xl",
      lg: "px-6 py-3 text-base rounded-xl",
      xl: "px-8 py-4 text-lg rounded-2xl",
    };

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...(props as Record<string, unknown>)}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {icon && !loading && icon}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
