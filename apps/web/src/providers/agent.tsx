"use client";

import {
  createContext,
  useContext,
} from "react";

import {
  usePermissions,
} from "@/hooks/use-permissions";

const AgentContext =
  createContext<
    ReturnType<
      typeof usePermissions
    > | null
  >(null);

type Props = {
  children: React.ReactNode;
};

export function AgentProvider({
  children,
}: Props) {
  const value =
    usePermissions();

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