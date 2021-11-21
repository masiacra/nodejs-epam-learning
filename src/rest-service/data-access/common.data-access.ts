import { Id, Table } from '../types/common.types';
import { createTransaction } from '../config/database.config';

export const withTransaction =
    <Props1, Result1, Props2>(
        fn1: (props: Props1, options?: object) => Promise<Result1>,
        fn2: (props2: Props2, options?: object) => Promise<{ code: number }>,
    ) =>
    async (props: Props1, props2?: Props2): Promise<Result1> => {
        const transaction = await createTransaction();
        try {
            const result = await fn1(props, { transaction });

            if (props2) {
                await fn2(props2, { transaction });
            }

            await transaction.commit();

            return result;
        } catch (error) {
            await transaction.rollback();

            throw error;
        }
    };

export const createFunctionFindByIdInstance =
    <Instance, Params>(table: Table<Instance, Params>) =>
    async (id: Id): Promise<{ resultObject: Instance | null }> => {
        const resultObject = await table.findByPk(id);

        return { resultObject };
    };

export const createFunctionToCreateInstance =
    <Instance, Params>(table: Table<Instance, Params>) =>
    async (instance: Instance): Promise<{ resultObject: Instance | null }> => {
        const resultObject = await table.create(instance);

        return { resultObject };
    };

export const createFunctionToUpdateInstance =
    <Instance, Params>(table: Table<Instance, Params>) =>
    async (id: Id, params: Params, options = {}): Promise<{ code: number }> => {
        const [resultOfOperation] = await table.update(params, {
            where: { id },
            ...options,
        });

        return { code: resultOfOperation };
    };

export const createFunctionToInsertRecords =
    <Instance, Params>(table: Table<Instance, Params>) =>
    async (instances: Instance[], options?: object) => {
        for (const instance of instances) {
            await table.create(instance, options);
        }
        return { code: 1 };
    };
