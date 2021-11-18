import { Id } from '../types/common.types';

export const createCreateService =
    <Instance, Params>(
        createInstanceFunction: (
            params: Params,
        ) => Promise<{ resultObject: Instance; error: Error | null }>,
        transformer: (partialParams: Partial<Params>) => Params,
    ) =>
    async (partialParams: Partial<Params>) => {
        const resultObject = transformer(partialParams);
        const { error } = await createInstanceFunction(resultObject);

        return { resultObject, error };
    };

export const createUpdateService =
    <Params>(
        updateInstanceFunction: (
            id: Id,
            params: Partial<Params>,
        ) => Promise<{ code: number; error: Error | null }>,
    ) =>
    async (id: Id, params: Partial<Params>) => {
        const code = await updateInstanceFunction(id, params);

        return code;
    };

export const createDeleteService =
    (
        deleteInstanceFunction: (
            id: Id,
        ) => Promise<{ code: number; error: Error | null }>,
    ) =>
    async (id: Id) => {
        const result = await deleteInstanceFunction(id);

        return result;
    };

export const createFindService =
    <Instance>(
        findByIdInstanceFunction: (
            id: Id,
        ) => Promise<{ resultObject: Instance | null; error: Error | null }>,
    ) =>
    async (id: Id) => {
        const result = await findByIdInstanceFunction(id);

        return result;
    };
