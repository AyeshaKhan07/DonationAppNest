import { Module } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

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
            useFactory: (configService: ConfigService) => ({
                ...configService.get<DatabaseConfig>('database'),
                entities: ["dist/modules/*/*.entity.js"],
                migrations: ["dist/migrations/*"]
            }),
            inject: [ConfigService],
        })
    ],
})


export class DatabaseModule {}
