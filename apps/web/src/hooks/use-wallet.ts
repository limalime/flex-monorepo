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

    connect: async () => {
      if (!injectedConnector) {
        console.error(
          "Injected connector not found"
        );

        return;
      }

      try {
        await connect({
          connector: injectedConnector,
        });
      } catch (error) {
        console.error(
          "Wallet connection failed",
          error
        );
      }
    },

    disconnect,
  };
}