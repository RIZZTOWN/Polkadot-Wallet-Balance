import { BalanceInfo, ChainClient } from "../../clients/walletClient";

class ChainClientMock implements ChainClient {
  balanceInfo: BalanceInfo;

  constructor(balanceInfo: BalanceInfo) {
    this.balanceInfo = balanceInfo;
  }

  public async getBalance(walletAddress: string): Promise<BalanceInfo> {
    let balanceInfo: BalanceInfo = {
      walletAddress: walletAddress,
      balance: "0",
      unit: "MOCK DOT",
    };
    if (walletAddress === "") {
      throw new SyntaxError("invalid wallet address");
    } else {
      balanceInfo = this.balanceInfo;
    }
    return balanceInfo;
  }

  public setBalanceInfo(balanceInfo: BalanceInfo) {
    this.balanceInfo = balanceInfo;
  }
}

export { ChainClientMock };
