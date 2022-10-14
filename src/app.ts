import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";

export class AccountInfo {
  public async getBalance(): Promise<string> {
    const walletAddress: string =
      "1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7";
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({ provider: wsProvider });

    let {
      data: { free: previousFree },
      nonce: previousNonce,
    } = await api.query.system.account(walletAddress);

    console.log(
      `${walletAddress} has a balance of ${previousFree.toString()}, nonce ${previousNonce.toNumber()}`
    );
    return `${walletAddress} has a balance of ${previousFree.toString()}, nonce ${previousNonce.toNumber()}`;
  }
}

const getBal = async () => {
  const account: AccountInfo = new AccountInfo();
  const balance: string = await account.getBalance();
  console.log("outside");
  return balance;
};

getBal();