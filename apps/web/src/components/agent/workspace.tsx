"use client"

import { AgentHeader } from "./header";
import { AgentStatusCard } from "./status-card";
import { TopAgentCard } from "./top-agent-card";
import { AgentControlsCard } from "./controls-card";
import { ActivityFeedCard } from "./feed-card";
import { ResearchGoalCard } from "./research-goal-card";
import { PermissionDashboard } from "@/components/permissions/dashboard";

import { useAgent } from "@/providers/agent";

export function AgentWorkspace() {

  const {
  permissions,
  activities,
  createPermission,
  togglePermission,
  deletePermission,
} = useAgent();

  return (
    <div className="space-y-6 p-6">
      <AgentHeader />

      <div
        className="
          grid gap-6
          lg:grid-cols-2
        "
      >
        <AgentStatusCard />
        <TopAgentCard />
      </div>

      <AgentControlsCard
        onCreatePermission={
          createPermission
        }
      />

      <PermissionDashboard
        permissions={permissions}
        onToggle={togglePermission}
        onDelete={deletePermission}
      />

      <ActivityFeedCard
        activities={activities}
      />

      <ResearchGoalCard />
    </div>
  );
}