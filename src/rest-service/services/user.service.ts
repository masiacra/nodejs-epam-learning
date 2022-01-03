import { Id } from '../types/common.types';
import {
    dataFindUserById,
    dataCreateUser,
    dataUpdateUser,
    dataGetLimitUsers,
} from '../data-access/users.data-access';
import { DEFAULT_LIMIT } from '../config/application.config';
import { toDataAccess, fromDataAccess } from '../mappers/user.mapper';
import { User, PickedUser } from '../types/user.types';
import { PartialUserAttributes } from '../types/database.types';

export const findUserService = async (
    id: Id,
): Promise<{ user: User | null }> => {
    const { resultObject } = await dataFindUserById(id);

    return !!resultObject
        ? { user: fromDataAccess(resultObject) }
        : { user: null };
};

export const createUserService = async (params: PickedUser) => {
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

export const getLimitUsersService = async (login: string, limit?: number) => {
    const { users } = await dataGetLimitUsers(login, limit || DEFAULT_LIMIT);

    return {
        users: users.map((user) => fromDataAccess(user)),
    };
};
