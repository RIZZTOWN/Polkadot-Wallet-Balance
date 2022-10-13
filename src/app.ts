import { ApiPromise, WsProvider } from "@polkadot/api";
import { Codec } from "@polkadot/types-codec/types";

const walletAddress: string = "1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7";

async function main() {
  const wsProvider = new WsProvider("wss://rpc.polkadot.io");
  const api = await ApiPromise.create({ provider: wsProvider });

  let { data: { free: previousFree }, nonce: previousNonce }: any = await api.query.system.account(walletAddress);

  console.log(`${walletAddress} has a balance of ${previousFree}, nonce ${previousNonce}`);
}

main().catch(console.error);