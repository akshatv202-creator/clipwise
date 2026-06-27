"use client";

import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <div>
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
