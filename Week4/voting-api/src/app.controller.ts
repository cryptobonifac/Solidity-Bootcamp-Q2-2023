import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokensDto } from './dtos/RequestTokens.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  checkHealth() {
    return 'Hello World';
  }

  @Get('last-block')
  getLastBlock() {
    return this.appService.getLastBlock();
  }

  @Get('contract-address')
  getAddress() {
    return this.appService.getAddress();
  }

  @Get('total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  @Get('balance/:address')
  getBalanceOf(@Param('address') address: string) {
    return this.appService.getBalanceOf(address);
  }

  @Get('transaction-receipt')
  getTransactionReceipt(@Query('hash') hash: string) {
    return this.appService.getTransactionReceipt(hash);
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto) {
    return this.appService.requestTokens(body.address);
  }
}
