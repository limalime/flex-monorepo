"use client";

import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
} from "wagmi";

export function useWallet() {
  const {
    address,
    isConnected,
    connector,
  } = useAccount();

  const {
    connect,
    connectors,
    isPending,
    error: connectError,
  } = useConnect();

  const { disconnect } =
    useDisconnect();

  const chainId = useChainId();

  const injectedConnector =
    connectors.find(
      (connector) =>
        connector.id === "injected"
    );

  return {
    address,
    isConnected,
    isPending,
    chainId,
    connector,
    error: connectError ?? undefined,

    connect: async () => {
      if (!injectedConnector) {
        throw new Error(
          "No injected wallet connector found. Please install a browser wallet."
        );
      }

      await connect({
        connector: injectedConnector,
      });
    },

    disconnect,
  };
}