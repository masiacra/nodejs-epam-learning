import { Id, User } from '../common-types';

export const userAlreadyExistsError = new Error('Sorry, user already exists');

const createDataBase = () => {
    const _dataBase = new Map<Id, User>();
    const _dataBaseLogins = new Set<string>();

    return {
        findUserById: (
            id: Id,
            callback: (error: null | Error, result: User | undefined) => void,
        ): void => {
            const user = _dataBase.get(id);
            if (user && !user.isDeleted) {
                callback(null, _dataBase.get(id));
                return;
            }
            callback(null, undefined);
        },
        addUser: (
            user: User,
            callback: (error: null | Error, result: boolean) => void,
        ): void => {
            if (_dataBaseLogins.has(user.login)) {
                callback(userAlreadyExistsError, false);
                return;
            }
            _dataBaseLogins.add(user.login);
            _dataBase.set(user.id, user);

            callback(null, true);
        },
        updateUserInDb: (
            newValueOfUser: User,
            oldLogin: string | undefined,
            callback: (error: null | Error, result: boolean) => void,
        ): void => {
            if (oldLogin) {
                _dataBaseLogins.delete(oldLogin);
                _dataBaseLogins.add(newValueOfUser.login);
            }
            _dataBase.set(newValueOfUser.id, newValueOfUser);
            callback(null, true);
        },
        removeUser: (
            deletedUser: User,
            callback: (error: null | Error, result: boolean) => void,
        ): void => {
            _dataBase.set(deletedUser.id, deletedUser);
            callback(null, true);
        },
        getAutoSuggestUsers: (
            loginSubstring: string,
            limit: number,
            callback: (error: null | Error, result: User[]) => void,
        ): void => {
            const filteredUsers: User[] = [];
            let counter = 0;
            for (const user of _dataBase.values()) {
                if (user.login.indexOf(loginSubstring) === 0) {
                    filteredUsers.push(user);
                    counter += 1;
                    if (counter >= limit) {
                        break;
                    }
                }
            }

            callback(null, filteredUsers);
        },
    };
};

export const dataBase = createDataBase();
