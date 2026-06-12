"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/lib/utils";
import { ConnectButton } from "@/components/wallet/connect-button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  mainNav,
  secondaryNav,
} from "@/lib/navigation";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        border-t border-indigo-800/20
        bg-background/80
        backdrop-blur-xl
        lg:hidden
      "
    >
      <div className="grid grid-cols-5">
        {mainNav.slice(0, 4).map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 text-xs transition-colors",
                isActive
                  ? "text-indigo-500"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}

        <Sheet>
          <SheetTrigger
            className="
              flex flex-col items-center
              gap-1 py-3 text-xs
              text-muted-foreground
            "
          >
            <Menu className="h-5 w-5" />
            More
          </SheetTrigger>

          <SheetContent
            side="left"
            className="
              border-transparent
              bg-background/95
              backdrop-blur-xl
            "
          >
            <VisuallyHidden>
              <SheetTitle>
                Navigation Menu
              </SheetTitle>
            </VisuallyHidden>

            <div className="mt-8 space-y-2">
              <div className="pl-6">
                <Logo />
              </div>

              <div className="pt-4">
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
                        "mx-3 flex items-center gap-4 rounded-xl px-4 py-3 transition-colors",
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

              <div className="flex flex-col gap-6 pl-3 pr-3 pt-8">
                <ConnectButton>
                  Connect Wallet
                </ConnectButton>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}