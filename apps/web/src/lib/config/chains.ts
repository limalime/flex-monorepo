import { baseSepolia } from "wagmi/chains";

export const CHAIN = baseSepolia;

export const SUPPORTED_CHAINS = [
  CHAIN,
] as const;

export const APP_CHAIN_ID = CHAIN.id;

export const APP_CHAIN_NAME = CHAIN.name;

export const SUPPORTED_CHAIN_ID =
  baseSepolia.id;