import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare const userProviders: ({
    provide: string;
    useValue: typeof User;
} | {
    provide: string;
    useValue: typeof JwtService;
})[];
