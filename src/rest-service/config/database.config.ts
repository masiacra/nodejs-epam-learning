import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

// some problem with global interfaces
declare const process: {
    env: {
        [key: string]: string;
    };
};

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        define: {
            timestamps: false,
        },
    },
);

export const createTransaction = sequelize.transaction.bind(sequelize);
