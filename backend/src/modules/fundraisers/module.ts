import { Module } from "@nestjs/common";

import { UsersModule } from "../users/module";
import { FundraisersService } from "./service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fundraiser } from "./fundraiser.entity";
import { FundraisersController } from "./controller";

@Module({
    imports: [TypeOrmModule.forFeature([Fundraiser]), UsersModule],
    providers: [FundraisersService],
    controllers: [FundraisersController],
})
export class FundraisersModule { }