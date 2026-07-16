import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import MobileNavigation from "./mobile-navigation";
import { navItems } from "@/components/navigation/navigation-config";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const currentNav = navItems.find((item) => item.path === location);
  const pageTitle = currentNav?.title ?? "Page Not Found";

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          pageTitle={pageTitle}
          onMobileMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </div>
  );
}
