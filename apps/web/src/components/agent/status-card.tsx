"use client";

import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useWallet } from "@/hooks/use-wallet";
import { useSmartAccount } from "@/hooks/use-smart-account";
import { usePermissions } from "@/hooks/use-permission";
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
      <div className="mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-indigo-500" />
        <h3 className="font-semibold">Agent Status</h3>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground">Wallet</p>
          {!isConnected ? (
            <p className="text-muted-foreground">Please connect your wallet</p>
          ) : (
            <p className="text-green-500">Connected</p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Smart Account</p>
          {!isConnected ? (
            <p className="text-muted-foreground">Please connect your wallet</p>
          ) : (
            <p className={address ? "text-green-500" : "text-yellow-500"}>
              {address ? "Ready" : "Not Generated"}
            </p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Permissions</p>
          <p>{!isConnected ? "-" : `${activePermissions} Active`}</p>
        </div>
      </div>
    </Card>
  );
}