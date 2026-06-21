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

  const [
    error,
    setError,
  ] = useState<string>();

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
      const msg =
        "Wallet client not found. Connect your wallet first.";
      setError(msg);
      throw new Error(msg);
    }

    try {
      setError(undefined);
      setIsLoading(true);

      const account =
        await createSmartAccount(
          walletClient,
        );

      const smartAddress =
        await account.getAddress();

      setAddress(
        smartAddress,
      );

      localStorage.setItem(
        STORAGE_KEY,
        smartAddress,
      );

      return smartAddress;
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Smart account initialization failed";
      setError(msg);
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
    error,
    init,
    clear,
  };
}