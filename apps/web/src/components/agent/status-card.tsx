"use client";

import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/shared/card-header";
import { InfoRow } from "@/components/shared/info-row";
import { useWallet } from "@/hooks/use-wallet";
import { useSmartAccount } from "@/hooks/use-smart-account";
import { useAgent } from "@/providers/agent";

export function AgentStatusCard() {
  const { isConnected } = useWallet();
  const { address } = useSmartAccount();
  const { permissions } = useAgent();

  const activePermissions =
  permissions.filter(
    (permission) =>
      permission.status === "active",
  ).length;

  return (
    <Card className="rounded-2xl p-6">
      <CardHeader icon={Bot} title="Agent Status" />

      <div className="space-y-4">
        <InfoRow label="Wallet">
          {!isConnected ? (
            <p className="text-muted-foreground">Please connect your wallet</p>
          ) : (
            <p className="text-green-500">Connected</p>
          )}
        </InfoRow>

        <InfoRow label="Smart Account">
          {!isConnected ? (
            <p className="text-muted-foreground">Please connect your wallet</p>
          ) : (
            <p className={address ? "text-green-500" : "text-yellow-500"}>
              {address ? "Ready" : "Not Generated"}
            </p>
          )}
        </InfoRow>

        <InfoRow label="Permissions">
          <p>{!isConnected ? "-" : `${activePermissions} Active`}</p>
        </InfoRow>
      </div>
    </Card>
  );
}