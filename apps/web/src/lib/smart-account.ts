import type { WalletClient } from "viem";

import {
  toMetaMaskSmartAccount,
  Implementation,
} from "@metamask/smart-accounts-kit";

import { publicClient } from "@/lib/clients/public";

export async function createSmartAccount(
  walletClient: WalletClient,
) {
  return toMetaMaskSmartAccount({
    client: publicClient,
    implementation: Implementation.Hybrid,
    signer: {
      type: "wallet",
      data: { walletClient },
    },
  });
}
