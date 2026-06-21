"use client";

import { useState } from "react";

import { generateId } from "@/lib/utils";

export type Delegation = {
  id: string;

  limit: number;

  createdAt: number;

  status:
    | "active"
    | "revoked";
};

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