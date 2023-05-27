import {
    Controller,
    Body,
    Post,
    HttpCode,
    Res,
    Get
  } from '@nestjs/common';
  import { AuthService } from './service';
  import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from '../users/dto';
  
  @Controller()
  export class AuthController {
    constructor(private readonly authService: AuthService) { }
  
    @Post('register')
    async registerUser(@Body() user: CreateUserDto, @Res() response: Response) {
      const { cookieWithToken, createdUser } = await this.authService.register(user);
      response.setHeader('Set-Cookie', cookieWithToken);

      return response.send(createdUser);
    }
    
    @Post('login')
    @HttpCode(200)
    /*
        Above we use  @HttpCode(200) because NestJS responds with 201 Created for POST requests by default
    */
    async login(@Body() user: LoginUserDto, @Res() response: Response) {
      const { cookieWithToken, existedUser } = await this.authService.login(user);
      response.setHeader('Set-Cookie', cookieWithToken);

      return response.send(existedUser);
    }

    @Get('logout')
    async logout(@Res() response: Response) {
      const logoutCookie = this.authService.logout();

      response.setHeader('Set-Cookie', logoutCookie);

      return response.sendStatus(200);
    }
    
  }