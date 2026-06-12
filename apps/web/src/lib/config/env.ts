function getEnv(value: string | undefined, key: string) {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Flex",

  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 84532),

  rpcUrl: getEnv(process.env.NEXT_PUBLIC_RPC_URL, "NEXT_PUBLIC_RPC_URL"),

  walletConnectProjectId: getEnv(
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID",
  ),

  openRouterApiUrl: getEnv(
    process.env.NEXT_PUBLIC_OPENROUTER_API_URL,
    "NEXT_PUBLIC_OPENROUTER_API_URL",
  ),

  openRouterApiKey: getEnv(
    process.env.OPENROUTER_API_KEY,
    "OPENROUTER_API_KEY",
  ),
};
