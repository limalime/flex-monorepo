"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/brand/logo"

import {
  mainNav,
  secondaryNav,
} from "@/lib/navigation";

import { cn } from "@/lib/utils";
import { ConnectButton } from "@/components/wallet/connect-button";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        w-64
        shrink-0
        border-r
        border-indigo-800/20
        lg:flex
        lg:flex-col
      "
    >
      <div className="p-6">
        <Logo />
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {mainNav.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`
              );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 border-t pt-6">
          {secondaryNav.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`
              );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
          <div className="flex flex-col gap-4 pl-3 pt-8">
            <ConnectButton>
              Connect Wallet
            </ConnectButton>
            
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </aside>
  );
}