import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './database/config';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/authentication/module';
import { DatabaseModule } from './database/database.module';
import { FundraisersModule } from './modules/fundraisers/module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [config],
    isGlobal: true
  }), DatabaseModule, UsersModule, AuthModule, FundraisersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
