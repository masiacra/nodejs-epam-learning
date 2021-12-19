import { Table } from '../../types/common.types';

interface MockInstance {
    id: string;
}

interface MockParams {
    id: string;
}

export const MOCK_ID = '1';

export const MOCK_INSTANCE: MockInstance = { id: MOCK_ID };

export const MOCK_ALL_INSTANCES: MockInstance[] = [MOCK_INSTANCE, { id: '2' }];

export const MOCK_TABLE: Table<MockInstance, MockParams> = {
    async findByPk(id: string) {
        return { id };
    },
    async update(params: MockParams, _: object) {
        return [1, [{ id: params.id }]];
    },
    async create(instance: MockInstance, _obj?: object) {
        return instance;
    },
    async findAll() {
        return MOCK_ALL_INSTANCES;
    },
    async findOne(_: object) {
        return MOCK_INSTANCE;
    },
};
