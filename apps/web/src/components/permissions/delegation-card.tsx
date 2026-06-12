"use client";

import { Shield } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { Permission } from "@/hooks/use-permissions";

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
      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-indigo-500" />

        <h3 className="font-semibold">Delegation</h3>
      </div>

      {!activePermission ? (
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Delegate</p>

            <p>Flex AI Agent</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>

            <p
              className={
                activeDelegation ? "text-green-500" : "text-yellow-500"
              }
            >
              {activeDelegation ? "Active" : "Not Delegated"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Delegate</p>

            <p>Flex AI Agent</p>
          </div>

          <div>
            <p className="text-muted-foreground">Permission</p>

            <p>{activePermission.type}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Daily Limit</p>

            <p>{activePermission.limit} USDC</p>
          </div>

          <div>
            <p className="text-muted-foreground">Duration</p>

            <p>{activePermission.duration} Days</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>

            <p className="text-green-500">Active</p>
          </div>
        </div>
      )}
    </Card>
  );
}