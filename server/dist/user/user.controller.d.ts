import { UserService } from './user.service';
import { FullNameDto } from './dto/fullname.dto';
import { Response } from 'express';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    update(request: any, userDTO: FullNameDto, res: Response): Promise<void>;
    getAll(request: any, res: Response): Promise<any>;
}
