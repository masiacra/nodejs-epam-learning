import { Request } from 'express';
import {
    handleDeleteUser,
    handleGetUser,
    handlePostUser,
    handlePutUser,
    handleGetUsers,
} from '../user.controllers';
import {
    MOCK_ID,
    MOCK_USER,
    getMockResponse,
    mockNext,
    getMockGetUserRequest,
    mockPostRequest,
    getMockPutRequest,
    getMockDeleteRequest,
    MOCK_LOGIN,
    getMockUsersRequest,
} from './mocks/user.mocks';
import * as userService from '../../services/user.service';
import { StatusCodesEnum } from '../../types/application.types';
import { PickedUser } from '../../types/user.types';
import { PartialUserAttributes } from '../../types/database.types';
import { INTERNAL_PROBLEM } from '../../config/application.config';

describe('User controllers methods', () => {
    describe(handleGetUser.name, () => {
        const mockUserService = jest.spyOn(userService, 'findUserService');
        mockUserService.mockImplementation(async (id: string) => {
            if (id === MOCK_ID) {
                return { user: MOCK_USER };
            }

            return { user: null };
        });
        it(`should return status ${StatusCodesEnum.OK} and user if it exists`, async () => {
            const response = getMockResponse();
            await handleGetUser(
                getMockGetUserRequest(MOCK_ID),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith(MOCK_USER);
        });
        it(`should return status ${StatusCodesEnum.NotFound} and message if user doesn't exist`, async () => {
            const response = getMockResponse();
            const mockId = '2';
            await handleGetUser(
                getMockGetUserRequest(mockId),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(
                StatusCodesEnum.NotFound,
            );
            expect(response.json).toHaveBeenCalledWith({
                message: `User with id=${mockId} not found`,
            });
        });
    });
    describe(handlePostUser.name, () => {
        const mockUserService = jest.spyOn(userService, 'createUserService');
        mockUserService.mockImplementation(
            async ({ login, password, age }: PickedUser) => {
                return {
                    user: {
                        id: MOCK_ID,
                        login,
                        password,
                        age,
                        isDeleted: false,
                    },
                };
            },
        );
        it(`should return status ${StatusCodesEnum.OK} and message`, async () => {
            const response = getMockResponse();
            await handlePostUser(
                mockPostRequest as unknown as Request,
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith({
                message: 'User sucessfully added',
                user: MOCK_USER,
            });
        });
    });
    describe(handlePutUser.name, () => {
        const mockUserService = jest.spyOn(userService, 'updateUserService');
        mockUserService.mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async (id: string, _: PartialUserAttributes) => {
                if (id === MOCK_ID) {
                    return { code: 1 };
                }
                return {
                    code: 0,
                };
            },
        );
        it(`should return status ${StatusCodesEnum.OK} and message for existed ID`, async () => {
            const response = getMockResponse();
            await handlePutUser(
                getMockPutRequest({ id: MOCK_ID }),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith({
                message: `User with id=${MOCK_ID} sucessfully updated`,
            });
        });
        it('should call next method with error if code not equal 1', async () => {
            const response = getMockResponse();
            const mockByJestNext = jest.fn();
            await handlePutUser(
                getMockPutRequest({ id: '2' }),
                response,
                mockByJestNext,
            );

            expect(mockByJestNext).toHaveBeenCalledWith(INTERNAL_PROBLEM);
        });
    });
    describe(handleDeleteUser.name, () => {
        const mockUserService = jest.spyOn(userService, 'deleteUserService');
        mockUserService.mockImplementation(async (id: string) => {
            if (id === MOCK_ID) {
                return { code: 1 };
            }
            return {
                code: 0,
            };
        });
        it(`should return status code ${StatusCodesEnum.OK} and appropriate message if code equal to 1`, async () => {
            const response = getMockResponse();
            await handleDeleteUser(
                getMockDeleteRequest(MOCK_ID),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith({
                message: `User with id=${MOCK_ID} has been successfully deleted`,
            });
        });
        it('should call next with error if code not equal to 1', async () => {
            const response = getMockResponse();
            const mockByJestNext = jest.fn();
            await handleDeleteUser(
                getMockDeleteRequest('2'),
                response,
                mockByJestNext,
            );
            expect(mockByJestNext).toHaveBeenCalledWith(INTERNAL_PROBLEM);
        });
    });
    describe(handleGetUsers.name, () => {
        const mockUserService = jest.spyOn(userService, 'getLimitUsersService');
        const mockResultNonEmpty = { users: [MOCK_USER] };
        const mockResultEmpty = { users: [] };
        mockUserService.mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async (login: string, _limit?: number) => {
                if (login === MOCK_LOGIN) {
                    return mockResultNonEmpty;
                }
                return mockResultEmpty;
            },
        );

        it(`should return status code ${StatusCodesEnum.OK} and non-empty array if login matches with somebody`, async () => {
            const response = getMockResponse();
            await handleGetUsers(
                getMockUsersRequest(MOCK_LOGIN),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith(mockResultNonEmpty);
        });
        it(`should return status code ${StatusCodesEnum.OK} and empty array if login doesn't match with somebody`, async () => {
            const response = getMockResponse();
            await handleGetUsers(
                getMockUsersRequest('some login'),
                response,
                mockNext,
            );
            expect(response.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
            expect(response.json).toHaveBeenCalledWith(mockResultEmpty);
        });
    });
});
