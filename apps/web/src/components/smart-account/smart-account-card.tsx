"use client";

import { Bot, Copy, ExternalLink } from "lucide-react";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CHAIN } from "@/lib/config/chains";

type Props = {
  address?: string;
};

function shortenAddress(address?: string) {
  if (!address) return "-";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function SmartAccountCard({ address }: Props) {
  async function copyAddress() {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      toast.success("Smart account copied");
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

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-indigo-500" />

        <h3 className="font-semibold">Smart Account</h3>
      </div>

      {!address ? (
        <div>
          <p className="text-muted-foreground">Not generated yet</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Address</p>

              <p className="font-medium">{shortenAddress(address)}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Type</p>

              <p className="font-medium">MetaMask Smart Account</p>
            </div>

            <div>
              <p className="text-muted-foreground">Status</p>

              <p className="text-green-500">Ready</p>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Button size="sm" variant="outline" onClick={copyAddress}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>

            <Button size="sm" variant="outline" onClick={openExplorer}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Explorer
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}