"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const common_1 = require("@nestjs/common");
const BlockIo = require("block_io");
const axios_1 = require("axios");
const crypto_news_api_1 = require("crypto-news-api");
const dotenv = require("dotenv");
dotenv.config();
const newsAPI = new crypto_news_api_1.default(process.env.NEWSAPIKEY);
let BlockchainService = class BlockchainService {
    constructor() {
        this.BlockSystem = {
            ["litecoin"]: new BlockIo(process.env.BLOCKIO_BTC, process.env.BLOCKIO_PIN),
            ["bitcoin"]: new BlockIo(process.env.BLOCKIO_LTC, process.env.BLOCKIO_PIN)
        };
        this.coinlist = null;
    }
    async createAddress(username) {
        let addressLitecoin = await this.BlockSystem.litecoin.get_new_address({ label: username }).catch((err) => { throw err; });
        let addressBitcoin = await this.BlockSystem.bitcoin.get_new_address({ label: username }).catch((err) => { throw err; });
        return {
            addressLitecoin, addressBitcoin
        };
    }
    async getAdresses(username) {
        let BTC = await this.BlockSystem.bitcoin.get_address_balance({ label: username }).catch((err) => { throw err; });
        let LTC = await this.BlockSystem.litecoin.get_address_balance({ label: username }).catch((err) => { throw err; });
        let BTCINFO = await axios_1.default({
            method: 'GET',
            url: `https://data.messari.io/api/v1/assets/bitcoin/metrics`,
            headers: { "x-messari-api-key": process.env.MESSARIAPIKEY },
        }).catch((err) => {
            throw err;
        });
        let LTCINFO = await axios_1.default({
            method: 'GET',
            url: `https://data.messari.io/api/v1/assets/litecoin/metrics`,
            headers: { "x-messari-api-key": process.env.MESSARIAPIKEY },
        }).catch((err) => {
            throw err;
        });
        return [Object.assign(Object.assign(Object.assign({}, BTC === null || BTC === void 0 ? void 0 : BTC.data), BTCINFO.data.data.market_data), { main_data: await this.getAssetsBySlag('bitcoin').catch((err) => { throw err; }), totalBalance: parseFloat(BTC.data.available_balance) + parseFloat(LTC.data.available_balance) }), Object.assign(Object.assign(Object.assign({}, LTC === null || LTC === void 0 ? void 0 : LTC.data), LTCINFO.data.data.market_data), { main_data: await this.getAssetsBySlag('litecoin').catch((err) => { throw err; }), totalBalance: parseFloat(BTC.data.available_balance) + parseFloat(LTC.data.available_balance) })];
    }
    async getPrices() {
        let BTC = await this.BlockSystem.bitcoin.get_current_price().catch((err) => { throw err; });
        let LTC = await this.BlockSystem.litecoin.get_current_price().catch((err) => { throw err; });
        return [BTC === null || BTC === void 0 ? void 0 : BTC.data, LTC === null || LTC === void 0 ? void 0 : LTC.data];
    }
    async archiveAddresses(username) {
        await this.BlockSystem.bitcoin.archive_addresses({ label: username }).catch((err) => { throw err; });
        await this.BlockSystem.litecoin.archive_addresses({ label: username }).catch((err) => { throw err; });
        return true;
    }
    async getAssets() {
        let result = await axios_1.default({
            method: 'GET',
            url: `https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours,metrics/market_data/percent_change_eth_last_24_hours,metrics/market_data/percent_change_btc_last_24_hours,metrics/market_data/price_btc,metrics/market_data/price_eth`,
            headers: { "x-messari-api-key": process.env.MESSARIAPIKEY },
        }).catch((err) => {
            throw err;
        });
        let pairs = [];
        let counter = 0;
        await Promise.all(result.data.data.map(element => {
            const selectArray = ["btc", "eth", "usd"];
            for (let i = 0; i < 3; ++i) {
                if (selectArray[i].toUpperCase() === element.symbol)
                    continue;
                pairs.push({
                    id: counter,
                    pair: element.symbol + '/' + selectArray[i].toUpperCase(),
                    percent_change: element.metrics.market_data[`percent_change_${selectArray[i]}_last_24_hours`],
                    price: element.metrics.market_data[`price_${selectArray[i]}`],
                    price_usd: element.metrics.market_data[`price_usd`]
                });
                ++counter;
            }
        }));
        return {
            assets: result ? result.data : null,
            pairs: pairs
        };
    }
    async getAssetsBySlag(slag) {
        let result = await axios_1.default({
            method: 'GET',
            url: `https://data.messari.io/api/v1/assets/${slag}/metrics`,
            headers: { "x-messari-api-key": process.env.MESSARIAPIKEY }
        }).catch((err) => {
            throw err;
        });
        return result ? result.data : null;
    }
    async getNews() {
        return {
            top: await newsAPI.getTopNews().catch((err) => { throw err; }),
            latest: await newsAPI.getLatestNews().catch((err) => { throw err; })
        };
    }
    async withdraw(username, address, amount, toAddress) {
        common_1.Logger.log(username, "USERNAME");
        let check = await this.BlockSystem[address].is_valid_address({ address: toAddress.toString() }).catch((err) => { throw err; });
        if (check.data.is_valid == true && check.data.address == toAddress) {
            let fromAddress = await this.BlockSystem[address].get_address_by_label({ label: username }).catch((err) => { throw err; });
            common_1.Logger.log(fromAddress, "fromAddress");
            if (parseFloat(fromAddress.data.available_balance) < parseFloat(amount))
                throw Error("You cannot withdraw more than you have, sorry)");
            await this.BlockSystem[address].withdraw_from_addresses({ amounts: amount, from_addresses: fromAddress.data.address, to_addresses: toAddress }).catch((err) => { throw err; });
            return await this.getAdresses(username).catch((err) => { throw err; });
        }
        throw Error(`SourceAddress need to be part of ${address.toUpperCase()} network`);
    }
};
BlockchainService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], BlockchainService);
exports.BlockchainService = BlockchainService;
//# sourceMappingURL=blockchain.service.js.map