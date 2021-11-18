import { randomUUID } from 'crypto';
import { UserAttributes } from '../types/database.types';
import { User } from '../types/user.types';

export const toDataAccess = (
    userParams: Partial<UserAttributes>,
): UserAttributes => ({
    id: randomUUID(),
    login: userParams.login || '',
    password: userParams.password || '',
    age: userParams.age || 0,
    is_deleted: false,
});

export const fromDataAccess = (userFromDatabase: UserAttributes): User => {
    return {
        id: userFromDatabase.id,
        login: userFromDatabase.login,
        password: userFromDatabase.password,
        age: userFromDatabase.age,
        isDeleted: userFromDatabase.is_deleted,
    };
};
