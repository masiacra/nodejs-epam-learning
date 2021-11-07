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
        const { users, error } = await userService.getLimitUsers(
            login as string,
            Number(limit),
        );

        if (error) {
            next(error);
            return;
        }

        response.json({ users });
    },
};

usersRouter.get(
    '/',
    validateSheme(undefined, undefined, usersSheme),
    usersController.handleGetUsers,
);
