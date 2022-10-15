import { PolkadotClient } from "./clients/chainClient";
import { Wallet } from "./clients/walletClient";

const app = async () => {
  const walletAddress: string =
    "1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7";
  const client = await PolkadotClient.createClient();
  const wallet = new Wallet(client, walletAddress);

  try {
    const balance = await wallet.getBalance();
    console.log(
      `${balance.walletAddress} has a balance of ${
        balance.formattedBalance
      }, raw balance: ${balance.balance}, nonce: ${
        balance.nonce ? balance.nonce : "unavailable"
      }`
    );
  } catch (error) {
    console.error("Issue retrieving balance", error);
  }
};
app();
