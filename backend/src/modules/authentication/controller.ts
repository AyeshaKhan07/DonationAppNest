import {
    Controller,
    Body,
    Post,
    HttpCode,
    Res
  } from '@nestjs/common';
  import { AuthService } from './service';
  import { Response } from 'express';
import { UserService } from '../users/service';
import { CreateUserDto } from '../users/dto';
  
  @Controller()
  export class authController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }
  
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
    async login() {}

    @Post('logout')
    async logout() {}
    
  }