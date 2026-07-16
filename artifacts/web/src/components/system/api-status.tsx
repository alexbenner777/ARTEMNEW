import { useHealthCheck } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

export default function ApiStatus() {
  const { data, isLoading, isSuccess, isRefetching } = useHealthCheck();
  const isChecking = isLoading || isRefetching;
  const isOnline = isSuccess && data?.status === "ok";

  return (
    <div
      className="flex items-center gap-1.5 text-xs select-none"
      aria-live="polite"
      aria-label={
        isChecking
          ? "Checking API status"
          : isOnline
            ? "API Online"
            : "API Offline"
      }
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full flex-shrink-0 transition-colors",
          isChecking
            ? "bg-muted-foreground/50"
            : isOnline
              ? "bg-[hsl(var(--success))] animate-pulse"
              : "bg-destructive",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "transition-colors",
          isChecking
            ? "text-muted-foreground"
            : isOnline
              ? "text-foreground"
              : "text-destructive",
        )}
      >
        {isChecking ? "Checking" : isOnline ? "API Online" : "API Offline"}
      </span>
    </div>
  );
}
