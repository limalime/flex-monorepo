"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useWallet,
} from "@/hooks/use-wallet";

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

const ACTIVITY_STORAGE_KEY =
  "flex-activities";
const STORAGE_KEY =
  "flex-permissions";

export function usePermissions() {
  const {
    address,
  } = useWallet();

  const [
    permissions,
    setPermissions,
  ] = useState<
    Permission[]
  >([]);

  const [
    activities,
    setActivities,
  ] = useState<
    PermissionActivity[]
  >([]);

  useEffect(() => {
  const stored =
    localStorage.getItem(
      ACTIVITY_STORAGE_KEY,
    );

  if (!stored) {
    return;
  }

  try {
    setActivities(
      JSON.parse(stored),
    );
  } catch {
    localStorage.removeItem(
      ACTIVITY_STORAGE_KEY,
    );
  }
}, []);
  
  useEffect(() => {
    const stored =
      localStorage.getItem(
        STORAGE_KEY,
      );

    if (!stored) {
      return;
    }

    try {
      setPermissions(
        JSON.parse(stored),
      );
    } catch {
      localStorage.removeItem(
        STORAGE_KEY,
      );
    }
  }, []);

  useEffect(() => {
  localStorage.setItem(
    ACTIVITY_STORAGE_KEY,
    JSON.stringify(
      activities,
    ),
  );
}, [activities]);
  
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        permissions,
      ),
    );
  }, [permissions]);

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
          id:
            crypto.randomUUID(),

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
            crypto.randomUUID(),

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
            crypto.randomUUID(),

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
              crypto.randomUUID(),

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