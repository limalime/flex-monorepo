"use client";

import {
  createContext,
  useContext,
} from "react";

import {
  usePermissions,
} from "@/hooks/use-permissions";

import {
  useDelegation,
} from "@/hooks/use-delegation";

type AgentContextValue =
  ReturnType<
    typeof usePermissions
  > & {
    delegations:
      ReturnType<
        typeof useDelegation
      >["delegations"];

    createDelegation:
      ReturnType<
        typeof useDelegation
      >["createDelegation"];
  };

const AgentContext =
  createContext<
    AgentContextValue | null
  >(null);

type Props = {
  children: React.ReactNode;
};

export function AgentProvider({
  children,
}: Props) {
  const permissions =
    usePermissions();

  const {
    delegations,
    createDelegation,
  } = useDelegation();

  const value: AgentContextValue = {
    ...permissions,

    delegations,

    createDelegation,
  };

  return (
    <AgentContext.Provider
      value={value}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context =
    useContext(
      AgentContext,
    );

  if (!context) {
    throw new Error(
      "useAgent must be used inside AgentProvider",
    );
  }

  return context;
}