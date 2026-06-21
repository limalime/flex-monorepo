import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner";
import { CHAIN } from "@/lib/config/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .slice(2)
  );
}

export function shortenAddress(address?: string) {
  if (!address) return "-";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export async function copyAddress(address?: string) {
  if (!address) return;

  await navigator.clipboard.writeText(address);

  toast.success("Address copied");
}

export function openExplorer(address?: string) {
  if (!address) return;

  const explorerUrl = CHAIN.blockExplorers?.default.url;
  if (explorerUrl) {
    window.open(`${explorerUrl}/address/${address}`, "_blank");
  }
}