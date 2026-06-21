"use client";

import {
  Activity,
} from "lucide-react";

import {
  Card,
} from "@/components/ui/card";

import { CardHeader } from "@/components/shared/card-header";

import type {
  PermissionActivity,
} from "@/hooks/use-permissions";

type Props = {
  activities:
    PermissionActivity[];
};

function formatAction(
  action:
    PermissionActivity["action"],
) {
  switch (action) {
    case "created":
      return "Permission Created";

    case "disabled":
      return "Permission Disabled";

    case "deleted":
      return "Permission Deleted";

    default:
      return action;
  }
}

export function ActivityFeedCard({
  activities,
}: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <CardHeader icon={Activity} title="Activity Feed" />

      {activities.length === 0 ? (
        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          No activity yet.
        </p>
      ) : (
        <div className="space-y-3">
          {activities.map(
            (activity) => (
              <div
                key={activity.id}
                className="
                  rounded-xl
                  border
                  p-3
                "
              >
                <p className="font-medium">
                  {formatAction(
                    activity.action,
                  )}
                </p>

                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >
                  {
                    activity.permissionType
                  }
                </p>
              </div>
            ),
          )}
        </div>
      )}
    </Card>
  );
}