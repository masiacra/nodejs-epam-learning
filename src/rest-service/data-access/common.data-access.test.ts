import { createFunctionFindByIdInstance } from './common.data-access';
import { MOCK_TABLE, MOCK_ID, MOCK_INSTANCE } from './mocks/table.mock';

describe('common.data-access functions', () => {
    describe(createFunctionFindByIdInstance.name, () => {
        it('should return result wit MOCK_INSTANCE', async () => {
            const result = await createFunctionFindByIdInstance(MOCK_TABLE)(
                MOCK_ID,
            );

            expect(result).toEqual({ resultObject: MOCK_INSTANCE });
        });
    });
});
