import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if(user) delete user.password;

    return user
  }

  async update(id: string, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id: Number(id) });
    if (updatedUser) {
      return updatedUser
    }
    throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);

    return await this.userRepository.save(newUser);
  }

  async deleteUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id: Number(id) });

    if (!user) {
      throw new HttpException("User doesn't exists", HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.delete(id);
  }

  async deleteAll() {
    return await this.userRepository.clear();
  }
}