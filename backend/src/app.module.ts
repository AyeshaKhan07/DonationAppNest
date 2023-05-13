import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './database/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users';
import { AuthModule } from './modules/authentication';


@Module({
  imports: [ConfigModule.forRoot({
    load: [config],
    isGlobal: true
  }), DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
