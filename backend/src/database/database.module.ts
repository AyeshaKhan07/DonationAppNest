import { Module } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './data-source';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => connectionSource.options,
            inject: [ConfigService],
        })
    ],
})


export class DatabaseModule {}
