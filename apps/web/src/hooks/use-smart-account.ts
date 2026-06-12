"use client";

import { useState, useEffect } from "react";

import { createSmartAccount } from "@/lib/smart-account";
import { useFlexWalletClient } from "@/hooks/use-wallet-client";

const STORAGE_KEY =
  "flex-smart-account";

export function useSmartAccount() {
  const {
    walletClient,
  } = useFlexWalletClient();

  const [
    address,
    setAddress,
  ] = useState<string>();

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  useEffect(() => {
    const storedAddress =
      localStorage.getItem(
        STORAGE_KEY,
      );

    if (storedAddress) {
      setAddress(
        storedAddress,
      );
    }
  }, []);

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

      setAddress(
        smartAddress,
      );

      localStorage.setItem(
        STORAGE_KEY,
        smartAddress,
      );

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

    localStorage.removeItem(
      STORAGE_KEY,
    );
  }

  return {
    address,
    isLoading,
    init,
    clear,
  };
}