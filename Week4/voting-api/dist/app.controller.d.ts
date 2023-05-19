import { AppService } from './app.service';
import { RequestTokensDto } from './dtos/RequestTokens.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    checkHealth(): string;
    getLastBlock(): Promise<import("@ethersproject/abstract-provider").Block>;
    getAddress(): string;
    getTotalSupply(): Promise<any>;
    getBalanceOf(address: string): Promise<any>;
    getTransactionReceipt(hash: string): Promise<import("@ethersproject/abstract-provider").TransactionReceipt>;
    requestTokens(body: RequestTokensDto): Promise<any>;
}
