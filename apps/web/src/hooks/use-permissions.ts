"use client";

import {
  useWallet,
} from "@/hooks/use-wallet";

import { useLocalStorage } from "@/hooks/use-local-storage";

import { generateId } from "@/lib/utils";

export type Permission = {
  id: string;

  owner: string;

  type: string;

  limit: number;

  duration: number;

  status:
    | "active"
    | "disabled"
    | "expired"
    | "revoked";

  createdAt: number;
  
  permissionContext?: string;

  delegationManager?: string;
};

export type PermissionActivity = {
  id: string;
  owner: string;

  action:
    | "created"
    | "disabled"
    | "deleted";

  permissionType: string;

  createdAt: number;
};

export function usePermissions() {
  const {
    address,
  } = useWallet();

  const [
    permissions,
    setPermissions,
  ] = useLocalStorage<Permission[]>(
    "flex-permissions",
    [],
  );

  const [
    activities,
    setActivities,
  ] = useLocalStorage<PermissionActivity[]>(
    "flex-activities",
    [],
  );

  function createPermission(
    permission: {
      type: string;
      limit: number;
      duration: number;
    },
  ) {
    if (!address) {
      return;
    }

    setActivities(
      (previous) => [
        {
          id: generateId(),

          owner: address,

          action:
            "created",

          permissionType:
            permission.type,

          createdAt:
            Date.now(),
        },

        ...previous,
      ],
    );

    setPermissions(
      (previous) => [
        ...previous,
        {
          id:
            generateId(),

          owner:
            address,

          type:
            permission.type,

          limit:
            permission.limit,

          duration:
            permission.duration,

          status:
            "active",

          createdAt:
            Date.now(),
        },
      ],
    );
  }

  function togglePermission(
    id: string,
  ) {
    const target =
      permissions.find(
        (permission) =>
          permission.id === id,
      );

    if (!target) {
      return;
    }

    setActivities(
      (previous) => [
        {
          id:
            generateId(),

          owner: address,

          action:
            "disabled",

          permissionType:
            target.type,

          createdAt:
            Date.now(),
        },

        ...previous,
      ],
    );

    setPermissions(
      (previous) =>
        previous.map(
          (permission) =>
            permission.id === id
              ? {
                  ...permission,

                  status:
                    "disabled",
                }
              : permission,
        ),
    );
  }

  function deletePermission(
    id: string,
  ) {
    const target =
      permissions.find(
        (permission) =>
          permission.id === id,
      );

    if (target) {
      setActivities(
        (previous) => [
          {
            id:
              generateId(),

            owner: address,

            action:
              "deleted",

            permissionType:
              target.type,

            createdAt:
              Date.now(),
          },

          ...previous,
        ],
      );
    }

    setPermissions(
      (previous) =>
        previous.filter(
          (permission) =>
            permission.id !==
            id,
        ),
    );
  }

  const visiblePermissions =
    permissions.filter(
      (permission) =>
        permission.owner ===
        address,
    );

  return {
    permissions:
      visiblePermissions,

    activities,

    createPermission,

    togglePermission,

    deletePermission,
  };
}