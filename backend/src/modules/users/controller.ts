import {
  Controller,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Delete()
  async deleteAllUsers() {
    return this.userService.deleteAll();
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }
}