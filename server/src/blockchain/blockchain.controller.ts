import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards, Request, Param, Logger, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlockchainService } from './blockchain.service';
import { Response } from 'express'
import { WithdrawDto } from './dto/withdraw.dto';

@Controller('blockchain')
export class BlockchainController {
  constructor(
    private blockchainService: BlockchainService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/allBalance')
  async getBalance(@Request() req, @Res() res: Response) {
    let result = await this.blockchainService.getAdresses(req.user.username).catch((err: Error) => {
      res.status(HttpStatus.BAD_REQUEST).json({ message: [err.message] });
    })
    res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/prices')
  async getPrices(@Res() res: Response) {
    let result = await this.blockchainService.getPrices().catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
    })
    res.status(HttpStatus.OK).json(result);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/news')
  async getNews(@Res() res: Response) {
    let result = await this.blockchainService.getNews().catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
    })
    res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/assets')
  async getAssets(@Res() res: Response){
    let result = await this.blockchainService.getAssets().catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
    })
    res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/assets/:slag')
  async getAssetsBySlag(@Param('slag') slag: string, @Res() res: Response){
    let result = await this.blockchainService.getAssetsBySlag(slag).catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
    })
    res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/withdraw')
  async withdraw(@Body() body: WithdrawDto, @Res() res: Response, @Request() req){
    Logger.log(body);
    let result = await this.blockchainService.withdraw(req.user.username, body.network, body.amount, body.withdrawAddress).catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
    })
    res.status(HttpStatus.OK).json(result);
  }
}
