import {
    handleDeleteGroup,
    handleGetGroup,
    handlePostGroup,
    handlePutGroup,
} from '../group.controllers';
import {
    MOCK_GROUP_ID,
    MOCK_GROUP,
    getMockDeleteGroupRequest,
    getMockGetGroupRequest,
    getMockPostGroupRequest,
    getMockUpdateGroupRequest,
    MOCK_GROUP_NAME,
    MOCK_PERMISSIONS,
} from './mocks/group.mocks';
import { getMockResponse, mockNext } from './mocks/user.mocks';
import * as groupsService from '../../services/groups.service';
import { StatusCodesEnum } from '../../types/application.types';
import { INTERNAL_PROBLEM } from '../../config/application.config';
import {
    CreateGroupServiceProps,
    UpdateGroupServiceProps,
} from '../../types/group.types';

describe('Group controllers methods', () => {
    describe(handleGetGroup.name, () => {
        const mockGroupService = jest.spyOn(groupsService, 'findGroupService');
        mockGroupService.mockImplementation(async (id: string) => {
            if (id === MOCK_GROUP_ID) {
                return { group: MOCK_GROUP };
            }

            return { group: null };
        });
        it(`should return status ${StatusCodesEnum.OK} and group if it exists`, async () => {
            const response = getMockResponse();
            await handleGetGroup(
                getMockGetGroupRequest(MOCK_GROUP_ID),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith(MOCK_GROUP);
        });
        it(`should return status ${StatusCodesEnum.NotFound} and message if group doesn't exist`, async () => {
            const response = getMockResponse();
            const mockId = '2';
            await handleGetGroup(
                getMockGetGroupRequest(mockId),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(
                StatusCodesEnum.NotFound,
            );
            expect(response.json).toHaveBeenCalledWith({
                message: `Group with id=${mockId} not found`,
            });
        });
    });

    describe(handlePostGroup.name, () => {
        const mockGroupService = jest.spyOn(
            groupsService,
            'createGroupService',
        );
        mockGroupService.mockImplementation(
            async ({ name, permissions }: CreateGroupServiceProps) => {
                return {
                    resultObject: {
                        name,
                        permissions,
                        id: MOCK_GROUP_ID,
                    },
                };
            },
        );
        it(`should return appropriate message and ${StatusCodesEnum.OK} status`, async () => {
            const response = getMockResponse();
            await handlePostGroup(
                getMockPostGroupRequest({
                    name: MOCK_GROUP_NAME,
                    permissions: MOCK_PERMISSIONS,
                }),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith({
                message: 'Group sucessfully added',
                group: MOCK_GROUP,
            });
        });
    });

    describe(handlePutGroup.name, () => {
        const mockGroupService = jest.spyOn(
            groupsService,
            'updateGroupService',
        );
        mockGroupService.mockImplementation(
            async ({ id }: UpdateGroupServiceProps) => {
                if (id === MOCK_GROUP_ID) {
                    return { code: 1 };
                }

                return { code: 0 };
            },
        );

        it(`should return status code ${StatusCodesEnum.OK} and appropriate message if code equal to 1`, async () => {
            const response = getMockResponse();
            await handlePutGroup(
                getMockUpdateGroupRequest(MOCK_GROUP_ID),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith({
                message: `Group with id=${MOCK_GROUP_ID} sucessfully updated`,
            });
        });
        it('should call next with error if code not equal to 1', async () => {
            const response = getMockResponse();
            const mockByJestNext = jest.fn();
            await handlePutGroup(
                getMockUpdateGroupRequest('2'),
                response,
                mockByJestNext,
            );
            expect(mockByJestNext).toHaveBeenCalledWith(INTERNAL_PROBLEM);
        });
    });

    describe(handleDeleteGroup.name, () => {
        const mockGroupService = jest.spyOn(
            groupsService,
            'deleteGroupService',
        );
        mockGroupService.mockImplementation(async (id: string) => {
            if (id === MOCK_GROUP_ID) {
                return { code: 1 };
            }

            return { code: 0 };
        });
        it(`should return status code ${StatusCodesEnum.OK} and appropriate message if code equal to 1`, async () => {
            const response = getMockResponse();
            await handleDeleteGroup(
                getMockDeleteGroupRequest(MOCK_GROUP_ID),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith({
                message: `Group with id=${MOCK_GROUP_ID} has been successfully deleted`,
            });
        });
        it('should call next with error if code not equal to 1', async () => {
            const response = getMockResponse();
            const mockByJestNext = jest.fn();
            await handleDeleteGroup(
                getMockDeleteGroupRequest('2'),
                response,
                mockByJestNext,
            );
            expect(mockByJestNext).toHaveBeenCalledWith(INTERNAL_PROBLEM);
        });
    });
});
