import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ChainClient, BalanceInfo } from "./walletClient";

class PolkadotClient implements ChainClient {
  private static readonly PLANCK_TO_DOT = 10;
  client: ApiPromise;

  private constructor(client: ApiPromise) {
    this.client = client;
  }

  public static async createClient(): Promise<PolkadotClient> {
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const client = await ApiPromise.create({ provider: wsProvider });
    return new PolkadotClient(client);
  }

  public async getBalance(walletAddress: string): Promise<BalanceInfo> {
    let balanceInfo = {
      walletAddress: walletAddress,
      balance: "0",
      formattedBalance: "0",
      nonce: -1,
    };
    if (walletAddress === "") throw new SyntaxError("invalid wallet address");

    try {
      let {
        data: { free: previousBalanceU128 },
        nonce: previousNonce,
      } = await this.client.query.system.account(walletAddress);

      const formattedBalance = PolkadotClient.formatBalanceString(
        previousBalanceU128.toString()
      );

      balanceInfo = {
        walletAddress: walletAddress,
        balance: previousBalanceU128.toString(),
        formattedBalance: formattedBalance,
        nonce: previousNonce.toNumber(),
      }; // have unit and balance
    } catch (error) {
      // let caller handle error
      throw error;
    }

    return balanceInfo;
  }

  public static formatBalanceString(balance: string): string {
    if (balance === "0" || balance === "") return "0";
    let decimalPlace = balance.length - PolkadotClient.PLANCK_TO_DOT;

    while (decimalPlace < 0) {
      balance = "0" + balance;
      decimalPlace++;
    }

    let decimalBalance =
      balance.slice(0, decimalPlace) + "." + balance.slice(decimalPlace);
    return decimalBalance;
  }
}

export { PolkadotClient };
