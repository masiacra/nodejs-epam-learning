import { Request, Response, NextFunction } from 'express';
import { StatusCodesEnum } from '../types/application.types';
import {
    findUserService,
    createUserService,
    updateUserService,
    deleteUserService,
    getLimitUsersService,
} from '../services/user.service';
import { INTERNAL_PROBLEM } from '../config/application.config';

export const handleGetUser = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { user } = await findUserService(id);

    if (!user) {
        response
            .status(StatusCodesEnum.NotFound)
            .json({ message: `User with id=${id} not found` });
        next();
        return;
    }

    response.status(StatusCodesEnum.OK).json(user);
    next();
    return;
};

export const handlePostUser = async (
    { body: { login, password, age } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { user } = await createUserService({
        login,
        password,
        age,
    });

    response
        .status(StatusCodesEnum.OK)
        .json({ message: 'User sucessfully added', user });

    next();
    return;
};

export const handlePutUser = async (
    { params: { id }, body: { login, password, age } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { code } = await updateUserService(id, {
        login,
        password,
        age,
    });
    if (code) {
        response.status(StatusCodesEnum.OK).json({
            message: `User with id=${id} sucessfully updated`,
        });
        next();
        return;
    }

    next(INTERNAL_PROBLEM);
    return;
};

export const handleDeleteUser = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { code } = await deleteUserService(id);

    if (code) {
        response.status(StatusCodesEnum.OK).json({
            message: `User with id=${id} has been successfully deleted`,
        });
        next();
        return;
    }

    next(INTERNAL_PROBLEM);
    return;
};

export const handleGetUsers = async (
    { query: { login, limit } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { users } = await getLimitUsersService(
        login as string,
        Number(limit),
    );

    response.status(StatusCodesEnum.OK).json({ users });
    next();
    return;
};
