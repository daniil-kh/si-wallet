import { Injectable, Inject, Logger } from '@nestjs/common';
import * as BlockIo from 'block_io';
import Axios from 'axios';
import CryptoNewsAPI from 'crypto-news-api'
import * as dotenv from 'dotenv';
dotenv.config()
const newsAPI = new CryptoNewsAPI(process.env.NEWSAPIKEY);


@Injectable()
export class BlockchainService {

  BlockSystem = {
    ["litecoin"]: new BlockIo(process.env.BLOCKIO_BTC, process.env.BLOCKIO_PIN),
    ["bitcoin"]: new BlockIo(process.env.BLOCKIO_LTC, process.env.BLOCKIO_PIN)
  }
  coinlist: Array<any> = null;
  constructor() {

  }

  async createAddress(username: string) {
    let addressLitecoin = await this.BlockSystem.litecoin.get_new_address({ label: username }).catch((err: Error) => { throw err });
    let addressBitcoin = await this.BlockSystem.bitcoin.get_new_address({ label: username }).catch((err: Error) => { throw err });
    return {
      addressLitecoin, addressBitcoin
    };
  }

  async getAdresses(username: string) {
    let BTC = await this.BlockSystem.bitcoin.get_address_balance({ label: username }).catch((err: Error) => { throw err });
    let LTC = await this.BlockSystem.litecoin.get_address_balance({ label: username }).catch((err: Error) => { throw err });
    let BTCINFO = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets/bitcoin/metrics`,
      headers: { "x-messari-api-key": process.env.MESSARIAPIKEY },
    }).catch((err: Error) => {
      throw err
    });
    let LTCINFO = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets/litecoin/metrics`,
      headers: { "x-messari-api-key": process.env.MESSARIAPIKEY },
    }).catch((err: Error) => {
      throw err
    });
    return [{
      ...BTC?.data,
      ...BTCINFO.data.data.market_data,
      main_data: await this.getAssetsBySlag('bitcoin').catch((err: Error) => { throw err }),
      totalBalance: parseFloat(BTC.data.available_balance) + parseFloat(LTC.data.available_balance)
    }, {
      ...LTC?.data,
      ...LTCINFO.data.data.market_data,
      main_data: await this.getAssetsBySlag('litecoin').catch((err: Error) => { throw err; }),
      totalBalance: parseFloat(BTC.data.available_balance) + parseFloat(LTC.data.available_balance)
    }];
  }

  async getPrices() {
    let BTC = await this.BlockSystem.bitcoin.get_current_price().catch((err: Error) => { throw err });
    let LTC = await this.BlockSystem.litecoin.get_current_price().catch((err: Error) => { throw err });
    return [BTC?.data, LTC?.data];
  }

  async archiveAddresses(username: string) {
    await this.BlockSystem.bitcoin.archive_addresses({ label: username }).catch((err: Error) => { throw err })
    await this.BlockSystem.litecoin.archive_addresses({ label: username }).catch((err: Error) => { throw err })
    return true;
  }

  async getAssets() {
    let result = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours,metrics/market_data/percent_change_eth_last_24_hours,metrics/market_data/percent_change_btc_last_24_hours,metrics/market_data/price_btc,metrics/market_data/price_eth`,
      headers: { "x-messari-api-key": process.env.MESSARIAPIKEY },
    }).catch((err: Error) => {
      throw err
    })
    //Logger.log(result.data.data)
    let pairs = [];
    let counter = 0;
    await Promise.all(result.data.data.map(element => {
      const selectArray = ["btc", "eth", "usd"]
      for(let i =0; i < 3; ++i){
        if(selectArray[i].toUpperCase() === element.symbol) continue;
        pairs.push({
          id: counter,
          pair: element.symbol + '/' + selectArray[i].toUpperCase(),
          percent_change: element.metrics.market_data[`percent_change_${selectArray[i]}_last_24_hours`],
          price: element.metrics.market_data[`price_${selectArray[i]}`],
          price_usd: element.metrics.market_data[`price_usd`]
        })
        ++counter;
      }
    }))
    return {
      assets: result ? result.data : null, 
      pairs: pairs
    }
  }

  async getAssetsBySlag(slag) {
    let result = await Axios({
      method: 'GET',
      url: `https://data.messari.io/api/v1/assets/${slag}/metrics`,
      headers: { "x-messari-api-key": process.env.MESSARIAPIKEY }
    }).catch((err: Error) => {
      throw err
    })
    return result ? result.data : null
  }

  async getNews() {
    return {
      top: await newsAPI.getTopNews().catch((err: Error) => { throw err }),
      latest: await newsAPI.getLatestNews().catch((err: Error) => { throw err })
    }
  }

  async withdraw(username: string, address: string, amount: string, toAddress: string) {
    Logger.log(username, "USERNAME")
    let check = await this.BlockSystem[address].is_valid_address({ address: toAddress.toString() }).catch((err: Error) => { throw err; });
    if (check.data.is_valid == true && check.data.address == toAddress) {
      let fromAddress = await this.BlockSystem[address].get_address_by_label({ label: username }).catch((err: Error) => { throw err })
      Logger.log(fromAddress, "fromAddress");
      if (parseFloat(fromAddress.data.available_balance) < parseFloat(amount)) throw Error("You cannot withdraw more than you have, sorry)")
      await this.BlockSystem[address].withdraw_from_addresses({ amounts: amount, from_addresses: fromAddress.data.address, to_addresses: toAddress }).catch((err: Error) => { throw err })
      return await this.getAdresses(username).catch((err: Error) => { throw err })
    }
    throw Error(`SourceAddress need to be part of ${address.toUpperCase()} network`);
  }

}
