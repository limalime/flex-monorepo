"use client";

import { Wallet } from "lucide-react";

import { useWallet } from "@/hooks/use-wallet";
import { Card } from "@/components/ui/card";

function shortenAddress(address?: string) {
  if (!address) return "-";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletCard() {
  const {
    address,
    isConnected,
    chainId,
  } = useWallet();

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Wallet className="h-5 w-5 text-indigo-500" />

        <h3 className="font-semibold">
          Wallet
        </h3>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">
            Address
          </p>

          <p className="font-medium">
            {shortenAddress(address)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Chain
          </p>

          <p className="font-medium">
            {chainId ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Status
          </p>

          <p
            className={
              isConnected
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {isConnected
              ? "Connected"
              : "Disconnected"}
          </p>
        </div>
      </div>
    </Card>
  );
}