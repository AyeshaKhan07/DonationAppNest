import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";


import { AuthService } from './service';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/module';
import { AuthController } from './controller';
import { AuthGuard } from 'src/middlewares/auth-guard';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('tokenKey'),
                signOptions: {
                    expiresIn: `${configService.get('tokenExpireTime')}s`,
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AuthService],
})
export class AuthModule { }