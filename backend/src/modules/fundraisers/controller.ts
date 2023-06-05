import {
    Controller,
    Body,
    Get,
    Delete,
    Param,
    Put,
    Post,
    Res,
    Req,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { CreatePageDto } from './dto';
import { FundraisersService } from './service';
import { UserService } from '../users/service';

@Controller('fundraiser-pages')
export class FundraisersController {
    constructor(private readonly fundraisersService: FundraisersService, private readonly userService: UserService) { }

    @Post()
    async create(@Body() page: CreatePageDto, @Req() request: Request) {

        const user = await this.userService.findById(request['user'].id);

        return this.fundraisersService.create(page, user)
    }
}