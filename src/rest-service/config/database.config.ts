import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

// some problem with global interfaces
declare const process: {
    env: {
        [key: string]: string;
    };
};

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    define: {
        timestamps: false,
    },
});

export const createTransaction = sequelize.transaction.bind(sequelize);
