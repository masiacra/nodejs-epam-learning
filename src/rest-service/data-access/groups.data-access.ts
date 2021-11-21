import { GroupInstance } from '../types/database.types';
import { Table } from '../types/common.types';
import { Group } from '../types/group.types';
import { Groups } from '../models/groups.models';
import { UserGroup } from '../models/user-group.models';
import {
    createFunctionFindByIdInstance,
    createFunctionToCreateInstance,
    createFunctionToUpdateInstance,
    createFunctionToInsertRecords,
    withTransaction,
} from './common.data-access';

export class GroupError extends Error {}

export const dataFindGroupById = createFunctionFindByIdInstance(Groups);

export const dataCreateGroup = createFunctionToCreateInstance(Groups);

export const dataUpdateGroup = (props: PartialGroup, options?: object) =>
    createFunctionToUpdateInstance(Groups)(props.id || '', props, options);

type PartialGroup = Partial<Group>;

const createFunctionToDeleteGroup =
    (table: Table<GroupInstance, PartialGroup>) =>
    async (id: string): Promise<{ code: number }> => {
        const group = await table.findByPk(id);

        if (!group) {
            throw new GroupError(`Can't find group with id=${id}`);
        }

        await group.destroy();

        return { code: 1 };
    };

export const dataDeleteGroup = createFunctionToDeleteGroup(Groups);

const createFunctionToGetAllGroups =
    (table: Table<GroupInstance, PartialGroup>) =>
    async (): Promise<{ groups: GroupInstance[] }> => {
        const groups = await table.findAll();

        return { groups };
    };

export const dataGetAllGroups = createFunctionToGetAllGroups(Groups);

export const dataAddUsersToGroup = createFunctionToInsertRecords(UserGroup);

export const dataCreateGroupWithTransaction = withTransaction(
    dataCreateGroup,
    dataAddUsersToGroup,
);

export const dataUpdateGroupWithTransaction = withTransaction(
    dataUpdateGroup,
    dataAddUsersToGroup,
);
