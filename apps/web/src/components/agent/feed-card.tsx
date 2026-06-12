"use client";

import {
  Activity,
} from "lucide-react";

import {
  Card,
} from "@/components/ui/card";

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
      <div className="mb-4 flex items-center gap-2">
        <Activity
          className="
            h-5 w-5
            text-indigo-500
          "
        />

        <h3 className="font-semibold">
          Activity Feed
        </h3>
      </div>

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