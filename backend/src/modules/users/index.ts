
import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { UserService } from './service';
// import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity';
import { IsEmailNotExists } from 'src/validation-rules/email-exists.rule';
// import { JwtModule } from '@nestjs/jwt';
// import 'dotenv/config';
// import { EXPIRES_IN } from '../shared/constants';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    TypeOrmModule.forFeature([User]),
    // JwtModule.register({
    //   secret: process.env.SECRET_KEY,
    //   signOptions: {
    //     expiresIn: EXPIRES_IN,
    //   },
    // }),
  ],
  controllers: [UsersController],
  providers: [UserService, IsEmailNotExists],
  exports: [UserService],
})
export class UsersModule {}