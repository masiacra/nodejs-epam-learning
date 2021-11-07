import { UserAttributes } from '../types/database.types';
import { User } from '../types/user.types';

export class UserDataMapper {
    toDataAccess(user: User): UserAttributes {
        return {
            id: user.id,
            login: user.login,
            password: user.password,
            age: user.age,
            is_deleted: user.isDeleted,
        };
    }

    fromDataAccess(userFromDatabase: UserAttributes): User {
        return {
            id: userFromDatabase.id,
            login: userFromDatabase.login,
            password: userFromDatabase.password,
            age: userFromDatabase.age,
            isDeleted: userFromDatabase.is_deleted,
        };
    }
}

export const userDataMapper = new UserDataMapper();
