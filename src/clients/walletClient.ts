
interface ChainClient {
  getBalance(walletAddress: string): Promise<BalanceInfo>
}

interface BalanceInfo {
  walletAddress: string,
  balance: string,
  formattedBalance: string,
  nonce?: number
}

// enum for type of client

class Wallet implements ChainClient {
  ChainClient: ChainClient;
  walletAddress: string;

  constructor(ChainClient: ChainClient, walletAddress: string) {
    this.ChainClient = ChainClient;
    this.walletAddress = walletAddress;
  }

  public async getBalance(): Promise<BalanceInfo> {
    const balance = await this.ChainClient.getBalance(this.walletAddress);
    return balance;
  }
}

export { ChainClient, BalanceInfo, Wallet };
