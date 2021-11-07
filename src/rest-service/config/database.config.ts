import { DataTypes, Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { UserInstance } from '../types/database.types';

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

export const Users = sequelize.define<UserInstance>(
    'users',
    {
        id: { type: DataTypes.STRING(100), allowNull: false, primaryKey: true },
        login: { type: DataTypes.STRING(30), allowNull: false },
        password: { type: DataTypes.STRING(30), allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { tableName: 'users' },
);