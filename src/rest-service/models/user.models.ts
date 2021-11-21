import { DataTypes } from 'sequelize';
import { UserInstance } from '../types/database.types';
import { sequelize } from '../config/database.config';

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
