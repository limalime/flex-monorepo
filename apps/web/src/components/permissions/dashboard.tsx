import { PermissionList } from "./list";

import { PermissionStatusCard } from "./status-card";

import type { Permission } from "@/hooks/use-permissions";

import { DelegationCard } from "./delegation-card";

type Props = {
  permissions: Permission[];
  onToggle: ( id: string ) => void;
  onDelete: ( id: string ) => void;
};

export function PermissionDashboard({
  permissions,
  onToggle,
  onDelete,
}: Props) {
  return (
  <div className="space-y-6">
    <div className="grid gap-6 lg:grid-cols-2">
      <PermissionStatusCard
        permissions={permissions}
      />

      <DelegationCard
        permissions={permissions}
        />

      <PermissionList
        permissions={permissions}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </div>
  </div>
  );
}