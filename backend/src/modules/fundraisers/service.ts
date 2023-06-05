import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { CreatePageDto } from './dto';
import { Fundraiser } from './fundraiser.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FundraisersService {
  constructor(
    @InjectRepository(Fundraiser)
    private readonly fundraiserRepository: Repository<Fundraiser>,
  ) { }

  async create(page: CreatePageDto, user: User) {

    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    
    const newPagePayload = {
        ...page,
        user: user
    }
    const newPage = this.fundraiserRepository.create(newPagePayload);

    return await this.fundraiserRepository.save(newPage);
  }
}