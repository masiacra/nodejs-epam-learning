import { Id, Table } from '../types/common.types';

export const createFindByIdFunction =
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
    async (id: Id, params: Params): Promise<{ code: number }> => {
        const [resultOfOperation] = await table.update(params, {
            where: { id },
        });

        return { code: resultOfOperation };
    };

export const createFunctionToInsertRecords =
    <Instance, Params>(table: Table<Instance, Params>) =>
    async (instances: Instance[]) => {
        try {
            for (const instance of instances) {
                await table.create(instance);
            }
            return { code: 1, error: null };
        } catch (error) {
            return { code: 0, error: error as Error };
        }
    };
