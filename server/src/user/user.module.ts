import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders }from './user.providers';
import { BlockchainModule } from 'src/blockchain/blockchain.module';

@Module({
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
  imports: [BlockchainModule],
  controllers: [UserController]
})
export class UserModule {}
