import { Router, Request, Response, NextFunction } from 'express';
import { usersSheme } from '../validation/users-sheme';
import { validateSheme } from '../validation/validate-sheme';
import { userService } from '../services/user.service';

export const usersRouter = Router();

const usersController = {
    async handleGetUsers(
        { query: { login, limit } }: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { users } = await userService.getLimitUsers(
                login as string,
                Number(limit),
            );

            response.json({ users });
        } catch (error) {
            next(error);
            return;
        }
    },
};

usersRouter.get(
    '/',
    validateSheme(undefined, undefined, usersSheme),
    usersController.handleGetUsers,
);
