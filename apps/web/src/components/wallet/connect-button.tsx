"use client";

import { useState, useEffect } from "react";
import { Copy, ExternalLink, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { shortenAddress, copyAddress, openExplorer } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const btnClass = `
  rounded-xl bg-indigo-500 px-4 py-2
  text-sm font-medium text-white
  transition-colors hover:bg-indigo-600
  disabled:opacity-50
`;

export function ConnectButton() {
  const [mounted, setMounted] = useState(false);

  const { address, isConnected, isPending, connect, disconnect } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className={btnClass} disabled>
        Connect Wallet
      </Button>
    );
  }

  if (!isConnected || !address) {
    return (
      <Button
        onClick={() => connect()}
        disabled={isPending}
        className={btnClass}
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={btnClass}>{shortenAddress(address)}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => copyAddress(address)}>
          <Copy /> Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openExplorer(address)}>
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