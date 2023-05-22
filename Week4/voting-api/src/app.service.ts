import { Injectable } from '@nestjs/common';
import { ethers, Contract } from 'ethers';
import * as tokenJson from './assets/MyERC20Votes.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly provider: ethers.providers.BaseProvider;
  private readonly contract: Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ALCHEMY_API_KEY');
    this.provider = new ethers.providers.AlchemyProvider('maticmum', apiKey);
    this.contract = new Contract(
      this.getAddress(),
      tokenJson.abi,
      this.provider,
    );
  }

  async getLastBlock(): Promise<ethers.providers.Block> {
    return this.provider.getBlock('latest');
  }

  getAddress() {
    const tokenAddress = this.configService.get<string>('ERC20_TOKEN_ADDRESS'); // getting from .env
    return tokenAddress;
  }

  async getTotalSupply() {
    return this.contract.totalSupply();
  }

  async getBalanceOf(address: string) {
    return this.contract.getBalanceOf(address);
  }

  async getTransactionReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    return this.getReceipt(tx);
  }

  async getReceipt(tx: ethers.providers.TransactionResponse) {
    return tx.wait();
  }

  async requestTokens(
    address: string,
    // signature: string,
  ) {
    // ethers.utils.verifyMessage("abcd", signature) != address
    const pKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider);
    return this.contract
      .connect(signer)
      .mint(address, ethers.utils.parseUnits('1'));
  }
}
