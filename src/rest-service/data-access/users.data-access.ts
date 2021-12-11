import { Op } from 'sequelize';
import { UserAttributes, UserInstance } from '../types/database.types';
import { Users } from '../models/user.models';
import { Table } from '../types/common.types';
import { PartialUser, User } from '../types/user.types';
import {
    createFunctionFindByIdInstance,
    createFunctionToCreateInstance,
    createFunctionToUpdateInstance,
} from './common.data-access';
import { fromDataAccess } from '../mappers/user.mapper';

export const dataFindUserById = createFunctionFindByIdInstance(Users);

export const dataCreateUser = createFunctionToCreateInstance(Users);

export const dataUpdateUser = createFunctionToUpdateInstance(Users);

const createGetLimitUsers =
    (table: Table<UserInstance, PartialUser>) =>
    async (
        login: string,
        limit: number,
    ): Promise<{ users: UserAttributes[] }> => {
        const users = await table.findAll({
            where: { login: { [Op.startsWith]: login }, is_deleted: false },
            limit,
        });

        return { users };
    };

export const dataGetLimitUsers = createGetLimitUsers(Users);

const createFindUserByLogin =
    (table: Table<UserInstance, PartialUser>) =>
    async (login: string): Promise<User | null> => {
        const user = await table.findOne({ where: { login } });

        return !!user ? fromDataAccess(user) : null;
    };

export const findUserByLogin = createFindUserByLogin(Users);
