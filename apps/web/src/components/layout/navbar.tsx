"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/shared/container";


export function Navbar() {
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-indigo-800/20
        bg-background/80
        backdrop-blur-xl
      "
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <Logo />
          </div>

          <div className="flex items-center gap-3">

            <Link 
              href="/dashboard"
              className="
                rounded-xl
                bg-indigo-500
                px-4 py-2
                text-sm font-medium
                text-white
                transition-colors
                hover:bg-indigo-600
              "
            >
              Launch App
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}