import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    notification: boolean;
}
