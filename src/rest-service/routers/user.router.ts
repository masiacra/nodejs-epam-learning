import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodesEnum } from '../types/application.types';
import {
    USER_CREATE_SCHEME_CONFIG,
    USER_UPDATE_SCHEME_CONFIG,
} from '../validation/user-scheme';
import { VALIDATE_ID_SCHEME_CONFIG } from '../validation/id-scheme';
import { validateScheme } from '../validation/validate-scheme';
import {
    findUserService,
    createUserService,
    updateUserService,
    deleteUserService,
} from '../services/user.service';

const internalProblem = new Error('Sorry. Some propblems with server');

export const handleGetUser = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { user } = await findUserService(id);

        if (!user) {
            response
                .status(StatusCodesEnum.NotFound)
                .json({ message: `User with id=${id} not found` });

            return;
        }

        response.json(user);
    } catch (error) {
        next(error);
        return;
    }
};

export const handlePostUser = async (
    { body: { login, password, age } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { user } = await createUserService({
            login,
            password,
            age,
        });

        response
            .status(StatusCodesEnum.OK)
            .json({ message: 'User sucessfully added', user });
    } catch (error) {
        next(error);
        return;
    }
};

export const handlePutUser = async (
    { params: { id }, body: { login, password, age } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { code } = await updateUserService(id, {
            login,
            password,
            age,
        });
        if (code) {
            response.status(StatusCodesEnum.OK).json({
                message: `User with id=${id} sucessfully updated`,
            });
            return;
        }

        next(internalProblem);
        return;
    } catch (error) {
        next(error);
        return;
    }
};

export const handleDeleteUser = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { code } = await deleteUserService(id);

        if (code) {
            response.json({
                message: `User with id=${id} has been successfully deleted`,
            });
            return;
        }

        next(internalProblem);
        return;
    } catch (error) {
        next(error);
        return;
    }
};

export const userRouter = Router();

userRouter.get(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    handleGetUser,
);

userRouter.post('/', validateScheme(USER_CREATE_SCHEME_CONFIG), handlePostUser);
userRouter.put(
    '/:id',
    validateScheme(USER_UPDATE_SCHEME_CONFIG),
    handlePutUser,
);
userRouter.delete(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    handleDeleteUser,
);
