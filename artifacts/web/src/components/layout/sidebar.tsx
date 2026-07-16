import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  navItems,
  navSections,
} from "@/components/navigation/navigation-config";

const STORAGE_KEY = "ai-stars-sidebar-collapsed";

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeCollapsed(value: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // localStorage unavailable — continue without persisting
  }
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [location] = useLocation();

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      writeCollapsed(next);
      return next;
    });
  }

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col flex-shrink-0 transition-[width] duration-200 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-14" : "w-60",
      )}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div
        className={cn(
          "flex items-center gap-3 h-14 border-b border-sidebar-border flex-shrink-0 px-3",
          collapsed && "justify-center",
        )}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary flex-shrink-0">
          <Zap className="w-4 h-4" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate leading-none mb-0.5">
              AI Stars Platform
            </p>
            <p className="text-xs text-muted-foreground truncate leading-none">
              Workspace
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="Sidebar">
        {navSections.map((section) => {
          const items = navItems.filter((item) => item.section === section.id);
          return (
            <div key={section.id} className="mb-4">
              {!collapsed && (
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {section.label}
                </p>
              )}
              <ul role="list" className="space-y-0.5">
                {items.map((item) => {
                  const isActive = location === item.path;
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        aria-label={collapsed ? item.label : undefined}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-md text-sm font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          collapsed
                            ? "h-9 w-9 justify-center px-0 mx-auto"
                            : "h-9 px-2",
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
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
      <div className="border-t border-sidebar-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-primary">W</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate leading-none mb-0.5">
                Workspace Owner
              </p>
              <p className="text-xs text-muted-foreground truncate leading-none">
                Owner
              </p>
            </div>
          </div>
        )}
        <div className={cn("px-2 pb-2", collapsed && "pt-2")}>
          <button
            onClick={toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "flex items-center justify-center rounded-md h-8 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              collapsed ? "w-9 mx-auto" : "w-full gap-2 px-2",
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
