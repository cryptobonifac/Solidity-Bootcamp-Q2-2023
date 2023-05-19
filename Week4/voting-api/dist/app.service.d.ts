import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    private readonly provider;
    private readonly contract;
    constructor(configService: ConfigService);
    getLastBlock(): Promise<ethers.providers.Block>;
    getAddress(): string;
    getTotalSupply(): Promise<any>;
    getBalanceOf(address: string): Promise<any>;
    getTransactionReceipt(hash: string): Promise<ethers.providers.TransactionReceipt>;
    getReceipt(tx: ethers.providers.TransactionResponse): Promise<ethers.providers.TransactionReceipt>;
    requestTokens(address: string): Promise<any>;
}
