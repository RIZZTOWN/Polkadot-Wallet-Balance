import { BalanceInfo, ChainClient } from "../../clients/walletClient";
import * as fs from 'fs';

class ChainClientMock implements ChainClient {
  balanceInfo: BalanceInfo;

  constructor(balanceInfo: BalanceInfo) {
    this.balanceInfo = balanceInfo;
  }

  public async getBalance(walletAddress: string): Promise<BalanceInfo> {
    let balanceInfo: BalanceInfo = {
      walletAddress: walletAddress,
      balance: '0',
      formattedBalance: '0',
      nonce: -1,
    }
    if (walletAddress === '') {
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