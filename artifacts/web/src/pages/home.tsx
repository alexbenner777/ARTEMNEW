import { useHealthCheck } from "@workspace/api-client-react";
import {
  RefreshCw,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Home() {
  const { data, isLoading, isSuccess, refetch, isRefetching } =
    useHealthCheck();

  const isChecking = isLoading || isRefetching;
  const isOnline = isSuccess && data?.status === "ok";

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-md mx-auto">
        <header className="mb-8 text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-card shadow-sm border border-border/50">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            AI Stars Platform
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            System Status
          </p>
        </header>

        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Status Indicator Circle */}
              <div className="relative">
                <div
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500",
                    isChecking
                      ? "bg-muted/50 text-muted-foreground"
                      : isOnline
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 text-destructive",
                  )}
                >
                  {isChecking ? (
                    <RefreshCw className="w-8 h-8 animate-spin" />
                  ) : isOnline ? (
                    <CheckCircle2 className="w-8 h-8" />
                  ) : (
                    <XCircle className="w-8 h-8" />
                  )}
                </div>

                {/* Ripple Effect for Online State */}
                {!isChecking && isOnline && (
                  <div
                    className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping"
                    style={{ animationDuration: "3s" }}
                  />
                )}
              </div>

              {/* Status Text */}
              <div className="space-y-1">
                <h2
                  className={cn(
                    "text-xl font-semibold transition-colors duration-300",
                    isChecking
                      ? "text-muted-foreground"
                      : isOnline
                        ? "text-foreground"
                        : "text-destructive",
                  )}
                >
                  {isChecking
                    ? "Checking status..."
                    : isOnline
                      ? "All systems online"
                      : "System offline"}
                </h2>

                <p className="text-sm text-muted-foreground min-h-[1.25rem]">
                  {isChecking
                    ? "Connecting to backend services"
                    : isOnline
                      ? "API and dependent services are operational"
                      : "Unable to reach the backend services"}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="bg-muted/30 p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-xs text-muted-foreground font-mono">
              <Clock className="w-3.5 h-3.5 mr-1.5 opacity-70" />
              {data?.timestamp ? (
                <span>
                  Last checked: {format(new Date(data.timestamp), "HH:mm:ss")}
                </span>
              ) : (
                <span>Standing by</span>
              )}
            </div>

            <button
              onClick={() => refetch()}
              disabled={isChecking}
              className={cn(
                "inline-flex items-center justify-center text-sm font-medium transition-all duration-200",
                "h-9 px-4 rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90",
                "disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-0.5 active:translate-y-0",
              )}
            >
              <RefreshCw
                className={cn("w-4 h-4 mr-2", isChecking && "animate-spin")}
              />
              Check again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
