// in readMe 'integration tests can be made to test client connection'
import { PolkadotClient } from "../clients/chainClient";

describe("polkadot client tests", () => {

  test("should return formatted balance", () => {
    const validBalance = '12345678901';
    const formattedBalance = PolkadotClient.formatBalanceString(validBalance);

    expect(formattedBalance).toBe('1.2345678901');
  })

  test("should return formatted balance if balance is less than 1 Dot", () => {
    const invalidBalance = '1';
    const formattedBalance = PolkadotClient.formatBalanceString(invalidBalance);

    expect(formattedBalance).toBe('.0000000001');
  })

  test("should return 0 if there is no balance", () => {
    const noBalance = '0';
    const formattedBalance = PolkadotClient.formatBalanceString(noBalance);

    expect(formattedBalance).toBe('0');
  })

  test("should return 0 if passed an empty string", () => {
    const emptyStr = '';
    const formattedBalance = PolkadotClient.formatBalanceString(emptyStr);

    expect(formattedBalance).toBe('0');
  })
})