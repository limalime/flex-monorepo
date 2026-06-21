"use client";

import { Bot, Copy, ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/shared/card-header";
import { InfoRow } from "@/components/shared/info-row";
import { shortenAddress, copyAddress, openExplorer } from "@/lib/utils";

type Props = {
  address?: string;
};

export function SmartAccountCard({ address }: Props) {

  return (
    <Card className="rounded-2xl p-6">
      <CardHeader icon={Bot} title="Smart Account" />

      {!address ? (
        <div>
          <p className="text-muted-foreground">Not generated yet</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 text-sm">
            <InfoRow label="Address">
              <p className="font-medium">{shortenAddress(address)}</p>
            </InfoRow>

            <InfoRow label="Type">
              <p className="font-medium">MetaMask Smart Account</p>
            </InfoRow>

            <InfoRow label="Status">
              <p className="text-green-500">Ready</p>
            </InfoRow>
          </div>

          <div className="mt-5 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => copyAddress(address)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>

            <Button size="sm" variant="outline" onClick={() => openExplorer(address)}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Explorer
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}