import { ModelCtor, Op } from 'sequelize';
import { UserAttributes, UserInstance } from '../types/database.types';
import { Users } from '../models/user.models';

export class UserTableWrapper {
    private table: ModelCtor<UserInstance>;

    constructor(table: ModelCtor<UserInstance>) {
        this.table = table;
    }

    async findById(id: string) {
        const user = await this.table.findByPk(id);

        return { user };
    }

    async create(user: UserAttributes) {
        const userInstance = await this.table.create(user);

        return { user: userInstance };
    }

    async update(id: string, login: string, password: string, age: number) {
        const [resultOfOperation] = await this.table.update(
            { login, password, age },
            { where: { id } },
        );

        return { code: resultOfOperation };
    }

    async delete(id: string) {
        const [resultOfOperation] = await this.table.update(
            { is_deleted: true },
            { where: { id } },
        );

        return { code: resultOfOperation };
    }

    async getLimitUsers(login: string, limit: number) {
        const users = await this.table.findAll({
            where: { login: { [Op.startsWith]: login } },
            limit,
        });

        return { users };
    }
}

export const userTableWrapper = new UserTableWrapper(Users);
