"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  SmartAccount,
} from "@metamask/smart-accounts-kit";

import {
  createSmartAccount,
} from "@/lib/smart-account";

import {
  useFlexWalletClient,
} from "@/hooks/use-wallet-client";

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
    smartAccount,
    setSmartAccount,
  ] =
    useState<SmartAccount>();

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
      throw new Error(
        "Wallet client not found",
      );
    }

    try {
      setIsLoading(true);

      const account =
        await createSmartAccount(
          walletClient,
        );

      const smartAddress =
        await account.getAddress();

      setSmartAccount(
        account,
      );

      setAddress(
        smartAddress,
      );

      localStorage.setItem(
        STORAGE_KEY,
        smartAddress,
      );

      return account;
    } finally {
      setIsLoading(false);
    }
  }

  function clear() {
    setAddress(undefined);

    setSmartAccount(
      undefined,
    );

    localStorage.removeItem(
      STORAGE_KEY,
    );
  }

  return {
    address,

    smartAccount,

    walletClient,

    isLoading,

    init,

    clear,
  };
}