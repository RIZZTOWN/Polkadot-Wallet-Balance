import { AccountInfo } from '../src/app';

describe('Should get wallet balance', () => {
  test('return is defined', async () => {
    const account = new AccountInfo();
    const balance = await account.getBalance();
    expect(balance).toBeDefined();
  });
});
