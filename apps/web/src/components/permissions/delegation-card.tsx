"use client";

import { Shield } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/shared/card-header";
import { InfoRow } from "@/components/shared/info-row";

import { useAgent } from "@/providers/agent";

export function DelegationCard() {
  const { permissions, delegations } = useAgent();
  const activePermission = permissions.find(
    (permission) => permission.status === "active",
  );
  const activeDelegation = delegations.find(
    (delegation) => delegation.status === "active",
  );

  return (
    <Card className="rounded-2xl p-6">
      <CardHeader icon={Shield} title="Delegation" />

      {!activePermission ? (
        <div className="space-y-3 text-sm">
          <InfoRow label="Delegate">Flex AI Agent</InfoRow>

          <InfoRow label="Status">
            <p
              className={
                activeDelegation ? "text-green-500" : "text-yellow-500"
              }
            >
              {activeDelegation ? "Active" : "Not Delegated"}
            </p>
          </InfoRow>
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <InfoRow label="Delegate">Flex AI Agent</InfoRow>

          <InfoRow label="Permission">{activePermission.type}</InfoRow>

          <InfoRow label="Daily Limit">{activePermission.limit} USDC</InfoRow>

          <InfoRow label="Duration">{activePermission.duration} Days</InfoRow>

          <InfoRow label="Status">
            <p className="text-green-500">Active</p>
          </InfoRow>
        </div>
      )}
    </Card>
  );
}