import { DataSource } from 'typeorm';
import configuration from '../config/configurations';
import loadConfigs from '../config/load-configs';

interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string
}


loadConfigs();

const config: DatabaseConfig = configuration().database;

export const connectionSource = new DataSource({...config, type: 'mysql'});
