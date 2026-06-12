"use client";

import { Shield } from "lucide-react";

import { Card } from "@/components/ui/card";

import { useWallet } from "@/hooks/use-wallet";

import { useAgent } from "@/providers/agent";

export function PermissionStatusCard() {
const { permissions } = useAgent();
  const { isConnected } = useWallet();

  const activeCount = permissions.filter(
    (permission) => permission.status === "active",
  ).length;

  const disabledCount = permissions.filter(
    (permission) => permission.status === "disabled",
  ).length;

  const expiredCount = permissions.filter(
    (permission) => permission.status === "expired",
  ).length;

  const revokedCount = permissions.filter(
    (permission) => permission.status === "revoked",
  ).length;

  const activePermissionCount = isConnected
    ? permissions.filter((permission) => permission.status === "active").length
    : null;

  const activeTypes = permissions
    .filter((permission) => permission.status === "active")
    .map((permission) => permission.type);

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-indigo-500" />

        <h3 className="font-semibold">Permissions</h3>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Status</p>

          <p>
            {!isConnected
              ? "-"
              : activePermissionCount === 0
                ? "No Active Permissions"
                : `${activePermissionCount} Active`}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Permission Count</p>

          <p>{activePermissionCount ?? "-"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Active</p>

          <p>{isConnected ? activeCount : "-"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Disabled</p>

          <p>{isConnected ? disabledCount : "-"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Expired</p>

          <p>{isConnected ? expiredCount : "-"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Revoked</p>

          <p>{isConnected ? revokedCount : "-"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Types</p>

          <p>
            {!isConnected
              ? "-"
              : activeTypes.length === 0
                ? "-"
                : activeTypes.join(", ")}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Last Updated
          </p>

          <p>Never</p>
        </div>
      </div>
    </Card>
  );
}
