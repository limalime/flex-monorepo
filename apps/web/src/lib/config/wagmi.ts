import {
  createConfig,
  createStorage,
  cookieStorage,
  http,
} from "wagmi";

import {
  injected
} from "wagmi/connectors";

import { CHAIN } from "./chains";
import { env } from "./env";

export const wagmiConfig = createConfig({
  ssr: true,

  storage: createStorage({
    storage: cookieStorage,
  }),

  chains: [CHAIN],

  connectors: [
    injected(),
  ],


  transports: {
    [CHAIN.id]: http(env.rpcUrl),
  },
});