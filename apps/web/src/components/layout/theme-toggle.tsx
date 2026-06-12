"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        type="button"
        className="flex h-5 w-5 items-center justify-center rounded-xl border bg-transparent"
      />
    );
  }

  return (
    <Button
      type="button"
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="
        flex h-5 w-5 items-center justify-center
        rounded-xl border
        transition-all
        border-indigo-500
        bg-transparent
      "
    >
      {theme === "dark" ? (
        <Sun className="h-2 w-2 text-indigo-500" />
      ) : (
        <Moon className="h-2 w-2 text-indigo-500" />
      )}
    </Button>
  );
}