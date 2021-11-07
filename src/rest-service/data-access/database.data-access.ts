import { ModelCtor, Op } from 'sequelize';
import { UserAttributes, UserInstance } from '../types/database.types';
import { Users } from '../config/database.config';

export class DatabaseWrapper {
    private table: ModelCtor<UserInstance>;

    constructor(table: ModelCtor<UserInstance>) {
        this.table = table;
    }

    async findById(id: string) {
        try {
            const user = await this.table.findByPk(id);

            return { user, error: null };
        } catch (error) {
            return { error: error as Error, user: null };
        }
    }

    async create(user: UserAttributes) {
        try {
            const userInstance = await this.table.create(user);

            return { user: userInstance, error: null };
        } catch (error) {
            return { user: null, error: error as Error };
        }
    }

    async update(id: string, login: string, password: string, age: number) {
        try {
            const [resultOfOperation] = await this.table.update(
                { login, password, age },
                { where: { id } },
            );

            return { code: resultOfOperation, error: null };
        } catch (error) {
            return { code: 0, error: error as Error };
        }
    }

    async delete(id: string) {
        try {
            const [resultOfOperation] = await this.table.update(
                { is_deleted: true },
                { where: { id } },
            );

            return { code: resultOfOperation, error: null };
        } catch (error) {
            return { code: 0, error: error as Error };
        }
    }

    async getLimitUsers(login: string, limit: number) {
        try {
            const users = await this.table.findAll({
                where: { login: { [Op.startsWith]: login } },
                limit,
            });

            return { users, error: null };
        } catch (error) {
            return { users: [], error: error as Error };
        }
    }
}

export const databaseWrapper = new DatabaseWrapper(Users);
