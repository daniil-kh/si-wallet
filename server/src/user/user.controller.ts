import { Body, Controller, Get, Logger, Post, Req, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FullNameDto } from './dto/fullname.dto';
import { Response } from 'express'

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Request() request, @Body() userDTO: FullNameDto, @Res() res: Response) {
    const result = await this.UserService.updateFullname(request.user.userId, userDTO).catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] })
    })
    res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() request, @Res() res: Response): Promise<any> {
    Logger.log("USER", JSON.stringify(request.user));
    const result = await this.UserService.findOneById(request.user.userId).catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] })
    })
    res.status(HttpStatus.OK).json(result);
  }
}
