"use client";

import { Wallet } from "lucide-react";

import { useWallet } from "@/hooks/use-wallet";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/shared/card-header";
import { InfoRow } from "@/components/shared/info-row";
import { shortenAddress } from "@/lib/utils";

export function WalletCard() {
  const {
    address,
    isConnected,
    chainId,
  } = useWallet();

  return (
    <Card className="rounded-2xl p-6">
      <CardHeader icon={Wallet} title="Wallet" />

      <div className="space-y-3 text-sm">
        <InfoRow label="Address">
          <p className="font-medium">
            {shortenAddress(address)}
          </p>
        </InfoRow>

        <InfoRow label="Chain">
          <p className="font-medium">
            {chainId ?? "-"}
          </p>
        </InfoRow>

        <InfoRow label="Status">
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
        </InfoRow>
      </div>
    </Card>
  );
}