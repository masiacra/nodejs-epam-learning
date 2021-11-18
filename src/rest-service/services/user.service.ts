import { Id } from '../types/common.types';
import {
    dataFindUserById,
    dataCreateUser,
    dataUpdateUser,
    dataGetLimitUsers,
} from '../data-access/users.data-access';
import { DEFAULT_LIMIT } from '../config/application.config';
import { toDataAccess, fromDataAccess } from '../mappers/user.mapper';
import {
    createCreateService,
    createFindService,
    createUpdateService,
} from './common.service';
import { User } from '../types/user.types';
import { UserAttributes } from '../types/database.types';

export const findUserService = async (
    id: Id,
): Promise<{ user: User | null }> => {
    const { resultObject } = await createFindService(dataFindUserById)(id);

    return !!resultObject
        ? { user: fromDataAccess(resultObject) }
        : { user: null };
};

export const createUserService = async (
    params: Pick<User, 'login' | 'password' | 'age'>,
) => {
    const { resultObject: user } = await createCreateService(
        dataCreateUser,
        toDataAccess,
    )(params);

    return { user: fromDataAccess(user) };
};

export const updateUserService = createUpdateService(dataUpdateUser);

export const deleteUserService = async (id: Id) => {
    const result = await updateUserService(id, { is_deleted: true });

    return result;
};

const createGetLimitUsers =
    (
        dataAccessFunction: (
            login: string,
            limit: number,
        ) => Promise<{ users: UserAttributes[]; error: Error | null }>,
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
