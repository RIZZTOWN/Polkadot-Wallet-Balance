import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ChainClient, BalanceInfo } from "./walletClient";

class PolkadotClient implements ChainClient {
  private static readonly PLANCK_TO_DOT = 10;
  private static readonly UNIT = "DOT";
  private static readonly POLKADOT_WS_URI = "wss://rpc.polkadot.io";
  client: ApiPromise;

  private constructor(client: ApiPromise) {
    this.client = client;
  }

  public static async createClient(): Promise<PolkadotClient> {
    const wsProvider = new WsProvider(PolkadotClient.POLKADOT_WS_URI);
    const client = await ApiPromise.create({ provider: wsProvider });
    return new PolkadotClient(client);
  }

  public async getBalance(walletAddress: string): Promise<BalanceInfo> {
    // Default result on error
    let balanceInfo = {
      walletAddress: walletAddress,
      balance: "0",
      unit: PolkadotClient.UNIT,
    };
    if (walletAddress === "") throw new SyntaxError("invalid wallet address");

    try {
      let {
        data: { free: balance },
      } = await this.client.query.system.account(walletAddress);

      const formattedBalance = PolkadotClient.formatBalanceString(
        balance.toString()
      );

      balanceInfo = {
        walletAddress: walletAddress,
        balance: formattedBalance,
        unit: PolkadotClient.UNIT,
      };
    } catch (error) {
      // Let caller handle error
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
