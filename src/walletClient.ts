import { PolkadotClient } from './chainClient';

interface WalletClient {
  getBalance(): Promise<string>
}

class Wallet implements WalletClient {
  ChainClient: WalletClient;

  constructor(ChainClient: WalletClient) {
    this.ChainClient = ChainClient;
  }

  public async getBalance(): Promise<string> {
    const balance = await this.ChainClient.getBalance();
    return balance;
  }
}

export { WalletClient, Wallet };