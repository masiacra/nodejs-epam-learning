import { randomUUID } from 'crypto';
import { Group } from '../types/group.types';
import { Permission } from '../types/group.types';
import {
    createCreateService,
    createDeleteService,
    createUpdateService,
    createFindService,
} from './common.service';
import {
    dataFindGroupById,
    dataCreateGroup,
    dataUpdateGroup,
    dataDeleteGroup,
    dataGetAllGroups,
    dataAddUsersToGroup,
} from '../data-access/groups.data-access';
import { sequelize } from '../config/database.config';
import { Id } from '../types/common.types';

export const findGroupService = createFindService(dataFindGroupById);

const createGroupParamsTransformer = ({
    name,
    permissions,
}: {
    name?: string;
    permissions?: Permission[];
}) => {
    return {
        id: randomUUID(),
        name: name || '',
        permissions: permissions || [],
    };
};

const addUsersToGroup = async (groupId: Id, usersIds: Id[]) => {
    const result = await dataAddUsersToGroup(
        usersIds.map((user_id) => ({ user_id, group_id: groupId })),
    );

    return result;
};

export const createGroupService = async (params: {
    name?: string;
    permissions?: Permission[];
    usersIds?: Id[];
}) => {
    const transaction = await sequelize.transaction();

    const { resultObject, error } = await createCreateService(
        dataCreateGroup,
        createGroupParamsTransformer,
    )(params);

    if (error) {
        transaction.rollback();
        return { error };
    }

    const { error: _error } = await addUsersToGroup(
        resultObject.id,
        params.usersIds || [],
    );

    if (_error) {
        transaction.rollback();
        return { error };
    }

    return { error: null, resultObject };
};

export const updateGroupService = createUpdateService(dataUpdateGroup);

export const deleteGroupService = createDeleteService(dataDeleteGroup);

const createGetAllGroupsService =
    (
        getAllGroups: () => Promise<{
            groups: Group[];
            error: Error | null;
        }>,
    ) =>
    async () => {
        const result = await getAllGroups();

        return result;
    };

export const getAllGroupsService = createGetAllGroupsService(dataGetAllGroups);
