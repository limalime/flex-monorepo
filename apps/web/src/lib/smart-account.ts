import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

import type {
  WalletClient,
} from "viem";

import { publicClient } from "@/lib/clients/public";

export async function createSmartAccount(
  walletClient: WalletClient,
) {
  const owner =
    walletClient.account?.address;

  if (!owner) {
    throw new Error(
      "Wallet address not found",
    );
  }

  const smartAccount =
    await toMetaMaskSmartAccount({
      client: publicClient,

      implementation:
        Implementation.Hybrid,

      signer: {
        walletClient,
      },

      deployParams: [
        owner,
        [],
        [],
        [],
      ],

      deploySalt:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
    });

  return smartAccount;
}