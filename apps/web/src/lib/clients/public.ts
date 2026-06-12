import {
  createPublicClient,
  http,
} from "viem";

import { CHAIN } from "@/lib/config/chains";
import { env } from "@/lib/config/env";

export const publicClient =
  createPublicClient({
    chain: CHAIN,
    transport: http(env.rpcUrl),
  });