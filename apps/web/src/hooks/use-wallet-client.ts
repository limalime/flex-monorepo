"use client";

import { useWalletClient } from "wagmi";

export function useFlexWalletClient() {
  const { data, isLoading } =
    useWalletClient();

  return {
    walletClient: data,
    isLoading,
  };
}