import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './database/config';
import { AppService } from './app.service';
import { UsersModule } from './modules/users';
import { AppController } from './app.controller';
import { AuthModule } from './modules/authentication';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [config],
    isGlobal: true
  }), DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
