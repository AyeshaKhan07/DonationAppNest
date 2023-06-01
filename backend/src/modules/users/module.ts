
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './service';
import { UsersController } from './controller';
import { IsEmailNotExists } from 'src/validation-rules/email-exists.rule';

@Module({
  exports: [UserService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, IsEmailNotExists],
})

export class UsersModule { }