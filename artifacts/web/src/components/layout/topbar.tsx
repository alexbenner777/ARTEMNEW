import { Menu, Search } from "lucide-react";
import ApiStatus from "@/components/system/api-status";
import { cn } from "@/lib/utils";

interface TopbarProps {
  pageTitle: string;
  onMobileMenuClick: () => void;
}

export default function Topbar({ pageTitle, onMobileMenuClick }: TopbarProps) {
  return (
    <header className="flex items-center h-14 px-4 border-b border-border bg-background flex-shrink-0 gap-4">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMobileMenuClick}
          aria-label="Open navigation menu"
          className={cn(
            "flex lg:hidden items-center justify-center w-8 h-8 rounded-md flex-shrink-0",
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <Menu className="w-4 h-4" />
        </button>
        <p className="text-sm font-semibold text-foreground truncate">
          {pageTitle}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 ml-auto flex-shrink-0">
        <ApiStatus />

        {/* Search placeholder */}
        <div className="relative hidden sm:flex items-center">
          <Search
            className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground/50 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search"
            disabled
            aria-label="Search (not available)"
            className={cn(
              "h-8 w-48 rounded-md bg-muted/50 border border-border pl-8 pr-3 text-xs text-muted-foreground",
              "placeholder:text-muted-foreground/40 disabled:cursor-not-allowed disabled:opacity-50",
              "focus:outline-none",
            )}
          />
        </div>

        {/* Avatar placeholder */}
        <div
          className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
          aria-label="User avatar"
          role="img"
        >
          <span
            className="text-xs font-semibold text-primary"
            aria-hidden="true"
          >
            W
          </span>
        </div>
      </div>
    </header>
  );
}
