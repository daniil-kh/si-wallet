import { BlockchainService } from './blockchain.service';
import { Response } from 'express';
import { WithdrawDto } from './dto/withdraw.dto';
export declare class BlockchainController {
    private blockchainService;
    constructor(blockchainService: BlockchainService);
    getBalance(req: any, res: Response): Promise<void>;
    getPrices(res: Response): Promise<void>;
    getNews(res: Response): Promise<void>;
    getAssets(res: Response): Promise<void>;
    getAssetsBySlag(slag: string, res: Response): Promise<void>;
    withdraw(body: WithdrawDto, res: Response, req: any): Promise<void>;
}
