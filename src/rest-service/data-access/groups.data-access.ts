import { GroupInstance } from '../types/database.types';
import { Id, Table } from '../types/common.types';
import { Group } from '../types/group.types';
import { Groups } from '../models/groups.models';
import { UserGroup } from '../models/user-group.models';
import {
    createFindByIdFunction,
    createFunctionToCreateInstance,
    createFunctionToUpdateInstance,
    createFunctionToInsertRecords,
} from './common.data-access';

export class GroupError extends Error {}

export const dataFindGroupById = createFindByIdFunction(Groups);

export const dataCreateGroup = async (id: Id) => {
    const result = await createFunctionToCreateInstance(Groups)(id);
};

export const dataUpdateGroup = createFunctionToUpdateInstance(Groups);

type PartialGroup = Partial<Group>;

const createFunctionToDeleteGroup =
    (table: Table<GroupInstance, PartialGroup>) =>
    async (id: string): Promise<{ code: number; error: Error | null }> => {
        try {
            const group = await table.findByPk(id);

            if (!group) {
                return {
                    code: 0,
                    error: new GroupError(`Can't find group with id=${id}`),
                };
            }

            await group.destroy();

            return { code: 1, error: null };
        } catch (error) {
            return { code: 0, error: error as Error };
        }
    };

export const dataDeleteGroup = createFunctionToDeleteGroup(Groups);

const createFunctionToGetAllGroups =
    (table: Table<GroupInstance, PartialGroup>) =>
    async (): Promise<{ groups: GroupInstance[]; error: Error | null }> => {
        try {
            const groups = await table.findAll();

            return { groups, error: null };
        } catch (error) {
            return { error: error as Error, groups: [] };
        }
    };

export const dataGetAllGroups = createFunctionToGetAllGroups(Groups);

export const dataAddUsersToGroup = createFunctionToInsertRecords(UserGroup);
