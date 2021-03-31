import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { LoginFormDto } from './dto/login.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    validateToken(res: Response): Promise<void>;
    create(body: UserDto, res: Response): Promise<void>;
    login(body: LoginFormDto, res: Response): Promise<void>;
}
