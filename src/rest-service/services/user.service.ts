import { randomUUID } from 'crypto';
import { Id } from '../types/user.types';
import {
    userTableWrapper,
    UserTableWrapper,
} from '../data-access/user.data-access';
import { DEFAULT_LIMIT } from '../config/application.config';
import { userDataMapper, UserDataMapper } from '../mappers/user.mapper';

class UserService {
    private dataAccess: UserTableWrapper;
    private mapper: UserDataMapper;

    constructor(dataAccess: UserTableWrapper, mapper: UserDataMapper) {
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
        await this.dataAccess.create(this.mapper.toDataAccess(user));

        return { user };
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
        const { user } = await this.dataAccess.findById(id);

        return !!user && !user.is_deleted
            ? { user: this.mapper.fromDataAccess(user) }
            : { user: null };
    }

    async getLimitUsers(login: string, limit?: number) {
        const { users } = await this.dataAccess.getLimitUsers(
            login,
            limit || DEFAULT_LIMIT,
        );

        return {
            users: users
                .filter((user) => !user.is_deleted)
                .map((user) => this.mapper.fromDataAccess(user)),
        };
    }

    createId(): Id {
        return randomUUID();
    }
}

export const userService = new UserService(userTableWrapper, userDataMapper);
