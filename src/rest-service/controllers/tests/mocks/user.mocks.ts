import { Request, NextFunction, Response } from 'express';
import { User } from '../../../types/user.types';

export const MOCK_ID = '1';
export const MOCK_LOGIN = 'Saske';
export const MOCK_PASSWORD = '123a';
export const MOCK_AGE = 21;

export const MOCK_USER: User = {
    id: MOCK_ID,
    login: MOCK_LOGIN,
    password: MOCK_PASSWORD,
    age: MOCK_AGE,
    isDeleted: false,
};

export const getMockGetUserRequest = (id: string) => {
    return {
        params: {
            id,
        },
    } as unknown as Request;
};

interface MockResponse {
    status: (code: number) => MockResponse;
    json: (obj: object) => MockResponse;
}

export const getMockResponse = () => {
    const res: MockResponse = {
        status(): MockResponse {
            throw new Error('Function not implemented.');
        },
        json(): MockResponse {
            throw new Error('Function not implemented.');
        },
    };

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res as unknown as Response;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const mockNext = (() => {}) as unknown as NextFunction;

export const mockPostRequest = {
    body: {
        login: MOCK_LOGIN,
        password: MOCK_PASSWORD,
        age: MOCK_AGE,
    },
};

interface MockPutRequest {
    id: string;
    login?: string;
    password?: string;
    age?: number;
}

export const getMockPutRequest = ({
    id,
    login,
    password,
    age,
}: MockPutRequest) => {
    return {
        params: { id },
        body: { login, password, age },
    } as unknown as Request;
};

export const getMockDeleteRequest = (id: string) => {
    return {
        params: {
            id,
        },
    } as unknown as Request;
};

export const getMockUsersRequest = (login: string, limit?: number) => {
    return { query: { login, limit } } as unknown as Request;
};
