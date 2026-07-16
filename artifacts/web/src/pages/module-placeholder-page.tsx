import type { NavItem } from "@/components/navigation/navigation-config";
import { cn } from "@/lib/utils";

interface ModulePlaceholderPageProps {
  navItem: NavItem;
}

export default function ModulePlaceholderPage({
  navItem,
}: ModulePlaceholderPageProps) {
  const Icon = navItem.icon;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          {navItem.title}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {navItem.description}
        </p>
      </div>

      {/* Empty state panel */}
      <div
        className={cn(
          "rounded-xl border border-border border-dashed bg-card/50",
          "flex flex-col items-center justify-center text-center",
          "px-6 py-16 gap-4",
        )}
      >
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <Icon className="w-6 h-6" />
        </div>
        <div className="max-w-xs space-y-1.5">
          <p className="text-sm font-semibold text-foreground">
            {navItem.title}
          </p>
          <p className="text-sm text-muted-foreground">{navItem.description}</p>
        </div>
        <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-muted-foreground mt-1">
          This module will be implemented in a later task
        </span>
      </div>
    </div>
  );
}
