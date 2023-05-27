
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";


import { AuthService } from './service';
import { AuthController } from './controller';
import { UsersModule } from '../users';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            imports: [],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('tokenKey'),
                signOptions: {
                    expiresIn: `${configService.get('tokenExpireTime')}s`,
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }