export declare class BlockchainService {
    BlockSystem: {
        litecoin: any;
        bitcoin: any;
    };
    coinlist: Array<any>;
    constructor();
    createAddress(username: string): Promise<{
        addressLitecoin: any;
        addressBitcoin: any;
    }>;
    getAdresses(username: string): Promise<any[]>;
    getPrices(): Promise<any[]>;
    archiveAddresses(username: string): Promise<boolean>;
    getAssets(): Promise<{
        assets: any;
        pairs: any[];
    }>;
    getAssetsBySlag(slag: any): Promise<any>;
    getNews(): Promise<{
        top: import("crypto-news-api").IArticle[];
        latest: import("crypto-news-api").IArticle[];
    }>;
    withdraw(username: string, address: string, amount: string, toAddress: string): Promise<any[]>;
}
