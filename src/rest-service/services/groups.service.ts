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
} from '../data-access/groups.data-access';

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

export const createGroupService = createCreateService(
    dataCreateGroup,
    createGroupParamsTransformer,
);

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
