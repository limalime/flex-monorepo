import {
  LayoutDashboard,
  Bot,
  TrendingUp,
  FileText,
  User,
  Settings,
} from "lucide-react";

export const mainNav = [
  {
    title: "Markets",
    href: "/markets",
    icon: TrendingUp,
  },
  {
    title: "Agent",
    href: "/agent",
    icon: Bot,
  },
  {
    title: "Research",
    href: "/research",
    icon: FileText,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

export const secondaryNav = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];