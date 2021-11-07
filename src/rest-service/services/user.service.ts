import { randomUUID } from 'crypto';
import { Id } from '../types/user.types';
import {
    databaseWrapper,
    DatabaseWrapper,
} from '../data-access/database.data-access';
import { DEFAULT_LIMIT } from '../config/application.config';
import { userDataMapper, UserDataMapper } from '../mappers/user.mapper';

class UserService {
    private dataAccess: DatabaseWrapper;
    private mapper: UserDataMapper;

    constructor(dataAccess: DatabaseWrapper, mapper: UserDataMapper) {
        this.dataAccess = dataAccess;
        this.mapper = mapper;
    }

    async createUser(login: string, password: string, age: number) {
        const user = {
            id: this.createId(),
            login,
            password,
            age,
            isDeleted: false,
        };
        const { error } = await this.dataAccess.create(
            this.mapper.toDataAccess(user),
        );

        return { user, error };
    }

    async updateUser(id: Id, login: string, password: string, age: number) {
        const code = await this.dataAccess.update(id, login, password, age);

        return code;
    }

    async deleteUser(id: string) {
        const result = await this.dataAccess.delete(id);

        return result;
    }

    async findUser(id: string) {
        const { user, error } = await this.dataAccess.findById(id);

        return !!user && !user.is_deleted
            ? { user: this.mapper.fromDataAccess(user), error }
            : { user: null, error };
    }

    async getLimitUsers(login: string, limit?: number) {
        const { users, error } = await this.dataAccess.getLimitUsers(
            login,
            limit || DEFAULT_LIMIT,
        );

        return {
            users: users
                .filter((user) => !user.is_deleted)
                .map((user) => this.mapper.fromDataAccess(user)),
            error,
        };
    }

    createId(): Id {
        return randomUUID();
    }
}

export const userService = new UserService(databaseWrapper, userDataMapper);
