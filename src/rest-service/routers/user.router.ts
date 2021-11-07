import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodesEnum } from '../types/application.types';
import {
    userCreateSheme,
    userUpdateSheme,
    idParamsSheme,
} from '../validation/user-sheme';
import { validateSheme } from '../validation/validate-sheme';
import { userService } from '../services/user.service';

const internalProblem = new Error('Sorry. Some propblems with server');

const userController = {
    async handleGetUser(
        { params: { id } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        // TODO: add id validation

        const { user, error } = await userService.findUser(id);

        if (error) {
            next(error);
            return;
        }

        if (!user) {
            response
                .status(StatusCodesEnum.NotFound)
                .json({ message: `User with id=${id} not found` });

            return;
        }

        response.json(user);
    },

    async handlePostUser(
        { body: { login, password, age } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { user, error } = await userService.createUser(
            login,
            password,
            age,
        );

        if (error) {
            next(error);
            return;
        }

        response
            .status(StatusCodesEnum.OK)
            .json({ message: 'User sucessfully added', user });
    },

    async handlePutUser(
        { params: { id }, body: { login, password, age } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { code, error } = await userService.updateUser(
            id,
            login,
            password,
            age,
        );

        if (error) {
            next(error);
            return;
        }

        if (code) {
            response.status(StatusCodesEnum.OK).json({
                message: `User with id=${id} sucessfully updated`,
            });
            return;
        }

        next(internalProblem);
    },

    async handleDeleteUser(
        { params: { id } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { error, code } = await userService.deleteUser(id);

        if (error) {
            next(error);
            return;
        }

        if (code) {
            response.json({
                message: `User with id=${id} has been successfully deleted`,
            });
            return;
        }

        next(internalProblem);
    },
};

export const userRouter = Router();

userRouter.get(
    '/:id',
    validateSheme(idParamsSheme, undefined),
    userController.handleGetUser,
);
userRouter.post(
    '/',
    validateSheme(undefined, userCreateSheme),
    userController.handlePostUser,
);
userRouter.put(
    '/:id',
    validateSheme(idParamsSheme, userUpdateSheme),
    userController.handlePutUser,
);
userRouter.delete(
    '/:id',
    validateSheme(idParamsSheme, undefined),
    userController.handleDeleteUser,
);
