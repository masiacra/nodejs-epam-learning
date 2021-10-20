import { User } from '../common-types';
import { createId } from '../helpers/createId';

export const createUser = (
    login: string,
    password: string,
    age: number,
): User => ({
    id: createId(),
    login,
    password,
    age,
    isDeleted: false,
});

export const deleteUser = (user: User): User => ({
    ...user,
    isDeleted: true,
});

export const updateUser = (
    user: User,
    login?: string,
    password?: string,
    age?: number,
): User => ({
    ...user,
    login: login || user.login,
    password: password || user.password,
    age: age || user.age,
});
