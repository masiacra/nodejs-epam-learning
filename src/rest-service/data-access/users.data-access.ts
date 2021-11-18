import { Op } from 'sequelize';
import { UserAttributes, UserInstance } from '../types/database.types';
import { Users } from '../config/database.config';
import { Id, Table } from '../types/common.types';
import { User } from '../types/user.types';
import {
    createFindByIdFunction,
    createFunctionToCreateInstance,
    createFunctionToUpdateInstance,
} from './common.data-access';

export const dataFindUserById = (id: Id) =>
    createFindByIdFunction(Users)({ id, is_deleted: false });

export const dataCreateUser = createFunctionToCreateInstance(Users);

export const dataUpdateUser = createFunctionToUpdateInstance(Users);

type PartialUser = Partial<User>;

const createGetLimitUsers =
    (table: Table<UserInstance, PartialUser>) =>
    async (
        login: string,
        limit: number,
    ): Promise<{ users: UserAttributes[]; error: Error | null }> => {
        try {
            const users = await table.findAll({
                where: { login: { [Op.startsWith]: login, is_deleted: false } },
                limit,
            });

            return { users, error: null };
        } catch (error) {
            return { users: [], error: error as Error };
        }
    };

export const dataGetLimitUsers = createGetLimitUsers(Users);

// TODO: разобраться с опциями запроса к бд
