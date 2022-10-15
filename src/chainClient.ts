import "@polkadot/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { WalletClient, BalanceInfo } from "./walletClient";


import { BN, formatBalance } from '@polkadot/util';

class PolkadotClient implements WalletClient {
  walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  public async getBalance(): Promise<BalanceInfo> {
    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({ provider: wsProvider });

    let {
      data: { free: previousFree },
      nonce: previousNonce,
    } = await api.query.system.account(this.walletAddress);




    const chainDecimals = api.registry.chainDecimals[0];
    formatBalance.setDefaults({ unit: 'DOT' });
    const defaults = formatBalance.getDefaults();
    const formattedBalance = formatBalance(previousFree, { withSiFull: true, decimals: chainDecimals });


    console.log('in chainClient; ', formattedBalance);


    return {
      walletAddress: this.walletAddress,
      balance: previousFree.toString(),
      formattedBalance: formattedBalance,
      nonce: previousNonce.toNumber()
    };
  }
}

export { PolkadotClient };



//======================


// import { ApiPromise, WsProvider } from '@polkadot/api';
// import { BN, formatBalance } from '@polkadot/util';

// const formatAccountBalance = async () => {
    // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    // const api = await ApiPromise.create({ provider: wsProvider });
    // const { nonce, data: balance } = await api.query.system.account('14RYaXRSqb9rPqMaAVp1UZW2czQ6dMNGMbvukwfifi6m8ZgZ');
    // const chainDecimals = api.registry.chainDecimals[0];
    // console.log('raw balance:', balance.free.toNumber())
    // formatBalance.setDefaults({ unit: 'DOT' });
    // const defaults = formatBalance.getDefaults();
    // const free = formatBalance(balance.free, { withSiFull: true }, chainDecimals);
    // const reserved = formatBalance(balance.reserved, { withSiFull: true }, chainDecimals);
    // console.log('Formatted balance:', `{"free": "${free}", "unit": "${defaults.unit}", "reserved": "${reserved}", "nonce": "${nonce.toHuman()}"}`);
// }


//=====================




// import "@polkadot/api-augment";
// import { ApiPromise, WsProvider } from "@polkadot/api";
// import { WalletClient, BalanceInfo } from "./walletClient";

// class PolkadotClient implements WalletClient {
//   walletAddress: string;

//   constructor(walletAddress: string) {
//     this.walletAddress = walletAddress;
//   }

//   public async getBalance(): Promise<string> {
//     const wsProvider = new WsProvider("wss://rpc.polkadot.io");
//     const api = await ApiPromise.create({ provider: wsProvider });

//     let {
//       data: { free: previousFree },
//       nonce: previousNonce,
//     } = await api.query.system.account(this.walletAddress);

//     return `${this.walletAddress} has a balance of ${previousFree.toString()}, nonce ${previousNonce.toNumber()}`;
//   }
// }

// export { PolkadotClient };