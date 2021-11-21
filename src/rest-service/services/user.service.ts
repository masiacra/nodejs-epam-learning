import { Id } from '../types/common.types';
import {
    dataFindUserById,
    dataCreateUser,
    dataUpdateUser,
    dataGetLimitUsers,
} from '../data-access/users.data-access';
import { DEFAULT_LIMIT } from '../config/application.config';
import { toDataAccess, fromDataAccess } from '../mappers/user.mapper';
import { User } from '../types/user.types';
import { UserAttributes, PartialUserAttributes } from '../types/database.types';

// TODO: make all functions more abstract
export const findUserService = async (
    id: Id,
): Promise<{ user: User | null }> => {
    const { resultObject } = await dataFindUserById(id);

    return !!resultObject
        ? { user: fromDataAccess(resultObject) }
        : { user: null };
};

export const createUserService = async (
    params: Pick<User, 'login' | 'password' | 'age'>,
) => {
    const user = toDataAccess(params);

    await dataCreateUser(user);

    return { user: fromDataAccess(user) };
};

export const updateUserService = async (
    id: Id,
    params: PartialUserAttributes,
) => {
    const result = await dataUpdateUser(id, params);

    return result;
};

export const deleteUserService = async (id: Id) => {
    const result = await updateUserService(id, { is_deleted: true });

    return result;
};

const createGetLimitUsers =
    (
        dataAccessFunction: (
            login: string,
            limit: number,
        ) => Promise<{ users: UserAttributes[] }>,
    ) =>
    async (login: string, limit?: number) => {
        const { users } = await dataAccessFunction(
            login,
            limit || DEFAULT_LIMIT,
        );

        return {
            users: users.map((user) => fromDataAccess(user)),
        };
    };

export const getLimitUsersService = createGetLimitUsers(dataGetLimitUsers);
