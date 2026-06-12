"use client";

import { useState } from "react";

export type Delegation = {
  id: string;

  limit: number;

  createdAt: number;

  status:
    | "active"
    | "revoked";
};

function generateId() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .slice(2)
  );
}

export function useDelegation() {
  const [
    delegations,
    setDelegations,
  ] = useState<
    Delegation[]
  >([]);

  async function createDelegation(
    limit: number,
  ) {
    const delegation: Delegation = {
      id: generateId(),

      limit,

      createdAt:
        Date.now(),

      status:
        "active",
    };

    setDelegations(
      (previous) => [
        delegation,
        ...previous,
      ],
    );

    return delegation;
  }

  return {
    delegations,

    createDelegation,
  };
}