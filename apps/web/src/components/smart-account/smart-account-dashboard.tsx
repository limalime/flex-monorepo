"use client";

import { useSmartAccount } from "@/hooks/use-smart-account";

import { Button } from "@/components/ui/button";

import { WalletCard } from "./wallet-card";

import { SmartAccountCard } from "./smart-account-card";

import { toast } from "sonner";

export function SmartAccountDashboard() {
  const { address, init, isLoading } = useSmartAccount();

  return (
    <div className="space-y-6">
      <div
        className="
          grid gap-6
          lg:grid-cols-2
        "
      >
        <WalletCard />

        <SmartAccountCard address={address} />
      </div>

      <Button
        onClick={async () => {
          try {
            const address = await init();

            if (address) {
              toast.success("Smart account generated");
            }
          } catch {
            toast.error("Failed to generate smart account");
          }
        }}
        disabled={isLoading}
        className="
    bg-indigo-500
    hover:bg-indigo-600
  "
      >
        {isLoading ? "Generating..." : "Generate Smart Account"}
      </Button>
    </div>
  );
}
