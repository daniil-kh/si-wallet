import { Body, Controller, Get, Post, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express'
import { LoginFormDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService  
  ){}

  @UseGuards(JwtAuthGuard)
  @Get('validateToken')
  async validateToken(@Res() res: Response){
    res.status(HttpStatus.OK).json({statusCode: 200, message: "Success"})
  }


  @Post('signup')
  async create(@Body() body: UserDto, @Res() res: Response){
    let user = await this.authService.register(body).catch((err: Error) => {
      res.status(HttpStatus.BAD_REQUEST).json({message: [err.message]});
    })
    res.status(HttpStatus.OK).json(user)
  }
  
  @Post('login')
  async login(@Body() body: LoginFormDto, @Res() res: Response){
    let validate = await this.authService.login(body).catch((err: Error) => {
      res.status(HttpStatus.BAD_REQUEST).json({message: [err.message]});
    })
    if(validate){
      res.status(HttpStatus.OK).json(validate)
      return;
    }
    res.status(HttpStatus.UNAUTHORIZED).json({message: ["Wrong login or password"]})
  }
}
