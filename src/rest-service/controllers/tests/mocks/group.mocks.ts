import { Request } from 'express';
import {
    Group,
    Permission,
    CreateGroupServiceProps,
} from '../../../types/group.types';

export const MOCK_GROUP_ID = '1';
export const MOCK_PERMISSIONS = [Permission.READ];
export const MOCK_GROUP_NAME = 'groupName';

export const MOCK_GROUP: Group = {
    id: MOCK_GROUP_ID,
    permissions: MOCK_PERMISSIONS,
    name: MOCK_GROUP_NAME,
};

export const getMockGetGroupRequest = (id: string) => {
    return {
        params: { id },
    } as unknown as Request;
};

export const getMockDeleteGroupRequest = (id: string) => {
    return {
        params: { id },
    } as unknown as Request;
};

export const getMockPostGroupRequest = (body: CreateGroupServiceProps) => {
    return {
        body,
    } as unknown as Request;
};

export const getMockUpdateGroupRequest = (id: string) => {
    return {
        params: { id },
        body: {},
    } as unknown as Request;
};
