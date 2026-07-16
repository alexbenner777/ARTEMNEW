import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <p className="text-6xl font-bold text-muted-foreground/30 leading-none select-none">
        404
      </p>
      <div className="space-y-1.5">
        <h1 className="text-lg font-semibold text-foreground">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground max-w-xs">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        href="/dashboard"
        className={cn(
          "inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium",
          "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
