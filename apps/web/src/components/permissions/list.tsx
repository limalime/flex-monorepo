"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import type { Permission } from "@/hooks/use-permissions";

type Props = {
  permissions: Permission[];

  onToggle: (id: string) => void;

  onDelete: (id: string) => void;
};

export function PermissionList({ permissions, onToggle, onDelete }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <h3 className="mb-4 font-semibold">Active Permissions</h3>

      {permissions.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No permissions created yet.
        </p>
      ) : (
        <div className="space-y-3">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="
                  rounded-xl
                  border
                  p-4
                "
            >
              <div
                className="
                    mb-3 flex
                    items-center
                    justify-between
                  "
              >
                <p className="font-medium">{permission.type}</p>

                <span
                  className={
                    permission.status === "active"
                      ? "text-green-500"
                      : permission.status === "disabled"
                        ? "text-yellow-500"
                        : permission.status === "expired"
                          ? "text-orange-500"
                          : "text-red-500"
                  }
                >
                  {permission.status}
                </span>
              </div>

              <p
                className="
                    text-sm
                    text-muted-foreground
                  "
              >
                Limit: {permission.limit} USDC
              </p>

              <p
                className="
                    text-sm
                    text-muted-foreground
                  "
              >
                Duration: {permission.duration} Days
              </p>

              <div
                className="
                    mt-4 flex gap-2
                  "
              >
                {permission.status === "active" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Disable this permission permanently?",
                      );

                      if (!confirmed) {
                        return;
                      }

                      onToggle(permission.id);

                      toast.success("Permission disabled");
                    }}
                  >
                    Disable
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    Disabled
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this permission?",
                    );

                    if (!confirmed) return;

                    const deletePromise = new Promise<{ name: string }>(
                      (resolve) => {
                        setTimeout(() => {
                          resolve({ name: "Permission" });
                        }, 1500);
                      },
                    );

                    toast.promise(deletePromise, {
                      loading: "Loading...",
                      success: (data: { name: string }) => {
                        return `${data.name} successfully deleted.`;
                      },
                      error: "Please try again!",
                    });

                    onDelete(permission.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
