import { User } from './user.entity';
import { USER_REPOSITORY } from '../core/constants';
import { JwtService } from '@nestjs/jwt';

export const userProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
},{
    provide: "JWT",
    useValue: JwtService
}];