import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { LoginFormDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async register(user: UserDto) {
    let userData = await this.userService.create(user).catch((err: Error) => {throw err});
    if(userData){
      const payload = { username: userData.username, sub: userData.id}
      return {
        ...userData,
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async login(user: LoginFormDto): Promise<{access_token: string} | null> {
    let userData = await this.userService.validate(user).catch(err => {throw err})
    if(userData){
      const payload = { username: userData.username, sub: userData.id };
      return {
        ...userData,
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

}
