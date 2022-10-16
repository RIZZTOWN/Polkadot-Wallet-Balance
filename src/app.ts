import { PolkadotClient } from "./clients/polkadotClient";
import { Wallet } from "./clients/walletClient";

const defaultWalletAddress = "1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7";

const app = async () => {
  // Provided default address is used but can be overwritten with enviroment variables
  const walletAddress: string =
    process.env.WALLET_ADDRESS || defaultWalletAddress;
  const client = await PolkadotClient.createClient();
  const wallet = new Wallet(client, walletAddress);

  try {
    const balance = await wallet.getBalance();
    console.log(
      `${balance.walletAddress} has a balance of ${balance.balance} ${balance.unit}`
    );
  } catch (error) {
    console.error("Issue retrieving balance", error);
  }
};
app();
