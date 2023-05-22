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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const tokenJson = require("./assets/MyERC20Votes.json");
const config_1 = require("@nestjs/config");
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('ALCHEMY_API_KEY');
        this.provider = new ethers_1.ethers.providers.AlchemyProvider('maticmum', apiKey);
        this.contract = new ethers_1.Contract(this.getAddress(), tokenJson.abi, this.provider);
    }
    async getLastBlock() {
        return this.provider.getBlock('latest');
    }
    getAddress() {
        const tokenAddress = this.configService.get('ERC20_TOKEN_ADDRESS');
        return tokenAddress;
    }
    async getTotalSupply() {
        return this.contract.totalSupply();
    }
    async getBalanceOf(address) {
        return this.contract.getBalanceOf(address);
    }
    async getTransactionReceipt(hash) {
        const tx = await this.provider.getTransaction(hash);
        return this.getReceipt(tx);
    }
    async getReceipt(tx) {
        return tx.wait();
    }
    async requestTokens(address) {
        const pKey = this.configService.get('PRIVATE_KEY');
        const wallet = new ethers_1.ethers.Wallet(pKey);
        const signer = wallet.connect(this.provider);
        return this.contract
            .connect(signer)
            .mint(address, ethers_1.ethers.utils.parseUnits('1'));
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map