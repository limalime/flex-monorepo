import {
  erc7715RequestExecutionPermissionsAction,
  type MetaMaskExtensionClient,
} from "@metamask/smart-accounts-kit";

export async function requestResearchPermission(
  client: MetaMaskExtensionClient,
  recipient: `0x${string}`,
) {
  const permissions =
    await erc7715RequestExecutionPermissionsAction(
      client,
      [
        {
          chainId: 84532,

          to: recipient,

          permission: {
            type:
              "native-token-allowance",

            data: {
              allowanceAmount:
                10_000_000_000_000_000n,

              justification:
                "Flex Premium Research",
            },
          },
        },
      ],
    );

  return permissions[0];
}