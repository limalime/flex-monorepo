"use client";

import { useState, useEffect } from "react";
import { Copy, ExternalLink, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CHAIN } from "@/lib/config/chains";

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const btnClass = `
  rounded-xl bg-indigo-500 px-4 py-2
  text-sm font-medium text-white
  transition-colors hover:bg-indigo-600
  disabled:opacity-50
`;

export function ConnectButton() {
  const [mounted, setMounted] = useState(false);

  const { address, isConnected, isPending, connect, disconnect, error } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function copyAddress() {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied");
    } catch {
      toast.error("Failed to copy address");
    }
  }

  function openExplorer() {
    if (!address) return;
    const explorerUrl = CHAIN.blockExplorers?.default.url;
    if (explorerUrl) {
      window.open(`${explorerUrl}/address/${address}`, "_blank");
    }
  }

  if (!mounted) {
    return (
      <Button className={btnClass} disabled>
        Connect Wallet
      </Button>
    );
  }

  if (!isConnected || !address) {
    return (
      <div>
        <Button
          onClick={async () => {
            try {
              await connect();
            } catch (err) {
              toast.error(
                err instanceof Error
                  ? err.message
                  : "Wallet connection failed",
              );
            }
          }}
          disabled={isPending}
          className={btnClass}
        >
          {isPending ? "Connecting..." : "Connect Wallet"}
        </Button>

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={btnClass}>{shortenAddress(address)}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={copyAddress}>
          <Copy /> Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openExplorer}>
          <ExternalLink /> View Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            disconnect();
            toast.success("Wallet disconnected");
          }}
        >
          <LogOut /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}