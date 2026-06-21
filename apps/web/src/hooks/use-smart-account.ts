"use client";

import { useState } from "react";

import { createSmartAccount } from "@/lib/smart-account";
import { useFlexWalletClient } from "@/hooks/use-wallet-client";
import { useLocalStorage } from "@/hooks/use-local-storage";

export function useSmartAccount() {
  const {
    walletClient,
  } = useFlexWalletClient();

  const [
    address,
    setAddress,
  ] = useLocalStorage<string | undefined>(
    "flex-smart-account",
    undefined,
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  async function init() {
    if (!walletClient) {
      console.error(
        "Wallet client not found",
      );

      return;
    }

    try {
      setIsLoading(true);

      const account =
        await createSmartAccount(
          walletClient,
        );

      const smartAddress =
        await account.getAddress();

      console.log(
        "Smart Account:",
        smartAddress,
      );

      setAddress(smartAddress);

      return smartAddress;
    } catch (error) {
      console.error(
        "Smart account init failed:",
        error,
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function clear() {
    setAddress(undefined);
  }

  return {
    address,
    isLoading,
    init,
    clear,
  };
}