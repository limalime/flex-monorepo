import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("env config", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("uses default appName when NEXT_PUBLIC_APP_NAME is not set", async () => {
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = "test-wc-id";
    process.env.NEXT_PUBLIC_OPENROUTER_API_URL = "https://test.api";
    delete process.env.NEXT_PUBLIC_APP_NAME;

    const { env } = await import("../env");
    expect(env.appName).toBe("Flex");
  });

  it("uses custom appName when NEXT_PUBLIC_APP_NAME is set", async () => {
    process.env.NEXT_PUBLIC_APP_NAME = "CustomApp";
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = "test-wc-id";
    process.env.NEXT_PUBLIC_OPENROUTER_API_URL = "https://test.api";

    const { env } = await import("../env");
    expect(env.appName).toBe("CustomApp");
  });

  it("uses default chainId when NEXT_PUBLIC_CHAIN_ID is not set", async () => {
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = "test-wc-id";
    process.env.NEXT_PUBLIC_OPENROUTER_API_URL = "https://test.api";
    delete process.env.NEXT_PUBLIC_CHAIN_ID;

    const { env } = await import("../env");
    expect(env.chainId).toBe(84532);
  });

  it("uses default rpcUrl when NEXT_PUBLIC_RPC_URL is not set", async () => {
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = "test-wc-id";
    process.env.NEXT_PUBLIC_OPENROUTER_API_URL = "https://test.api";
    delete process.env.NEXT_PUBLIC_RPC_URL;

    const { env } = await import("../env");
    expect(env.rpcUrl).toBe("https://sepolia.base.org/");
  });

  it("throws when NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is missing", async () => {
    delete process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
    process.env.NEXT_PUBLIC_OPENROUTER_API_URL = "https://test.api";

    await expect(import("../env")).rejects.toThrow(
      "Missing environment variable: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID"
    );
  });

  it("throws when NEXT_PUBLIC_OPENROUTER_API_URL is missing", async () => {
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = "test-wc-id";
    delete process.env.NEXT_PUBLIC_OPENROUTER_API_URL;

    await expect(import("../env")).rejects.toThrow(
      "Missing environment variable: NEXT_PUBLIC_OPENROUTER_API_URL"
    );
  });
});
