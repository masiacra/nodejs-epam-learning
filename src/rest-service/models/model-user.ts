import { User } from '../types/user.types';

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
