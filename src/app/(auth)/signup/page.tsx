"use client";

import { motion } from "framer-motion";
import { Zap, Mail, Lock, User, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 md:p-10 glow">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
            <span className="text-2xl font-bold text-white">ClipWise</span>
          </Link>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Create your account</h1>
          <p className="text-sm text-zinc-400 text-center mb-8">Start editing with AI in seconds</p>
          <div className="space-y-3 mb-6">
            <Button variant="secondary" size="lg" className="w-full">Continue with Google</Button>
            <Button variant="secondary" size="lg" className="w-full">Continue with Apple</Button>
          </div>
          <div className="flex items-center gap-4 mb-6"><div className="flex-1 h-px bg-zinc-800" /><span className="text-xs text-zinc-500">or</span><div className="flex-1 h-px bg-zinc-800" /></div>
          <form className="space-y-4">
            <Input label="Full Name" type="text" placeholder="John Doe" icon={<User className="w-4 h-4" />} />
            <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail className="w-4 h-4" />} />
            <Input label="Password" type="password" placeholder="Create a strong password" icon={<Lock className="w-4 h-4" />} />
            <Link href="/projects"><Button variant="primary" size="lg" className="w-full mt-2" icon={<Sparkles className="w-4 h-4" />}>Create Account</Button></Link>
          </form>
          <p className="text-center text-sm text-zinc-500 mt-6">Already have an account? <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">Sign in</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
