import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from "../users/service";
import { matchPassword } from 'src/utils/bcrypt';
import { CreateUserDto, LoginUserDto } from '../users/dto';

export class AuthService {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
        private readonly tokenService: JwtService,
        private readonly configService: ConfigService
    ) { }

    getCookieWithJwtToken(email: string) {
        const token = this.tokenService.sign({ email });
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

    async login(user: LoginUserDto) {
        const existedUser = await this.userService.findOneByEmail(user.email, true);
        const passwordMatched = await matchPassword(user.password, existedUser.password);

        if (existedUser && passwordMatched) {
            delete existedUser.password;

            const cookieWithToken = this.getCookieWithJwtToken(existedUser.email);

            return { cookieWithToken, existedUser }
        }

        else throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }

    logout() {
        const logoutCookie = `Authentication=; HttpOnly; Path=/; Max-Age=0`;
        
        return logoutCookie
    }
}