"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Bell, LayoutGrid, Send } from "lucide-react";
import { UserNav } from "./user-nav";

export function Header() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 flex min-h-[72px] items-center border-b px-6">
      {isMobile && <SidebarTrigger className="mr-4" />}
      
      <div className="flex items-center space-x-2">
        <Send size={28} />
        <span className="text-lg font-bold">e-paper</span>
      </div>

      <Separator orientation="vertical" className="mx-4 h-6" />

      <LayoutGrid />

      <h2 className="ml-2 flex-1 text-sm">Soluções</h2>

      <Bell className="mr-8" />

      <UserNav />
    </header>
  );
}
