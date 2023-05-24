import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from "../users/service";
import { CreateUserDto } from '../users/dto';

export class AuthService {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
        private readonly tokenService: JwtService,
        private readonly configService: ConfigService
    ) { }

    getCookieWithJwtToken(email: string) {
        const token = this.tokenService.sign({email});
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('tokenExpireTime')}`;
    }

    async register(user: CreateUserDto) {
        await this.userService.create(user);

        const createdUser = await this.userService.findOneByEmail(user.email);
        if (createdUser) {
            const cookieWithToken = this.getCookieWithJwtToken(createdUser.email);
            return { cookieWithToken, createdUser }
        }
    }

    async login () {}
}