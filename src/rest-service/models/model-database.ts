import { Id, User } from '../common-types';

export const userAlreadyExistsError = new Error('Sorry, user already exists');

const createDataBase = () => {
    const _dataBase = new Map<Id, User>([
        [
            '1',
            {
                id: '1',
                login: 'smbd',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '2',
            {
                id: '2',
                login: 'smbd1',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '3',
            {
                id: '3',
                login: 'smbd2',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '4',
            {
                id: '4',
                login: 'smbd4',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '5',
            {
                id: '5',
                login: 'smbd5',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '6',
            {
                id: '6',
                login: 'smbd6',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '7',
            {
                id: '7',
                login: 'smbd7',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '8',
            {
                id: '8',
                login: 'smbd8',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '9',
            {
                id: '9',
                login: 'smbd9',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '10',
            {
                id: '10',
                login: 'smbd10',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '11',
            {
                id: '11',
                login: 'smbd11',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
        [
            '12',
            {
                id: '12',
                login: 'smbd12',
                password: '123',
                age: 18,
                isDeleted: false,
            },
        ],
    ]);
    const _dataBaseLogins = new Set<string>(['smbd']);

    return {
        findUserById: (
            id: Id,
            callback: (error: null | Error, result: User | undefined) => void,
        ): void => {
            const user = _dataBase.get(id);
            if (user && !user.isDeleted) {
                callback(null, _dataBase.get(id));
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
