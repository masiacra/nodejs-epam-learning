import { Router, Request, Response, NextFunction } from 'express';
import { USER_VALIDATE_SCHEME_CONFIG } from '../validation/users-scheme';
import { validateScheme } from '../validation/validate-scheme';
import { getLimitUsersService } from '../services/user.service';

export const usersRouter = Router();

const handleGetUsers = async (
    { query: { login, limit } }: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { users } = await getLimitUsersService(
            login as string,
            Number(limit),
        );

        response.json({ users });
    } catch (error) {
        next(error);
        return;
    }
};

usersRouter.get(
    '/',
    validateScheme(USER_VALIDATE_SCHEME_CONFIG),
    handleGetUsers,
);
