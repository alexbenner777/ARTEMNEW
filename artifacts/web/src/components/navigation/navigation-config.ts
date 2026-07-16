import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Star,
  FileText,
  Send,
  Bot,
  TrendingUp,
  BarChart2,
  UserCog,
  Settings,
} from "lucide-react";

export type NavSection = "main" | "tools" | "account";

export interface NavItem {
  path: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  section: NavSection;
}

export const navItems: NavItem[] = [
  // MAIN
  {
    path: "/dashboard",
    label: "Dashboard",
    title: "Dashboard",
    description: "Overview of workspace health and recent system activity.",
    icon: LayoutDashboard,
    section: "main",
  },
  {
    path: "/models",
    label: "Models",
    title: "Models",
    description: "Manage creator profiles and their platform settings.",
    icon: Star,
    section: "main",
  },
  {
    path: "/fans",
    label: "Fans",
    title: "Fans",
    description: "View and organize audience relationships.",
    icon: Users,
    section: "main",
  },
  {
    path: "/chats",
    label: "Chats",
    title: "Chats",
    description: "Manage conversations handled by operators and AI assistants.",
    icon: MessageSquare,
    section: "main",
  },

  // TOOLS
  {
    path: "/templates",
    label: "Templates",
    title: "Templates",
    description: "Create reusable conversation and messaging templates.",
    icon: FileText,
    section: "tools",
  },
  {
    path: "/mass-messages",
    label: "Mass Messages",
    title: "Mass Messages",
    description: "Prepare and track approved bulk communication campaigns.",
    icon: Send,
    section: "tools",
  },
  {
    path: "/auto-messages",
    label: "Auto Messages",
    title: "Auto Messages",
    description: "Configure rule-based automated messaging workflows.",
    icon: Bot,
    section: "tools",
  },
  {
    path: "/promo-renewals",
    label: "Promo Renewals",
    title: "Promo Renewals",
    description: "Manage promotional renewal workflows.",
    icon: TrendingUp,
    section: "tools",
  },
  {
    path: "/analytics",
    label: "Analytics",
    title: "Analytics",
    description: "Review performance, conversation, and operational metrics.",
    icon: BarChart2,
    section: "tools",
  },

  // ACCOUNT
  {
    path: "/team",
    label: "Team",
    title: "Team",
    description: "Manage workspace members, roles, and permissions.",
    icon: UserCog,
    section: "account",
  },
  {
    path: "/settings",
    label: "Settings",
    title: "Settings",
    description: "Configure workspace and integration settings.",
    icon: Settings,
    section: "account",
  },
];

export const navSections: { id: NavSection; label: string }[] = [
  { id: "main", label: "Main" },
  { id: "tools", label: "Tools" },
  { id: "account", label: "Account" },
];
