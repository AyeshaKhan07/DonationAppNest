import { Module } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './data-source';

interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    type: 'mysql';
    database: string
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => connectionSource.options,
            inject: [ConfigService],
        })
    ],
})


export class DatabaseModule {}
