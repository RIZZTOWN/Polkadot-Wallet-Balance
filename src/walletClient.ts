import { PolkadotClient } from './chainClient';

interface WalletClient {
  getBalance(): Promise<BalanceInfo>
}

interface BalanceInfo {
  walletAddress: string,
  balance: string,
  formattedBalance: string,
  nonce?: number
}

class Wallet implements WalletClient {
  ChainClient: WalletClient;

  constructor(ChainClient: WalletClient) {
    this.ChainClient = ChainClient;
  }

  public async getBalance(): Promise<BalanceInfo> {
    const balance = await this.ChainClient.getBalance();
    return balance;
  }
}

export { WalletClient, BalanceInfo, Wallet };