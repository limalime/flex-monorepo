"use client";

import { Brain, Shield } from "lucide-react";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreatePermissionDialog } from "@/components/permissions/create-dialog";
import { useWallet } from "@/hooks/use-wallet";

type Props = {
  onCreatePermission: (permission: {
    type: string;
    limit: number;
    duration: number;
  }) => void;
};

export function AgentControlsCard({ onCreatePermission }: Props) {
  const { isConnected } = useWallet();
  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="font-semibold">Agent Controls</h3>

        <p
          className="
            mt-1 text-sm
            text-muted-foreground
          "
        >
          Demo controls for upcoming research and permission flows.
        </p>
      </div>

      <div
        className="
          flex flex-col gap-3
          sm:flex-row
        "
      >
        <Button
          onClick={() =>
            toast.info("Research Engine will be enabled in Phase 4")
          }
          className="
            bg-indigo-500
            hover:bg-indigo-600
          "
        >
          <Brain className="mr-2 h-4 w-4" />
          Start Research
        </Button>

        {isConnected ? (
          <CreatePermissionDialog onCreate={onCreatePermission} />
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Please connect wallet to create permission")
            }
          >
            <Shield className="mr-2 h-4 w-4" />
            Create Permission
          </Button>
        )}
      </div>
    </Card>
  );
}
