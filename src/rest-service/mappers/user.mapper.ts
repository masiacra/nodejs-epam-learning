import { UserInstance } from '../types/database.types';
import { User } from '../types/user.types';

export const userMapper = (userFromDatabase: UserInstance): User => ({
    id: userFromDatabase.id,
    login: userFromDatabase.login,
    password: userFromDatabase.password,
    age: userFromDatabase.age,
    isDeleted: userFromDatabase.is_deleted,
});
