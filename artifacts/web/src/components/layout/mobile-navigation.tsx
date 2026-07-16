import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  navItems,
  navSections,
} from "@/components/navigation/navigation-config";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const [location] = useLocation();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Navigation"
        aria-modal="true"
        className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-sidebar border-r border-sidebar-border lg:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-none mb-0.5">
                AI Stars Platform
              </p>
              <p className="text-xs text-muted-foreground leading-none">
                Workspace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto py-3 px-2"
          aria-label="Mobile navigation"
        >
          {navSections.map((section) => {
            const items = navItems.filter(
              (item) => item.section === section.id,
            );
            return (
              <div key={section.id} className="mb-4">
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {section.label}
                </p>
                <ul role="list" className="space-y-0.5">
                  {items.map((item) => {
                    const isActive = location === item.path;
                    const Icon = item.icon;
                    return (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          aria-current={isActive ? "page" : undefined}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 h-9 px-2 rounded-md text-sm font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isActive
                              ? "bg-primary/15 text-primary"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          )}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-primary">W</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground leading-none mb-0.5">
                Workspace Owner
              </p>
              <p className="text-xs text-muted-foreground leading-none">
                Owner
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
