import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';

@Module({
  providers: [BlockchainService],
  exports: [BlockchainService],
  controllers: [BlockchainController]
})
export class BlockchainModule {}
