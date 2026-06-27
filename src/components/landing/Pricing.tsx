"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const plans = [
  { name: "Starter", price: 0, period: "forever", description: "Perfect for trying out AI editing", features: ["3 exports/month", "720p quality", "Basic AI editing", "5 languages", "1GB storage", "Watermark"], cta: "Start Free", popular: false },
  { name: "Pro", price: 29, period: "/month", description: "For serious content creators", features: ["Unlimited exports", "4K HDR quality", "Advanced AI editing", "50+ languages", "100GB storage", "No watermark", "Brand kit", "Priority processing"], cta: "Upgrade to Pro", popular: true },
  { name: "Business", price: 79, period: "/month", description: "For teams and agencies", features: ["Everything in Pro", "5 team members", "500GB storage", "API access", "AI voice over", "AI dubbing", "White-label", "Priority support"], cta: "Start Business", popular: false },
  { name: "Enterprise", price: 249, period: "/month", description: "Custom solutions at scale", features: ["Everything in Business", "Unlimited team", "Unlimited storage", "Custom AI models", "Dedicated GPU", "SLA guarantee", "Account manager", "24/7 support"], cta: "Contact Sales", popular: false },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Start free, upgrade when you need more power.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="relative">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center gap-1"><Sparkles className="w-3 h-3" /> Most Popular</span>
                </div>
              )}
              <Card variant={plan.popular ? "glow" : "glass"} padding="lg" className={`h-full flex flex-col ${plan.popular ? "border-violet-500/30" : ""}`}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price === 0 ? "Free" : `$${plan.price}`}</span>
                  {plan.price > 0 && <span className="text-zinc-500 text-sm">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "primary" : "secondary"} size="lg" className="w-full">{plan.cta}</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
