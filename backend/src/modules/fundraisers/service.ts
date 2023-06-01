import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { CreatePageDto } from './dto';
import { Fundraiser } from './fundraiser.entity';

@Injectable()
export class FundraisersService {
  constructor(
    @InjectRepository(Fundraiser)
    private readonly fundraiserRepository: Repository<Fundraiser>,
  ) { }

  async create(page: CreatePageDto, userId: Number) {
    const newPagePayload = {
        ...page,
        user: userId
    }
    const newPage = this.fundraiserRepository.create(newPagePayload);

    return await this.fundraiserRepository.save(newPage);
  }
}