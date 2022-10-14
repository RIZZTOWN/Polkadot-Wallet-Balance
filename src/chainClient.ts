import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { WalletClient } from "./walletClient";

class PolkadotClient implements WalletClient {
  walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  public async getBalance(): Promise<string> {
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({ provider: wsProvider });

    let {
      data: { free: previousFree },
      nonce: previousNonce,
    } = await api.query.system.account(this.walletAddress);

    return `${this.walletAddress} has a balance of ${previousFree.toString()}, nonce ${previousNonce.toNumber()}`;
  }
}

export { PolkadotClient };