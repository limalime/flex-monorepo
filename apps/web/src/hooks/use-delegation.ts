"use client";

import { useAgent } from "@/providers/agent";

export function useDelegation() {
  const {
    permissions,
  } = useAgent();

  const activePermission =
    permissions.find(
      (permission) =>
        permission.status ===
        "active",
    );

  return {
    delegated:
      Boolean(
        activePermission,
      ),

    permission:
      activePermission,
  };
}