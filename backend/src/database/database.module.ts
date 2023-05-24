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
                entities: ["dist/modules/*/entity.js"],
                migrations: ["dist/migrations/*"]
            }),
            inject: [ConfigService],
        })
    ],
})


export class DatabaseModule {
    // private dbConfigs: DatabaseConfig;

    // constructor(private configService: ConfigService) {
    //     this.dbConfigs = this.configService.get<DatabaseConfig>('database');

    // }

    // establishConnection() {
    //     return TypeOrmModule.forRoot({
    //         type: this.dbConfigs.type,
    //         host: this.dbConfigs.host,
    //         port: this.dbConfigs.port,
    //         username: this.dbConfigs.username,
    //         password: this.dbConfigs.password,
    //         database: this.dbConfigs.database,
    //         entities: [],
    //         synchronize: true,
    //       })
    // }


}
