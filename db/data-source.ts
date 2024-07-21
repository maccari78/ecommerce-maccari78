import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from 'dotenv'
config()
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    
    // To run DB from local
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,

    // To run DB from Docker
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    // To run from Railway
    url: process.env.DATABASE_URL,

    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    logging: false,
    synchronize: true,
    uuidExtension: "pgcrypto"
}

const dataSource = new DataSource(dataSourceOptions)
dataSource.initialize()
export default dataSource