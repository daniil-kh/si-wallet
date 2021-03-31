import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { LoginFormDto } from './dto/login.dto';
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    register(user: UserDto): Promise<any>;
    login(user: LoginFormDto): Promise<{
        access_token: string;
    } | null>;
}
