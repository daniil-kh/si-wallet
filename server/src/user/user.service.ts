import { Injectable, Inject, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../core/constants';
import * as sha256 from 'sha256'
import { LoginFormDto } from '../auth/dto/login.dto';
import { BlockchainService } from '../blockchain/blockchain.service';
import { FullNameDto } from './dto/fullname.dto';


@Injectable()
export class UserService {

  constructor(
    @Inject(USER_REPOSITORY) public readonly userRepository: typeof User,
    public readonly blockchain: BlockchainService
  ) { }

  async create(user: UserDto): Promise<any> {
    if (await this.userRepository.findOne({ where: { username: user.username } })) {
      throw new Error("User with this username already exists");
    }
    let object = user;
    object.password = sha256(user.password);
    let newUser = await this.userRepository.create<User>(object);
    newUser.password = undefined;
    await this.blockchain.createAddress(newUser.username).catch((err: Error) => { throw err })
    // let balance = await this.blockchain.getAdresses(newUser.username).catch((err: Error) => { throw err })
    // let allBalance = 0;
    // await Promise.all(balance.map((one: any) => {
    //   allBalance += parseFloat(one.available_balance);
    //   return one.available_balance
    // })).catch((err: Error) => { throw err })
    return {
      ...newUser.toJSON(),
      //balance: balance,
      //totalBalance: allBalance
    }
  }

  async updateFullname(id: number, user: FullNameDto) {
    await this.userRepository.update(user, {
      where: {
        id: id
      }
    }).catch((err: Error) => { throw err })
    return await this.findOneById(id).catch((err: Error) => { throw err })
  }
  


  async validate(user: LoginFormDto): Promise<any> {
    let UserData = await this.userRepository.findOne<User>({
      where: {
        email: user.email,
        password: sha256(user.password)
      },
      attributes: { exclude: ['password'] }
    });
    if (!UserData) return null;
    //let balance = await this.blockchain.getAdresses(UserData.username).catch((err: Error) => { throw err })
    // let allBalance = 0;
    // await Promise.all(balance.map((one: any) => {
    //   allBalance += parseFloat(one.available_balance);
    //   return one.available_balance
    // }))
    return {
      ...UserData.toJSON(),
      //balance: balance,
      //totalBalance: allBalance
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { email },
      attributes: { exclude: ['password'] }
    });
  }

  async findOneById(id: number): Promise<any> {
    let UserData = await this.userRepository.findOne<User>({
      where: { id },
      attributes: { exclude: ['password'] }
    });
    if (!UserData) return null;
    let balance = await this.blockchain.getAdresses(UserData.username).catch((err: Error) => { throw err })
    let allBalance = 0;
    await Promise.all(balance.map((one: any) => {
      allBalance += parseFloat(one.available_balance);
      return one.available_balance
    }))
    return {
      ...UserData.toJSON(),
      profitAmount: 0,
      profitPercent: 100,
      APY: 0,
      DDY: 0,
      tradeBalance: 0,
      //balance: balance,
      totalBalance: allBalance
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }
}