import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { join } from 'path';
// import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    UserModule, AuthModule, DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        redirect: false
      }
    }),
    BlockchainModule,
  ]
})
export class AppModule { }
