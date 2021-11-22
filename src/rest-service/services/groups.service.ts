import { randomUUID } from 'crypto';
import { Group, PartialGroup } from '../types/group.types';
import { Permission } from '../types/group.types';
import {
    dataFindGroupById,
    dataDeleteGroup,
    dataGetAllGroups,
    dataCreateGroupWithTransaction,
    dataUpdateGroupWithTransaction,
} from '../data-access/groups.data-access';
import { Id } from '../types/common.types';

export const findGroupService = async (id: Id) => {
    const { resultObject } = await dataFindGroupById(id);

    return { group: resultObject };
};

const createGroup = ({
    name,
    permissions,
}: {
    name: string;
    permissions: Permission[];
}) => {
    return {
        id: randomUUID(),
        name,
        permissions,
    };
};

const addUsersToGroup = (groupId: Id, usersIds: Id[]) => {
    return usersIds.map((user_id) => ({ user_id, group_id: groupId }));
};
export const createGroupService = async ({
    name,
    permissions,
    usersIds,
}: {
    name: string;
    permissions: Permission[];
    usersIds?: Id[];
}) => {
    const group = createGroup({ name, permissions });

    const { resultObject } = await dataCreateGroupWithTransaction(
        group,
        usersIds ? addUsersToGroup(group.id, usersIds) : undefined,
    );

    return { resultObject };
};

export const updateGroupService = async ({
    id,
    name,
    permissions,
    usersIds,
}: PartialGroup & { usersIds?: Id[]; id: Id }) => {
    const result = await dataUpdateGroupWithTransaction(
        {
            id,
            name,
            permissions,
        },
        usersIds ? addUsersToGroup(id, usersIds) : undefined,
    );

    return result;
};

export const deleteGroupService = async (id: Id) => {
    await dataDeleteGroup(id);

    return { code: 1 };
};

const createGetAllGroupsService =
    (
        getAllGroups: () => Promise<{
            groups: Group[];
        }>,
    ) =>
    async () => {
        const result = await getAllGroups();

        return result;
    };

export const getAllGroupsService = createGetAllGroupsService(dataGetAllGroups);
