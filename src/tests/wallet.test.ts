import { ChainClientMock } from "./mocks/chainClientMock";
import { ChainClient, BalanceInfo, Wallet } from "../clients/walletClient";
import { error } from "console";

describe("wallet unit tests", () => {

  test("should return balance info", async () => {
    const balanceInfo = require("./data/balanceInfo_01.json");
    const client = new ChainClientMock(balanceInfo);
    const wallet = new Wallet(client, client.balanceInfo.walletAddress);

    const balance = await wallet.getBalance();
    expect(balance).toBeDefined();
    expect(balance.balance).toBe(client.balanceInfo.balance);
    expect(balance.formattedBalance).toBe(client.balanceInfo.formattedBalance);
    expect(balance.nonce).toBe(client.balanceInfo.nonce);
  });

  test("should fail with invalid wallet address", async () => {
    const balanceInfo = require("./data/invalidBalanceInfo_01.json");
    const client = new ChainClientMock(balanceInfo);
    const wallet = new Wallet(client, client.balanceInfo.walletAddress);

    await expect(wallet.getBalance()).rejects.toThrowError(SyntaxError);

  });
});
