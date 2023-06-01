import { Module } from "@nestjs/common";

import { FundraisersService } from "./service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fundraiser } from "./fundraiser.entity";
import { FundraisersController } from "./controller";

@Module({
    imports: [TypeOrmModule.forFeature([Fundraiser])],
    providers: [FundraisersService],
    controllers: [FundraisersController],
})
export class FundraisersModule { }