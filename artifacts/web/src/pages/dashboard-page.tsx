import { useHealthCheck } from "@workspace/api-client-react";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  UserPlus,
  Link as LinkIcon,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

function SystemStatusCard() {
  const { data, isLoading, isSuccess, isRefetching, refetch } =
    useHealthCheck();

  const isChecking = isLoading || isRefetching;
  const isOnline = isSuccess && data?.status === "ok";

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">System Status</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          API service health and connectivity
        </p>
      </div>

      <div className="px-5 py-5 flex items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
            isChecking
              ? "bg-muted/50 text-muted-foreground"
              : isOnline
                ? "bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))]"
                : "bg-destructive/15 text-destructive",
          )}
        >
          {isChecking ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : isOnline ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
        </div>

        {/* Status text */}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-semibold transition-colors",
              isChecking
                ? "text-muted-foreground"
                : isOnline
                  ? "text-foreground"
                  : "text-destructive",
            )}
          >
            {isChecking
              ? "Checking status…"
              : isOnline
                ? "All systems online"
                : "System offline"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isChecking
              ? "Connecting to backend services"
              : isOnline
                ? "API and dependent services are operational"
                : "Unable to reach the backend services"}
          </p>
          {data?.timestamp && !isChecking && (
            <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last checked: {format(new Date(data.timestamp), "HH:mm:ss")}
            </p>
          )}
        </div>

        {/* Check again button */}
        <button
          onClick={() => refetch()}
          disabled={isChecking}
          className={cn(
            "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium flex-shrink-0 transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "disabled:opacity-50 disabled:pointer-events-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <RefreshCw
            className={cn("w-3.5 h-3.5", isChecking && "animate-spin")}
          />
          Check again
        </button>
      </div>
    </div>
  );
}

interface GettingStartedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function GettingStartedCard({
  icon,
  title,
  description,
}: GettingStartedCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-5">
      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center mb-3 text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <span className="inline-block text-[10px] font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground">
        Coming in a later task
      </span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of workspace health and recent system activity.
        </p>
      </div>

      {/* System Status */}
      <SystemStatusCard />

      {/* Getting Started */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Getting Started
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <GettingStartedCard
            icon={<UserPlus className="w-4 h-4" />}
            title="Add a model"
            description="Set up creator profiles and configure their platform settings."
          />
          <GettingStartedCard
            icon={<LinkIcon className="w-4 h-4" />}
            title="Connect a messaging channel"
            description="Link a messaging platform to start managing conversations."
          />
          <GettingStartedCard
            icon={<Users className="w-4 h-4" />}
            title="Invite your team"
            description="Add workspace members and assign them appropriate roles."
          />
        </div>
      </div>
    </div>
  );
}
