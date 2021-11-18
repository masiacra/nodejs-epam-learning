import { Id, Table } from '../types/common.types';

export const createFindByIdFunction =
    <Instance, Params>(table: Table<Instance, Params>) =>
    async (options?: object): Promise<{ resultObject: Instance | null }> => {
        const resultObject = await table.findOne(options);

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
