import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { LoginFormDto } from '../auth/dto/login.dto';
import { BlockchainService } from '../blockchain/blockchain.service';
import { FullNameDto } from './dto/fullname.dto';
export declare class UserService {
    readonly userRepository: typeof User;
    readonly blockchain: BlockchainService;
    constructor(userRepository: typeof User, blockchain: BlockchainService);
    create(user: UserDto): Promise<any>;
    updateFullname(id: number, user: FullNameDto): Promise<any>;
    validate(user: LoginFormDto): Promise<any>;
    findOneByEmail(email: string): Promise<User>;
    findOneById(id: number): Promise<any>;
    findAll(): Promise<User[]>;
}
