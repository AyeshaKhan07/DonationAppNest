import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UsersModule } from './modules/users/module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/authentication/module';
import { DatabaseModule } from './database/database.module';
import { FundraisersModule } from './modules/fundraisers/module';
import loadConfigs from './config/load-configs';

@Module({
  imports: [loadConfigs(true), DatabaseModule, UsersModule, AuthModule, FundraisersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
