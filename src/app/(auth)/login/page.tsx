"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/projects";

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 md:p-10 glow">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
            <span className="text-2xl font-bold text-white">ClipWise</span>
          </Link>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Welcome back</h1>
          <p className="text-sm text-zinc-400 text-center mb-8">Sign in to continue editing</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
              loading={loading}
            >
              Sign In
            </Button>
          </form>
          <p className="text-center text-sm text-zinc-500 mt-6">No account? <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium">Create one</Link></p>
        </div>
      </motion.div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
