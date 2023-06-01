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

@Controller('fundraisers')
export class FundraisersController {
    constructor(private readonly fundraisersService: FundraisersService) { }

    @Post()
    async create(@Body() page: CreatePageDto, @Req() request: Request) {
        return this.fundraisersService.create(page, request['user'].id)
    }
}