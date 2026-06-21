"use client";

import { Shield } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/shared/card-header";
import { InfoRow } from "@/components/shared/info-row";

import { useWallet } from "@/hooks/use-wallet";

import { useAgent } from "@/providers/agent";

import type { Permission } from "@/hooks/use-permissions";

function countByStatus(
  permissions: Permission[],
  status: Permission["status"],
) {
  return permissions.filter(
    (permission) => permission.status === status,
  ).length;
}

export function PermissionStatusCard() {
  const { permissions } = useAgent();
  const { isConnected } = useWallet();

  const activeCount = countByStatus(permissions, "active");
  const disabledCount = countByStatus(permissions, "disabled");
  const expiredCount = countByStatus(permissions, "expired");
  const revokedCount = countByStatus(permissions, "revoked");

  const activePermissionCount = isConnected
    ? activeCount
    : null;

  const activeTypes = permissions
    .filter((permission) => permission.status === "active")
    .map((permission) => permission.type);

  return (
    <Card className="rounded-2xl p-6">
      <CardHeader icon={Shield} title="Permissions" />

      <div className="space-y-4 text-sm">
        <InfoRow label="Status">
          <p>
            {!isConnected
              ? "-"
              : activePermissionCount === 0
                ? "No Active Permissions"
                : `${activePermissionCount} Active`}
          </p>
        </InfoRow>

        <InfoRow label="Permission Count">
          <p>{activePermissionCount ?? "-"}</p>
        </InfoRow>

        <InfoRow label="Active">
          <p>{isConnected ? activeCount : "-"}</p>
        </InfoRow>

        <InfoRow label="Disabled">
          <p>{isConnected ? disabledCount : "-"}</p>
        </InfoRow>

        <InfoRow label="Expired">
          <p>{isConnected ? expiredCount : "-"}</p>
        </InfoRow>

        <InfoRow label="Revoked">
          <p>{isConnected ? revokedCount : "-"}</p>
        </InfoRow>

        <InfoRow label="Types">
          <p>
            {!isConnected
              ? "-"
              : activeTypes.length === 0
                ? "-"
                : activeTypes.join(", ")}
          </p>
        </InfoRow>

        <InfoRow label="Last Updated">
          <p>Never</p>
        </InfoRow>
      </div>
    </Card>
  );
}
