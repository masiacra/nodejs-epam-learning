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
        try {
            const { user } = await userService.findUser(id);

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
    },

    async handlePostUser(
        { body: { login, password, age } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { user } = await userService.createUser(login, password, age);

            response
                .status(StatusCodesEnum.OK)
                .json({ message: 'User sucessfully added', user });
        } catch (error) {
            next(error);
            return;
        }
    },

    async handlePutUser(
        { params: { id }, body: { login, password, age } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { code } = await userService.updateUser(
                id,
                login,
                password,
                age,
            );

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
    },

    async handleDeleteUser(
        { params: { id } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { code } = await userService.deleteUser(id);

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
